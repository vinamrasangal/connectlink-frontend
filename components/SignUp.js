import React, { useState } from "react";
import styles from "../styles/Account.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "@/redux/AlertController";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import validator from "validator";
import { useRouter } from "next/router";
import { userSignup } from "../redux/ActionCreators/authAction";
import { clearErrors, returnErrors } from "@/redux/ActionCreators/errorAction";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SignUp = () => {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState({
    Fname: "",
    Lname: "",
    username: "",
    email: "",
    category: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const signUp = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  // const { loading, signup } = useSignup()

  function snackClosed() {
    dispatch(clearErrors());
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "agreement") {
      setSignUpData((prev) => ({ ...prev, agreement: !prev.agreement }));
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  }
  function handleClick(e) {
    e.preventDefault();
    const {
      username,
      Fname,
      Lname,
      email,
      category,
      password,
      confirmPassword,
      agreement,
    } = signUpData;

    if (
      username === ""||
      Fname === "" ||
      Lname === "" ||
      email === "" ||
      category === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      dispatch(
        returnErrors(dispatch, "make sure to fill up all the inputs", 202)
      );
    } else if (!agreement) {
      dispatch(
        returnErrors(
          dispatch,
          "make sure to agree to terms and conditions of platform",
          202
        )
      );
    } else if (!validator.isEmail(email)) {
      dispatch(returnErrors(dispatch, "please use a valid email adress", 202));
    } else if (!/^(?=.{8,})/.test(password)) {
      // dispatch(alertActions.showAlert({ msg: 'the password should be at least 8 characters', showen: true, type: 'error' }));
      dispatch(
        returnErrors(dispatch, "Password should be atleast 8 charectors", 202)
      );
    } else if (!/^(?=.*[a-z])/.test(password)) {
      // dispatch(alertActions.showAlert({ msg: 'the password should be at least contain 1 lowercase', showen: true, type: 'error' }));
      dispatch(
        returnErrors(
          dispatch,
          "the password should at least contain 1 lowercase",
          202
        )
      );
    } else if (!/(?=.*[A-Z])/.test(password)) {
      // dispatch(alertActions.showAlert({ msg: 'the password should be at least contain 1 uppercase', showen: true, type: 'error' }));
      dispatch(
        returnErrors(
          dispatch,
          "the password should at least contain 1 Uppercase",
          202
        )
      );
    } else if (!/(?=.*[0-9])/.test(password)) {
      // dispatch(alertActions.showAlert({ msg: 'the password should be at least contain 1 number', showen: true, type: 'error' }));
      dispatch(
        returnErrors(
          dispatch,
          "the password should at least contain 1 number",
          202
        )
      );
    } else if (password !== confirmPassword) {
      // dispatch(alertActions.showAlert({ msg: 'make sure to match the password', showen: true, type: 'error' }));
      dispatch(returnErrors(dispatch, "make sure to match password", 202));
    } else {
      setLoading(true);
      const obj = {
        username:signUpData.username,
        firstname: signUpData.Fname,
        lastname: signUpData.Lname,
        email: signUpData.email,
        password: signUpData.password,
      };
      console.log(obj);
      console.log(signUp);
      dispatch(userSignup(obj));
      setLoading(false);

      if (signUp) {
        router.push("/login");
      }

      // if (alert.type === 'error') {
      //     router.push('/signup')
      // } else {
      //     router.push('/');
      // }
    }
  }
  return (
    <article className={styles.signUp}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={error.successMessage}
        autoHideDuration={3000}
        onClose={snackClosed}
      >
        <Alert onClose={snackClosed} severity="error" sx={{ width: "100%" }}>
          {error.successMessageText}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={error.successEnable}
        autoHideDuration={3000}
        onClose={snackClosed}
      >
        <Alert onClose={snackClosed} severity="success" sx={{ width: "100%" }}>
          {error.successMessageText}
        </Alert>
      </Snackbar>
      <form action="" className={`${styles.form} medium-fs normal-gray`}>
        <div className={`${styles.nameDetails}`}>
          <div className={`${styles.nameInputsdiv}`}>
            <label htmlFor="Fname" className={`${styles.formLabel} normal`}>
              First name
            </label>
            <input
              type="text"
              name="Fname"
              id="Fname"
              className={`${styles.nameInputs} light-gray light`}
              placeholder="First name"
              onChange={(e) => handleChange(e)}
              value={signUpData.Fname}
            />
          </div>
          <div className={`${styles.nameInputsdiv}`}>
            <label htmlFor="Fname" className={`${styles.formLabel} normal`}>
              Last name
            </label>
            <input
              type="text"
              name="Lname"
              id="Lname"
              className={`${styles.nameInputs} light-gray light`}
              placeholder="Last name"
              onChange={(e) => handleChange(e)}
              value={signUpData.Lname}
            />
          </div>
        </div>
        <label htmlFor="email" className={`${styles.formLabel} normal`}>
          username
        </label>

        <input
          type="text"
          name="username"
          id="username"
          className={`${styles.formInput} light-gray light`}
          placeholder="username"
          onChange={(e) => handleChange(e)}
          value={signUpData.username}
        />

        <label htmlFor="email" className={`${styles.formLabel} normal`}>
          Email
        </label>

        <input
          type="text"
          name="email"
          id="email"
          className={`${styles.formInput} light-gray light`}
          placeholder="example@email.com"
          onChange={(e) => handleChange(e)}
          value={signUpData.email}
        />
        <label htmlFor="category" className={`${styles.formLabel} normal`}>
          Tell us who you are
        </label>
        <select
          name="category"
          id="category"
          className={`${styles.formInput} light-gray light`}
          placeholder="select your category"
          onChange={(e) => handleChange(e)}
          value={signUpData.category}
        >
          <option className={`dark-gray light ${styles.option}`} value="">
            Select your category
          </option>
          <option
            className={`dark-gray light ${styles.option}`}
            value="Startup"
          >
            Startup
          </option>
          <option
            className={`dark-gray light ${styles.option}`}
            value="Small to mid-sized business"
          >
            Small to mid-sized business
          </option>
          <option
            className={`dark-gray light ${styles.option}`}
            value="Individuals"
          >
            Individuals
          </option>
          <option
            className={`dark-gray light ${styles.option}`}
            value="Service providers"
          >
            Service providers
          </option>
          <option
            className={`dark-gray light ${styles.option}`}
            value="Event organizers"
          >
            Event organizers
          </option>
          <option className={`dark-gray light ${styles.option}`} value="Others">
            Others
          </option>
        </select>
        <div className={styles.passwordHolder}>
          <label htmlFor="password" className={`${styles.formLabel} normal`}>
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className={`${styles.formInput} light-gray light`}
            placeholder="***********"
            onChange={(e) => handleChange(e)}
            value={signUpData.password}
          />
          <span
            className={`${styles.showPassword} x-large-fs light-gray`}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? RxEyeOpen({}) : RxEyeClosed({})}
          </span>
          <p className={`${styles.passwordP} small-fs light light-gray`}>
            Your password must be at least 8 characters long and include a mix
            of letters and numbers
          </p>
        </div>
        <div className={styles.passwordHolder}>
          <label
            htmlFor="confrimPassword"
            className={`${styles.formLabel} normal`}
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confrimPassword"
            className={`${styles.formInput} light-gray light`}
            placeholder="***********"
            onChange={(e) => handleChange(e)}
            value={signUpData.confirmPassword}
          />
          <span
            className={`${styles.showPassword} x-large-fs light-gray`}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? RxEyeOpen({}) : RxEyeClosed({})}
          </span>
          <p className={`${styles.passwordP} small-fs light light-gray`}>
            Your password must be at least 8 characters long and include a mix
            of letters and numbers
          </p>
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            className={styles.agreement}
            onChange={(e) => handleChange(e)}
            value={signUpData.agreement}
          />
          <label
            htmlFor="agreement"
            className={`${styles.agreementLabel} normal small-fs`}
          >
            I agree to the platform's{" "}
            <a href="" className={`${styles.terms} small-fs`}>
              terms and conditions.
            </a>
          </label>
        </div>
        <button
          className={`${styles.signUpBtn} ${loading ? "clicked" : ""} P-BTN`}
          onClick={(e) => handleClick(e)}
        >
          Create Account
        </button>
      </form>
    </article>
  );
};

export default SignUp;
