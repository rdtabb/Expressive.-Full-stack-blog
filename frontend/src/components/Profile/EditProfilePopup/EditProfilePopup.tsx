import useProfileContext from "../../../hooks/useContextHooks/useProfileContext"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

const EditProfilePopup = () => {
  return (
    <div className="popup popup--confirm">
      <div className="popup__container">
        <div className="popup__form popup__form_addcard">
          <h2 className="popup__header popup__header--confirm">Are you sure?</h2>
          <button className="popup__submit popup__submit_addcart">
            Confirm
          </button>
        </div>
        <button type="button" className="popup__close"></button>
      </div>
    </div>
  )
}

export default EditProfilePopup
