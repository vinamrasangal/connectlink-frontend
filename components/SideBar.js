import React, { useState } from 'react';
import styles from '../styles/sidebar.module.scss';
import Logo from './Logo';
import { CiSearch } from 'react-icons/ci';
import { BiHomeAlt } from 'react-icons/bi';
import { FiBarChart2,FiUser,FiUsers,FiMessageSquare,FiLayers,FiHeadphones,FiSettings,FiLogOut } from 'react-icons/fi';
import { IoPricetagOutline } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { alertActions } from '@/redux/AlertController';
import { auth } from '@/config/firebaseConfig';

const SideBar = () => {
    const [active,setActive] = useState(false);
    const [currentPage,setCurrentPage] = useState('home');
    const dispatch = useDispatch();

    function handleSignOut(){
        signOut(auth)
        .then(()=>{
            dispatch(alertActions.showAlert({msg:'logged out successfully',type:'success'}));
        })
        .catch((err)=>{
            dispatch(alertActions.showAlert({msg:err.message,type:'error'}));
        })
    }
    return (
        <>
            <aside className={`${styles.sidebar} ${active? `${styles.active}`:''}`}>
                <button className={`${styles.slideBtn} x-large-fs light-gray`} onClick={()=>setActive(prev => !prev)}>
                    {HiOutlineMenuAlt2({})}
                </button>
                <div className={styles.logo}>
                    <Logo  styles={{s:{width:160,height:30,FS:20},m:{width:190,height:35,FS:26},l:{width:205,height:40,FS:28}}}/>
                </div>
                <ul className={styles.ul} role='list'>
                    <li className={`${styles.li} ${styles.search}`}>
                        <span className={`${styles.icon} large-fs light-gray`}>{CiSearch({})}</span>
                        <input type="text" name="" id="" className={`${styles.input} small-fs`} placeholder='search'/>
                    </li>
                    <Link href='/'>
                        <li 
                            className={`${styles.li} ${currentPage === 'home' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('home')} >
                            <span className={`${styles.icon} large-fs light-gray`}>{BiHomeAlt({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Home</p>
                        </li >
                    </Link>
                    <Link href='/dashboard'>
                        <li 
                            className={`${styles.li} ${currentPage === 'dashboard' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('dashboard')}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiBarChart2({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Dashboard</p>
                        </li>
                    </Link>
                    <Link href='/profile'>
                        <li 
                            className={`${styles.li} ${currentPage === 'profile' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('profile')}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiUser({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Profile</p>
                        </li>
                    </Link>
                    <Link href='/messages'>
                        <li 
                            className={`${styles.li} ${currentPage === 'messages' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('messages')}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiMessageSquare({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Messages</p>
                        </li>
                    </Link>
                    <Link href='/connections'>
                        <li 
                            className={`${styles.li} ${currentPage === 'connections' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('connections')}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiUsers({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Connections</p>
                        </li>
                    </Link>
                    <Link href='/promotion'>
                        <li 
                            className={`${styles.li} ${currentPage === 'promotion' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('promotion')}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{IoPricetagOutline({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Promotion & Advertising</p>
                        </li>
                    </Link>
                    <Link href='/integrations'>
                        <li 
                            className={`${styles.li} ${currentPage === 'integrations' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('integrations')}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiLayers({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Integrations</p>
                        </li>
                    </Link>
                </ul>
                <ul className={styles.ul} role='list'>
                    <Link href='/support'>
                        <li 
                            className={`${styles.li} ${currentPage === 'support' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('support')}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiHeadphones({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Support</p>
                        </li >
                    </Link>
                    <Link href='/sittings'>
                        <li 
                            className={`${styles.li} ${currentPage === 'sittings' ? styles.active : '' }`} 
                            onClick={()=>setCurrentPage('sittings')}
                        >
                            <span className={`${styles.icon} large-fs light-gray`}>{FiSettings({})}</span>
                            <p className={`${styles.text} small-fs normal normal-gray`}>Settings</p>
                        </li >
                    </Link>
                </ul>
                <div className={styles.account}>
                    <img src="/personal-image.png" alt="" className={styles.profileImage}/>
                    <p className={`${styles.name} small-fs normal dark-gray`}>Olivia Rhye</p>
                    <span className={`${styles.email} small-fs light light-gray`}>olivia@untitledui.com</span>
                    <button className={`${styles.logOut} large-fs light-gray`} onClick={handleSignOut}>{FiLogOut({})}</button>
                </div>
            </aside>
            <div className={`${styles.blurOverLay} ${active? `${styles.active}`:''}`}></div>
        </>
    )
}

export default SideBar