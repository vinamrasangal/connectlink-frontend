import React, { useEffect, useState } from 'react';
import styles from '../styles/verification.module.scss';
import Logo from '../nestedComponents/Logo';
import { useDispatch } from 'react-redux';
import { alertActions } from '@/redux/AlertController';

const Verification = () => {
    const dispatch = useDispatch();
    const [isEmailSent,setIsEmailSent] = useState(false);
    const [coolDownTimer,setCoolDownTimer] = useState(60);
    const [isFetching,setIsFetching] = useState(true);
    function handleSendEmail(){
        if(!isEmailSent){
            setIsFetching(true)
            let timer;
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                setIsFetching(false);
                setIsEmailSent(true);
                timer = setInterval(()=>{
                    setCoolDownTimer(prev => {
                        if(prev > 0){
                            return prev-1;
                        }else {
                            clearInterval(timer);
                            setIsEmailSent(false);
                            return 60;
                        }
                    })
                },1000)
            })
            .catch((err)=>{
                dispatch(alertActions.showAlert({msg:err,type:'error'}))
                setIsFetching(false)
            });
        }
    }
    useEffect(()=>{
        handleSendEmail()
    },[])
    return (
        <section className={styles.verificationContainer}>
            {/* <article className={`${styles.verification} black normal large-fs`}>
                <Logo styles={{s:{width:220,height:40,FS:28},m:{width:300,height:70,FS:38},l:{width:420,height:80,FS:54}}}/>
                <h2 className={`${styles.heading} heading-fs bold`}>Verify Your Email</h2>
                <p className={styles.firstP}>
                    Thank you for registering! We have sent a confirmation email to the email address you provided.
                    To complete your registration, please follow the steps in the email to verify your account.
                </p>
                <p className={styles.secondP}>
                    If you didn't receive the email, please check your spam folder or click the button below to send another confirmation.
                </p>
                <button className={`${styles.resendBtn} P-BTN ${(isEmailSent || isFetching) && 'disabled'}`} onClick={handleSendEmail}>Resend email</button>
                {isEmailSent ? <p className={`${styles.resedP} small-fs light light-gray`}>you can resend email after {coolDownTimer} s</p> : ''}
                <p className={styles.lastP}>
                    Once your email is verified, you can start exploring and using all the features of our platform. 
                    If you have any questions or need assistance, please don't hesitate to contact our <a href='' className={styles.spportTeam}>support team</a>.
                </p>
            </article> */}
        </section>
    )
}

export default Verification