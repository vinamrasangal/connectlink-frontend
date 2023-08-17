import React, { useState } from 'react';
import styles from '../styles/Account.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '@/redux/AlertController';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import useSignup from '@/hooks/useSignup';
import validator from 'validator';
import { useRouter } from 'next/router';


const SignUp = () => {
    const router = useRouter();
    const [signUpData, setSignUpData] = useState({ name: '', email: '', category: '', password: '', confirmPassword: '', agreement: false });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const alert = useSelector(state => state.alertController);

    const dispatch = useDispatch();

    const { loading, signup } = useSignup()

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        if (name === 'agreement') {
            setSignUpData(prev => ({ ...prev, agreement: !prev.agreement }));
        } else {
            setSignUpData(prev => ({ ...prev, [name]: value }));
        }
    }
    function handleClick(e) {
        e.preventDefault();
        const { name, email, category, password, confirmPassword, agreement } = signUpData
        if (name === '' || email === '' || category === '' || password === '' || confirmPassword === '') {
            dispatch(alertActions.showAlert({ msg: 'make sure to fill up all the inputs', showen: true, type: 'warrning' }));
        } else if (!agreement) {
            dispatch(alertActions.showAlert({ msg: 'make sure to agree the platform conditions', showen: true, type: 'warrning' }));
        } else if (!validator.isEmail(email)) {
            dispatch(alertActions.showAlert({ msg: 'please use a valid email address', showen: true, type: 'error' }));
        } else if (!/^(?=.{8,})/.test(password)) {
            dispatch(alertActions.showAlert({ msg: 'the password should be at least 8 characters', showen: true, type: 'error' }));
        } else if (!/^(?=.*[a-z])/.test(password)) {
            dispatch(alertActions.showAlert({ msg: 'the password should be at least contain 1 lowercase', showen: true, type: 'error' }));
        } else if (!/(?=.*[A-Z])/.test(password)) {
            dispatch(alertActions.showAlert({ msg: 'the password should be at least contain 1 uppercase', showen: true, type: 'error' }));
        } else if (!/(?=.*[0-9])/.test(password)) {
            dispatch(alertActions.showAlert({ msg: 'the password should be at least contain 1 number', showen: true, type: 'error' }));
        } else if (password !== confirmPassword) {
            dispatch(alertActions.showAlert({ msg: 'make sure to match the password', showen: true, type: 'error' }));
        }
        else {
            signup(signUpData.name, signUpData.email, signUpData.password);
            if (alert.type === 'error') {
                router.push('/signup')
            } else {
                router.push('/');
            }
        }
    }
    return (
        <article className={styles.signUp}>
            <form action="" className={`${styles.form} medium-fs normal-gray`} >
                <label htmlFor="name" className={`${styles.formLabel} normal`}>Username</label>
                <input
                    type="text"
                    name='name'
                    id='name'
                    className={`${styles.formInput} light-gray light`}
                    placeholder='name'
                    onChange={(e) => handleChange(e)}
                    value={signUpData.name}
                />
                <label htmlFor="email" className={`${styles.formLabel} normal`}>Email</label>
                <input
                    type="text"
                    name='email'
                    id='email'
                    className={`${styles.formInput} light-gray light`}
                    placeholder='example@email.com'
                    onChange={(e) => handleChange(e)}
                    value={signUpData.email}
                />
                <label htmlFor="category" className={`${styles.formLabel} normal`}>Tell us who you are</label>
                <select
                    name="category"
                    id="category"
                    className={`${styles.formInput} light-gray light`}
                    placeholder='select your category'
                    onChange={(e) => handleChange(e)}
                    value={signUpData.category}
                >
                    <option className={`dark-gray light ${styles.option}`} value="">Select your category</option>
                    <option className={`dark-gray light ${styles.option}`} value="Startup">Startup</option>
                    <option className={`dark-gray light ${styles.option}`} value="Small to mid-sized business">Small to mid-sized business</option>
                    <option className={`dark-gray light ${styles.option}`} value="Individuals">Individuals</option>
                    <option className={`dark-gray light ${styles.option}`} value="Service providers">Service providers</option>
                    <option className={`dark-gray light ${styles.option}`} value="Event organizers">Event organizers</option>
                    <option className={`dark-gray light ${styles.option}`} value="Others">Others</option>
                </select>
                <div className={styles.passwordHolder}>
                    <label htmlFor="password" className={`${styles.formLabel} normal`}>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        id='password'
                        className={`${styles.formInput} light-gray light`}
                        placeholder='***********'
                        onChange={(e) => handleChange(e)}
                        value={signUpData.password}
                    />
                    <span className={`${styles.showPassword} x-large-fs light-gray`} onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ?
                            RxEyeOpen({})
                            :
                            RxEyeClosed({})
                        }
                    </span>
                    <p className={`${styles.passwordP} small-fs light light-gray`}>Your password must be at least 8 characters long and include a mix of letters and numbers</p>
                </div>
                <div className={styles.passwordHolder}>
                    <label htmlFor="confrimPassword" className={`${styles.formLabel} normal`}>Confirm Password</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        id='confrimPassword'
                        className={`${styles.formInput} light-gray light`}
                        placeholder='***********'
                        onChange={(e) => handleChange(e)}
                        value={signUpData.confirmPassword}
                    />
                    <span className={`${styles.showPassword} x-large-fs light-gray`} onClick={() => setShowConfirmPassword(prev => !prev)}>
                        {showConfirmPassword ?
                            RxEyeOpen({})
                            :
                            RxEyeClosed({})
                        }
                    </span>
                    <p className={`${styles.passwordP} small-fs light light-gray`}>Your password must be at least 8 characters long and include a mix of letters and numbers</p>
                </div>
                <div className={styles.checkbox}>
                    <input
                        type='checkbox'
                        name='agreement'
                        id='agreement'
                        className={styles.agreement}
                        onChange={(e) => handleChange(e)}
                        value={signUpData.agreement}
                    />
                    <label htmlFor="agreement" className={`${styles.agreementLabel} normal small-fs`}>I agree to the platform's <a href="" className={`${styles.terms} small-fs`}>terms and conditions.</a></label>
                </div>
                <button className={`${styles.signUpBtn} ${loading ? 'clicked' : ''} P-BTN`} onClick={(e) => handleClick(e)}>Create Account</button>
            </form>
        </article>
    )
}

export default SignUp