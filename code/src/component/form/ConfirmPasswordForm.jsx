import React from "react";

function ConfirmPasswordForm() {
  return (
    <>
      <div className="crancy-wc__heading">
        <h3 className="crancy-wc__form-title crancy-wc__form-title__one">
          Tudo certo com sua conta!
        </h3>
        <p>Só precisamos confirmar sua autenticidade</p>
      </div>
      {/* <!-- Sign in Form --> */}
      <form className="crancy-wc__form-main crancy-wc__form-main--select mg-top-30">
        <h4 className="crancy-wc__form--inner--heading">
          Acesse o Email vinculado a conta e click no link para confirmar.
        </h4>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade" id="confirm-tab-one" role="tabpanel">
            <div className="form-group crancy-wp__form--group mg-top-20">
              <input type="checkbox" id="room1" name="room1" value="room" />
              <label className="homec-form-label" htmlFor="room1">
                Link por Email
              </label>
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="confirm-tab-two"
            role="tabpanel"
          >
            <div className="form-group crancy-wp__form--group mg-top-20">
              <input type="checkbox" id="room1" name="room1" value="room" checked />
              <label className="homec-form-label" htmlFor="room1">
                Link por Email
              </label>
            </div>
          </div>
        </div>
        {/* <!-- Form Group --> */}
        {/* <!-- Form Group --> */}
        <div className="form-group">
          <div className="crancy-wc__button crancy-wc__button--initial">
            <a
              href="/"
              className="ntfmax-wc__btn ntfmax-wc__btn--login"
            >
              Voltar
              <span>
                <i className="fa-solid fa-arrow-left"></i>
              </span>
            </a>
          </div>
        </div>
      </form>
    </>
  );
}

export default ConfirmPasswordForm;
