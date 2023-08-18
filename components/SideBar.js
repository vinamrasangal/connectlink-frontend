import React, { useEffect, useState } from 'react';
import styles from '../styles/sidebar.module.scss';
import Logo from '../nestedComponents/Logo';
import { CiSearch } from 'react-icons/ci';
import { BiHomeAlt } from 'react-icons/bi';
import { FiBarChart2, FiUser, FiUsers, FiMessageSquare, FiLayers, FiHeadphones, FiSettings, FiLogOut } from 'react-icons/fi';
import { IoPricetagOutline } from 'react-icons/io5';
import Link from 'next/link';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../redux/ActionCreators/authAction';

const SideBar = () => {
    // const user = JSON.parse(localStorage.getItem('user'));
    // const user = { login: true }
    const user = useSelector(state => state.auth.user)
    console.log(user)
    const router = useRouter();
    const [active, setActive] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch();
    const currentPage = 'home';




    function handleSignOut() {
        dispatch(logout());
        localStorage.clear();
        // window.localStorage.setItem('user', null)
        router.push('/login')
    }


    return (
        <>
            <aside className={`${styles.sidebar} ${active ? `${styles.active}` : ''}`}>
                <button className={`${styles.slideBtn} x-large-fs light-gray`} onClick={() => setActive(prev => !prev)}>
                    {HiOutlineMenuAlt2({})}
                </button>
                <div className={styles.logo}>
                    <Logo styles={{ s: { width: 160, height: 30, FS: 20 }, m: { width: 190, height: 35, FS: 26 }, l: { width: 205, height: 40, FS: 28 } }} />
                </div>
                <ul className={styles.ul} role='list'>
                    <li className={`${styles.li} ${styles.search}`}>
                        <span className={`${styles.icon} large-fs light-gray`}>{CiSearch({})}</span>
                        <input type="text" name="" id="" className={`${styles.input} small-fs`} placeholder='search' />
                    </li>
                    <Link href='/'>
                        <li
                            className={`${styles.li} ${currentPage === 'home' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{BiHomeAlt({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Home</p>
                        </li >
                    </Link>
                    <Link href='/dashboard'>
                        <li
                            className={`${styles.li} ${currentPage === 'dashboard' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiBarChart2({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Dashboard</p>
                        </li>
                    </Link>
                    <Link href='/profile'>
                        <li
                            className={`${styles.li} ${currentPage === 'profile' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiUser({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Profile</p>
                        </li>
                    </Link>
                    <Link href='/messages'>
                        <li
                            className={`${styles.li} ${currentPage === 'messages' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiMessageSquare({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Messages</p>
                        </li>
                    </Link>
                    <Link href='/connections'>
                        <li
                            className={`${styles.li} ${currentPage === 'connections' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiUsers({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Connections</p>
                        </li>
                    </Link>
                    <Link href='/promotion'>
                        <li
                            className={`${styles.li} ${currentPage === 'promotion' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{IoPricetagOutline({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Promotion & Advertising</p>
                        </li>
                    </Link>
                    <Link href='/integrations'>
                        <li
                            className={`${styles.li} ${currentPage === 'integrations' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiLayers({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Integrations</p>
                        </li>
                    </Link>
                </ul>
                <ul className={styles.ul} role='list'>
                    <Link href='/support'>
                        <li
                            className={`${styles.li} ${currentPage === 'support' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiHeadphones({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Support</p>
                        </li >
                    </Link>
                    <Link href='/settings'>
                        <li
                            className={`${styles.li} ${currentPage === 'sittings' ? styles.active : ''}`}
                            onClick={() => setActive(false)}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiSettings({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Settings</p>
                        </li >
                    </Link>
                </ul>
                {user ?
                    <div className={styles.account}>
                        {imageUrl !== '' ?
                            <img src={imageUrl} alt="" className={styles.profileImage} />
                            :
                            <span className={`${styles.loggedOutIcon} x-large-fs dark-gray`}>
                                {FiUser({})}
                            </span>
                        }
                        <p className={`${styles.name} small-fs normal dark-gray`}>{user.username}</p>
                        {/* {auth.currentUser?
                            <span className={`${styles.email} small-fs light light-gray`}>{auth.currentUser.email}</span>
                                :
                            ''
                        } */}
                        <span className={`${styles.email} small-fs light light-gray`}>{user.email}</span>
                        <button className={`${styles.logOut} large-fs light-gray`} onClick={handleSignOut}>{FiLogOut({})}</button>
                    </div>
                    :
                    <div className={styles.loggedOut}>
                        <Link href='/signup'>
                            <button className={`P-BTN ${styles.btn}`}>
                                Sign up
                            </button>
                        </Link>
                        <span className={` ${styles.span}`}>
                            or
                        </span>
                        <Link href='/login'>
                            <button className={`S-BTN ${styles.btn}`}>
                                Log in
                            </button>
                        </Link>
                    </div>
                }
            </aside>
            <div className={`${styles.blurOverLay} ${active ? `${styles.active}` : ''}`}></div>
        </>
    )
}

export default SideBar;