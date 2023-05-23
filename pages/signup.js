import React, { useEffect } from 'react';
import styles from '../styles/Account.module.scss';
import Logo from '@/nestedComponents/Logo';
import SignUp from '@/nestedComponents/SignUp';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const signup = () => {
    const user = useSelector(state => state.user);
    const router = useRouter();
    useEffect(()=>{
        if(user.isLoggedIN){
            router.push('/')
        }
    },[user.isLoggedIN])
    return (
        <>
            {!user.isLoggedIN  && 
                <section className={styles.account}>
                    <aside className={styles.logo}>
                        <Logo styles={{s:{width:220,height:40,FS:28},m:{width:300,height:70,FS:38},l:{width:420,height:80,FS:54}}}/>
                    </aside>
                    <SignUp />
                </section>
            }
        </>
    )
}

export default signup