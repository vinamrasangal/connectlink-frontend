import React, { useEffect } from 'react';
import styles from '../styles/Account.module.scss';
import Logo from '@/nestedComponents/Logo';
import Login from '@/nestedComponents/Login';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebaseConfig';

const login = () => {
    const router = useRouter();
    useEffect(()=>{
        if(auth.currentUser){
            router.push('/')
        }
    },[])
    return (
        <>
            {!auth.currentUser && 
                <section className={styles.account}>
                    <aside className={styles.logo}>
                        <Logo styles={{s:{width:220,height:40,FS:28},m:{width:300,height:70,FS:38},l:{width:420,height:80,FS:54}}}/>
                    </aside>
                    <Login />
                </section>
            }
        </>
    )
}

export default login