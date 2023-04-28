import React, { useState } from 'react';
import styles from '../styles/Account.module.scss';
import Logo from '../nestedComponents/Logo';
import SignUp from '../nestedComponents/SignUp';
import Login from '../nestedComponents/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const Account = () => {
    return (
        <section className={styles.account}>
            <aside className={styles.logo}>
                <Logo styles={{s:{width:220,height:40,FS:28},m:{width:300,height:70,FS:38},l:{width:420,height:80,FS:54}}}/>
            </aside>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </section>
    )
}

export default Account