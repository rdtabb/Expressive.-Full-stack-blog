import useProfileContext from "../../../hooks/useContextHooks/useProfileContext";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const EditProfilePopup = () => {
  const { handleEditProfile } = useProfileContext()
  const queryClient = useQueryClient()
  const profileMutation = useMutation({
    mutationFn: handleEditProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userdata"])
    }
  })
  const [username, setUsername] = useState<string>("")
  const [usernameError, setUsernameError] = useState<string>("")
  const [statusError, setStatusError] = useState<string>("")
  const [status, setStatus] = useState<string>("")

  const handleClosePopup = (e: any) => {
    e.target.closest('.popup').classList.remove('popup--opened')
  }

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setStatus(target.value)
    if (target.value === "") {
      target.setCustomValidity("This field is required")
      setStatusError(target.validationMessage)
    } else if (target.value.length <= 2) {
      target.setCustomValidity("Status must be longer than 2 characters")
      setStatusError(target.validationMessage)
    } else if (target.validity.patternMismatch) {
      target.setCustomValidity("Status can contain only letters and numbers")
      setStatusError(target.validationMessage)
    } else {
      target.setCustomValidity("")
      setStatusError("")
    }
  }

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setUsername(target.value)
    if (target.value === "") {
      target.setCustomValidity("This field is required")
      setUsernameError(target.validationMessage)
    } else if (target.value.length <= 2) {
      target.setCustomValidity("Status must be longer than 2 characters")
      setUsernameError(target.validationMessage)
    } else if (target.validity.patternMismatch) {
      target.setCustomValidity("Status can contain only letters and numbers")
      setUsernameError(target.validationMessage)
    } else {
      target.setCustomValidity("")
      setUsernameError("")
    }
  }

  return (
    <div className="popup popup--edit">
      <div className="popup__container">
        <form onSubmit={(e) => e.preventDefault()} className="popup__form">
          <h2 className="popup__header">
            Edit your profile
          </h2>
          <div className="form__inputcont">
            <input 
              minLength={2} 
              maxLength={30} 
              required 
              placeholder="Enter username..." 
              type="text" 
              value={username}
              onChange={onUsernameChange}
              pattern="^[A-Za-z0-9\s]+$"
            />
            <p className="form__error">{usernameError}</p>
          </div>
          <div className="form__inputcont">
            <input 
              minLength={2} 
              maxLength={200} 
              required 
              placeholder="Enter status..." 
              type="text" 
              value={status}
              onInput={onStatusChange}
              pattern="^[A-Za-z0-9\s]+$"
            />
            <p className="form__error">{statusError}</p>
          </div>
          <button 
            className="popup__submit popup__submit--edit"
            onClick={() => profileMutation.mutate({
              username, 
              status
            })}
            disabled={
              usernameError.length > 0 || statusError.length > 0 ? true : false
            }
          >
            Confirm
          </button> 
        </form>
        <button onClick={handleClosePopup} type="button" className="popup__close"></button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
