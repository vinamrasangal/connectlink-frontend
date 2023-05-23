import React, { useEffect, useState } from 'react';
import styles from '../styles/Messages.module.scss';
import Chat from '@/nestedComponents/Chat';
import { useDispatch } from 'react-redux';
import { currentPageAction } from '@/redux/CurrentPage';

const messages = () => {
    const [showenUsers,setShowenUsers] = useState('messages');
    const [isShowen,setIsShowen] = useState(false);

    const [messages,setMessages] = useState(new Array(10).fill(0));
    const [requests,setRequests] = useState(new Array(5).fill(0));

    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(currentPageAction.setPage({page:'messages'}))
    },[])
    return (
        <section className={`container ${styles.container}`}>
            <div className={`${styles.holder} ${isShowen && styles.showen}`}>
                <article className={styles.users}>
                    <h2 className={`${styles.h2} semi-bold x-large-fs dark-gray`}>{showenUsers === 'messages' ? 'Messages' : 'Requests'}</h2>
                    <div className={styles.tabs}>
                        <button className={`${styles.btn}  ${showenUsers === 'messages' && styles.active} normal-gray medium-fs normal`} onClick={()=>setShowenUsers('messages')}>
                            <span>
                                Messages
                            </span>
                        </button>
                        <button className={`${styles.btn}  ${showenUsers === 'requests' && styles.active} normal-gray medium-fs normal`} onClick={()=>setShowenUsers('requests')}>
                            <span>
                                Requests
                            </span>
                            <span className={styles.num}>
                                2
                            </span>
                        </button>
                    </div>
                    {showenUsers === 'messages' ?
                        <ul className={styles.ul} role='list'>
                            {messages.map((e,i)=> (
                                <li key={i} className={styles.li} onClick={()=>setIsShowen(prev => !prev)}>
                                    <img src="/personal-image.png" className={styles.image} alt="" />
                                    <span className={`${styles.isActive} ${i%2 === 0 && styles.active}`}></span>
                                    <span className={`${styles.isNotRead} ${i%2 === 1 && styles.active}`}></span>
                                    <h2 className={`${styles.name} medium-fs normal normal-gray`}> Phoenix Baker <span className={`${styles.date} light-gray light small-fs `}> Just now </span> </h2>
                                    <span className={`${styles.email} light-gray light medium-fs`}> @phoenix </span>
                                    <p className={`${styles.msg} light-gray light medium-fs`}> Looks good! </p>
                                </li>
                            ))
                                
                            }
                        </ul>
                    :
                        <ul className={styles.ul} role='list'>
                            {requests.map((e,i)=> (
                                <li className={styles.li} key={i}>
                                    <img src="/personal-image.png" className={styles.image} alt="" />
                                    <span className={`${styles.isActive} ${styles.active}`}></span>
                                    <span className={`${styles.isNotRead} ${styles.active}`}></span>
                                    <h2 className={`${styles.name} medium-fs normal normal-gray`}> Phoenix Baker <span className={`${styles.date} light-gray light small-fs `}> Just now </span> </h2>
                                    <span className={`${styles.email} light-gray light medium-fs`}> @phoenix </span>
                                    <p className={`${styles.msg} light-gray light medium-fs`}> Looks good! </p>
                                </li>
                            ))}
                        </ul>
                    }
                </article>  
                <Chat setIsShowen={setIsShowen}/>
            </div>
        </section>
    )
}

export default messages