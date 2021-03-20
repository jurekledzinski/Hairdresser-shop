import React from "react";
import { Link } from "react-router-dom";

import "./Register.scss";

import ButtonGoBackLoginRegister from "../buttonGoBackLoginRegister/ButtonGoBackLoginRegister";

const Register = () => {
  return (
    <section className="register">
      <div className="register__wrapper">
        <div className="register__left">
          <span className="login__cover-left"></span>
          <div className="register__left-redirects">
            <h2 className="register__left-title">Sign up</h2>
            <p className="register__left-subtitle">
              Please fill in your details
            </p>
            <p className="register__left-login-text">
              Already have an account?
            </p>
            <Link className="register__left-login-button" to="/login-admin">
              Sign in
            </Link>
          </div>
        </div>
        <div className="register__right">
          <ButtonGoBackLoginRegister />
          <h2 className="register__right-title">Sign Up</h2>
          <form className="register__form">
            <div className="register__input-wrapper-name-surname">
              <div className="register__wrapper-name">
                <label className="register__label">First name</label>
                <input
                  className="register__input"
                  type="text"
                  placeholder="Name"
                />
                <span className="register__icon">
                  <i className="far fa-user"></i>
                </span>
              </div>
              <div className="register__wrapper-surname">
                <label className="register__label">Last name</label>
                <input
                  className="register__input"
                  type="text"
                  placeholder="Surname"
                />
                <span className="register__icon">
                  <i className="far fa-user"></i>
                </span>
              </div>
            </div>
            <div className="register__input-wrapper">
              <label className="register__label">Email</label>
              <input
                className="register__input"
                type="email"
                placeholder="Email"
              />
              <span className="register__icon">
                <i className="far fa-envelope"></i>
              </span>
            </div>
            <div className="register__input-wrapper">
              <label className="register__label">Password</label>
              <input
                className="register__input"
                type="text"
                placeholder="Password"
              />
              <span className="register__icon">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            <div className="register__input-wrapper">
              <label className="register__label">Confirm Password</label>
              <input
                className="register__input"
                type="password"
                placeholder="Confirm Password"
              />
              <span className="register__icon">
                <i className="fas fa-eye"></i>
              </span>
            </div>
            <button className="register__button-register">Sign up</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
