import useProfileContext from "../../../hooks/useContextHooks/useProfileContext";

const LogoutConfirm = () => {
  const { handleLogOut } = useProfileContext()

  const handleClosePopup = (e: any) => {
    e.target.closest('.popup').classList.remove('popup--opened')
  }

  return (
    <div className="popup popup--confirm">
      <div className="popup__container">
        <div className="popup__form popup__form_addcard">
          <h2 className="popup__header popup__header--confirm">Are you sure?</h2>
          <button onClick={handleLogOut} className="popup__submit popup__submit_addcart">
            Confirm
          </button>
        </div>
        <button onClick={handleClosePopup} type="button" className="popup__close"></button>
      </div>
    </div>
  );
};

export default LogoutConfirm;
