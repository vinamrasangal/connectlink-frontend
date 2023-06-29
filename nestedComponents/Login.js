import React,{useState} from 'react';
import Image from 'next/image';
import styles from '../styles/Account.module.scss';
import { useSelector ,useDispatch } from 'react-redux';
import { alertActions } from '@/redux/AlertController';
import { RxEyeOpen,RxEyeClosed } from 'react-icons/rx';
import Link from 'next/link';
import useGoogleAccount from '@/hooks/useGoogleAccount';
import useLogin from '@/hooks/useLogin';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
    const {loading,login } = useLogin()
    const { continueWithGoogle } = useGoogleAccount()
    const [showPassword,setShowPassword] = useState(false);
    const [loginData,setLoginData] = useState({email:'',password:'',rememberMe:false});
    const dispatch = useDispatch();

    function handleLoginChange(e){
        const name = e.target.name
        const value = e.target.value
        if(name === 'rememberMe') {
            setLoginData(prev => ({...prev,rememberMe:!prev.rememberMe}));
        } else {
            setLoginData(prev => ({...prev,[name]:value}));
        }
    }

    function handleLoginWithEmail(e){
        e.preventDefault();
        if(loginData.email === '' || loginData.password === ''){
            dispatch(alertActions.showAlert({msg:'make sure to fill up the inputs',showen:true,type:'warrning'}));
        }else {
            login(loginData.email,loginData.password,loginData.rememberMe);
        }
    }

    const handleLoginWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            continueWithGoogle(tokenResponse)
        },
        onError: res => dispatch(alertActions.showAlert({msg:res.error_description,type:'error',showen:true}))
    })

    function handleLoginWithFacebook(){
        
    }

    function handleLoginWithApple(){
        
    }
    return (
        <article className={styles.logIn}>
        <form action="" className={`${styles.form} medium-fs normal-gray`}>
            <label htmlFor="email" className={`${styles.formLabel} normal`}>Email</label>
            <input 
                type="text" 
                name='email' 
                id='email' 
                className={`${styles.formInput} light-gray light`}
                placeholder='example@email.com'
                value={loginData.email}
                onChange={(e)=>handleLoginChange(e)}
                />
            <div className={styles.passwordHolder}>
                <label htmlFor="password" className={`${styles.formLabel} normal`}>Password</label>
                <input 
                    type={showPassword? 'text': 'password'} 
                    name='password' 
                    id='password' 
                    className={`${styles.formInput} light-gray light`}
                    placeholder='***********'
                    onChange={(e)=>handleLoginChange(e)}
                    value={loginData.password}
                    />
                    <span className={`${styles.showPassword} x-large-fs light-gray`} onClick={()=>setShowPassword(prev => !prev)}>
                        {showPassword?
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
                name='rememberMe'
                id='rememberMe'
                className={styles.remeberMe}
                onChange={(e)=>handleLoginChange(e)}
                />
                <label htmlFor="rememberMe" className={`${styles.remeberMeLabel} normal small-fs`}>Rremember me</label>
                <a href="" className={`${styles.resetPass} small-fs`}>Forgot password?</a>
            </div>
            <button className={`${styles.logInBtn} ${loading?'clicked':''} P-BTN`} onClick={(e)=>handleLoginWithEmail(e)}>Log In</button>
        </form>
        <p className={`${styles.newAccount} small-fs light`}>
            Don't have an account? 
            <Link href='/signup' className={styles.createAccount} >
                Create free account
            </Link>
        </p>
        <span className='small-fs normal'> Or </span>
        <p className={`${styles.providersLabel} normal medium-fs`}>Sign in with</p>
        <div className={styles.providers}>
            <button className={`${styles.provider}  S-BTN`} onClick={handleLoginWithGoogle}>
                <Image 
                    src='/google.png'
                    width = '25'
                    height= '25'
                    alt=''
                />
            </button>
            <button className={`${styles.provider} S-BTN`} onClick={handleLoginWithFacebook}>
                <Image 
                    src='/facebook.png'
                    width = '25'
                    height= '25'
                    alt=''
                />
            </button>
            <button className={`${styles.provider} S-BTN`} onClick={handleLoginWithApple}>
                <Image 
                    src='/apple.png'
                    width = '25'
                    height= '25'
                    alt=''
                />
            </button>
        </div>
    </article>
    )
}

export default Login