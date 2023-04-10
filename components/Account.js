import React, { useState } from 'react';
import styles from '../styles/Account.module.scss';
import Logo from './Logo';
import SignUp from './SignUp';
import Login from './Login';

const Account = () => {
    const [page,setPage] = useState('logIn');
    return (
        <section className={styles.account}>
            <aside className={styles.logo}>
                <Logo styles={{s:{width:220,height:40,FS:28},m:{width:300,height:70,FS:38},l:{width:420,height:80,FS:54}}}/>
            </aside>
            { page === 'logIn'?
                <Login setPage={setPage}/>
            :
                <SignUp />
            }
        </section>
    )
}

export default Account