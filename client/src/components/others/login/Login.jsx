import React from "react";

import "./Login.scss";

import ButtonGoBackLoginRegister from "../buttonGoBackLoginRegister/ButtonGoBackLoginRegister";

const Login = () => {
  return (
    <section className="login">
      <div className="login__wrapper">
        <ButtonGoBackLoginRegister />
        <div className="login__left">
          <span className="login__cover-left"></span>
          <div className="login__left-redirects">
            <h2 className="login__left-title">Log in</h2>
            <p className="login__left-subtitle">
              Please fill in your credentials to enter into admin dashboard
            </p>
          </div>
        </div>
        <div className="login__right">
          <h2 className="login__right-title">Log in</h2>
          <form className="login__form">
            <div className="login__input-wrapper">
              <label className="login__label">Email</label>
              <input
                className="login__input"
                type="email"
                placeholder="Email"
              />
              <span className="login__icon">
                <i className="far fa-envelope"></i>
              </span>
            </div>
            <div className="login__input-wrapper">
              <label className="login__label">Password</label>
              <input
                className="login__input"
                type="text"
                placeholder="Password"
              />
              <span className="login__icon">
                <i className="fas fa-eye"></i>
              </span>
            </div>
            <button className="login__button-login">Log in</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
