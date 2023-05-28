import useProfileContext from "../../../hooks/useContextHooks/useProfileContext";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const EditProfilePopup = () => {
  const { handleEditProfile } = useProfileContext()
  const queryClient = useQueryClient()
  const profileMutation = useMutation({
    mutationFn: handleEditProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userdata"])
    }
  })

  const handleClosePopup = (e: any) => {
    e.target.closest('.popup').classList.remove('popup--opened')
  }

  return (
    <div className="popup popup--edit">
      <div className="popup__container">
        <form className="popup__form">
          <h2 className="popup__header">
            Edit your profile
          </h2>
          <div className="form__inputcont">
            <input placeholder="Enter username..." type="text" />
          </div>
          <div className="form__inputcont">
            <input placeholder="Enter status..." type="text" />
          </div>
          <button className="popup__submit popup__submit_addcart">
            Confirm
          </button>
        </form>
        <button onClick={handleClosePopup} type="button" className="popup__close"></button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
