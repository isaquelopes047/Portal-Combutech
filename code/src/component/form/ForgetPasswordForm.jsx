import React from "react";

function ForgetPasswordForm() {
  return (
    <>
      <div className="crancy-wc__heading">
        <h3 className="crancy-wc__form-title crancy-wc__form-title__one">
          Refazer sua senha
        </h3>
        <p>
          Digite o email associado a conta e nos vamos enviar um codigo de verificação a ele
          para resetar a sua senha.
        </p>
      </div>
      <form className="crancy-wc__form-main">
        {/* <!-- Form Group --> */}
        <div className="form-group">
          <div className="form-group__input">
            <input
              className="crancy-wc__form-input"
              type="email"
              name="email"
              placeholder="Digite o email"
              required="required"
            />
          </div>
        </div>
        {/* <!-- Form Group --> */}
        <div className="form-group">
          <p className="crancy-wc__text">
            <a href="/posto">Retornar ao login</a>
          </p>
        </div>
        {/* <!-- Form Group --> */}
        <div className="form-group form-group--big">
          <div style={{width: '100%',}}>
            <button
              className="ntfmax-wc__btn ntfmax-wc__btn--login"
              type="submit"
            >
              Enviar
              <span>
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgetPasswordForm;
