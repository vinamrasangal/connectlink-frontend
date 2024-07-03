import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Account.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { returnErrors, clearErrors } from "@/redux/ActionCreators/errorAction";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { userLogin } from "../redux/ActionCreators/authAction";
import { Snackbar, Alert } from "@mui/material";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  // Logging auth state for debugging
  useEffect(() => {
    console.log("Auth state changed:", auth);
    if (auth.isAuthorized) {
      router.push('/');
    }
  }, [auth, router]);

  const snackClosed = () => {
    dispatch(clearErrors());
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? !prev.rememberMe : value,
    }));
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.password === "") {
      dispatch(returnErrors("Make sure you fill up the inputs", 202));
    } else {
      setLoading(true);
      const login = {
        email: loginData.email,
        password: loginData.password,
        rememberMe: loginData.rememberMe,
      };

      await dispatch(userLogin(login));
      setLoading(false);

      if (!auth.isAuthorized) {
        dispatch(returnErrors("Please enter the right credentials", 202));
      }
    }
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Handle successful Google login
    },
    onError: (res) => {
      dispatch(
        returnErrors(res.error_description, 500)
      );
    },
  });

  return (
    <article className={styles.logIn}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={!!error.successMessage}
        autoHideDuration={3000}
        onClose={snackClosed}
      >
        <Alert onClose={snackClosed} severity="error" sx={{ width: "100%" }}>
          {error.successMessageText}
        </Alert>
      </Snackbar>
      <form className={`${styles.form} medium-fs normal-gray`} onSubmit={handleLoginWithEmail}>
        <label htmlFor="email" className={`${styles.formLabel} normal`}>Email</label>
        <input
          type="text"
          name="email"
          id="email"
          className={`${styles.formInput} light-gray light`}
          placeholder="example@email.com"
          value={loginData.email}
          onChange={handleLoginChange}
        />
        <div className={styles.passwordHolder}>
          <label htmlFor="password" className={`${styles.formLabel} normal`}>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className={`${styles.formInput} light-gray light`}
            placeholder="***********"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <span
            className={`${styles.showPassword} x-large-fs light-gray`}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
          </span>
          <p className={`${styles.passwordP} small-fs light light-gray`}>
            Your password must be at least 8 characters long and include a mix of letters and numbers
          </p>
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            className={styles.remeberMe}
            checked={loginData.rememberMe}
            onChange={handleLoginChange}
          />
          <label htmlFor="rememberMe" className={`${styles.remeberMeLabel} normal small-fs`}>Remember me</label>
          <a href="" className={`${styles.resetPass} small-fs`}>Forgot password?</a>
        </div>
        <button
          className={`${styles.logInBtn} ${loading ? "clicked" : ""} P-BTN`}
          type="submit"
        >
          Log In
        </button>
      </form>
      <p className={`${styles.newAccount} small-fs light`}>
        Don't have an account? <Link href="/signup" className={styles.createAccount}>Create free account</Link>
      </p>
      <span className="small-fs normal">Or</span>
      <p className={`${styles.providersLabel} normal medium-fs`}>Sign in with</p>
      <div className={styles.providers}>
        <button className={`${styles.provider} S-BTN`} onClick={handleLoginWithGoogle}>
          <Image src="/google.png" width="25" height="25" alt="Google" />
        </button>
        <button className={`${styles.provider} S-BTN`} onClick={handleLoginWithFacebook}>
          <Image src="/facebook.png" width="25" height="25" alt="Facebook" />
        </button>
        <button className={`${styles.provider} S-BTN`} onClick={handleLoginWithApple}>
          <Image src="/apple.png" width="25" height="25" alt="Apple" />
        </button>
      </div>
    </article>
  );
};

export default Login;
