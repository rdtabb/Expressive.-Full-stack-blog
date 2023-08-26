import useProfileContext from "../../../hooks/useContextHooks/useProfileContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "../../../zodSchemas/editProfileSchema/editProfileSchema";

export type EditProfileForm = {
  username: string;
  status: string;
};

const EditProfilePopup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<EditProfileForm>({
    mode: "onChange",
    resolver: zodResolver(editProfileSchema),
  });

  const { handleEditProfile } = useProfileContext();
  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: handleEditProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userdata"]);
    },
  });

  const handleClosePopup = (e: any) => {
    e.target.closest(".popup").classList.remove("popup--opened");
    reset();
  };

  return (
    <div className="popup popup--edit">
      <div className="popup__container">
        <form
          onSubmit={handleSubmit((values: EditProfileForm) =>
            profileMutation.mutate(values),
          )}
          className="popup__form"
        >
          <h2 className="popup__header">Edit your profile</h2>
          <div className="form__inputcont">
            <input
              {...register("username")}
              placeholder="Enter username..."
              type="text"
            />
            {errors.username && (
              <p className="form__error">{errors.username.message}</p>
            )}
          </div>
          <div className="form__inputcont">
            <input
              {...register("status")}
              placeholder="Enter status..."
              type="text"
            />
            {errors.status && (
              <p className="form__error">{errors.status.message}</p>
            )}
          </div>
          <button
            className="popup__submit popup__submit--edit"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Confirm
          </button>
        </form>
        <button
          onClick={handleClosePopup}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
