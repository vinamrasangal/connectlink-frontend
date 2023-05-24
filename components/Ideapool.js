import React, { useEffect, useState } from 'react';
import styles from '../styles/Ideapool.module.scss';
import { BiFilter } from 'react-icons/bi';
import { FiMoreHorizontal,FiMessageCircle,FiShare2,FiUser } from 'react-icons/fi';
import { BiLike } from 'react-icons/bi';
import { TbPointFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostActions } from '../redux/showCreatePost';
import { AiOutlineCheck } from 'react-icons/ai';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/config/firebaseConfig';

const Ideapool = () => {
    const [isSortShowen,setIsSortShowen] = useState(false);
    const [isPostShowen,setIsPostShowen] = useState(false);
    const [imageUrl,setImageUrl] = useState('')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    function handleClick(){
        dispatch(CreatePostActions.showCreatePost())
    }
    useEffect(()=>{
        if(user.isLoggedIN){
            if(user.userData.uid) {
                const storageRef = ref(storage,`images/personalImage_${user.userData.uid}`);
                getDownloadURL(storageRef)
                .then(url => {
                    setImageUrl(url)
                })
                .catch(()=>{
                    
                })
            }
        }
    },[user.isLoggedIN])
    return (
        <>
            <section className={styles.ideas}>
                <h2 className={`${styles.shareIdea} large-fs semi-bold dark-gray`}>Share an idea</h2>
                <div className={styles.createPost}>
                    {user.isLoggedIN?
                        <img className={styles.image} src={imageUrl} alt="" />
                    :
                        <span className={`${styles.loggedOutIcon} x-large-fs dark-gray`}>
                            {FiUser({})}
                        </span>
                    }
                    <input className={`${styles.input} medium-fs light light-gray`} placeholder='Share an idea...' type="text" onClick={handleClick} />
                </div>
                <div className={styles.explore}>
                    <h2 className='x-large-fs semi-bold normal-gray'>Explore ideas</h2>
                    <div className={styles.btns}>
                        <button className={`${styles.btn} medium-fs normal normal-gray`}>Popular</button>
                        <button className={`${styles.btn} medium-fs normal normal-gray`}>New</button>
                        <button className={`${styles.btn} medium-fs normal normal-gray`}>Yours</button>
                    </div>
                    <button className={`${styles.filterBtn} S-BTN`} onClick={()=>setIsSortShowen(prev => !prev)}>
                        <span className={`${styles.icon} x-large-fs `}>{BiFilter({})}</span>
                        <p>Sort By</p>
                    </button>
                    <ul className={`${styles.ul} ${isSortShowen && styles.showen} dark-gray normal medium-fs`} role='list'>
                        <li className={`${styles.li}`}>
                            <p className={styles.p}>
                                Top post
                            </p>
                            <span className={styles.span}>
                                {AiOutlineCheck({})}
                            </span>
                        </li>
                        <li className={`${styles.li} ${styles.active}`}>
                            <p className={styles.p}>
                                New post
                            </p>
                            <span className={styles.span}>
                                {AiOutlineCheck({})}
                            </span>
                        </li>
                        <li className={`${styles.li}`}>
                            <p className={styles.p}>
                                Your post
                            </p>
                            <span className={styles.span}>
                                {AiOutlineCheck({})}
                            </span>
                        </li>
                    </ul>
                </div>
                <article className={`${styles.post} ${isPostShowen && styles.showen}`}>
                    <div className={`${styles.hashTags} small-fs normal`}>
                        <span className={styles.hash}> #Needideaclarity </span>
                        <span className={`${styles.hashCount} normal-gray`}>+4</span>
                    </div>
                    <span className={`${styles.more} large-fs normal-gray`}>{FiMoreHorizontal({})}</span>
                    <h2 className={`${styles.title} large-fs bold normal-gray `}> Social Media App for Pet Owners  </h2>
                    <p className={`${styles.text} normal-gray light medium-fs`}>
                        I want to create a social media app specifically for pet owners. 
                        The app will allow users to connect with other pet owners, 
                        share pictures and videos of their pets, and find pet-friendly 
                        events and businesses in their area. I believe this app will fill 
                        a gap in the market for pet owners who want a dedicated platform 
                        to connect with others who share their love for pets.
                        I want to create a social media app specifically for pet owners. 
                        The app will allow users to connect with other pet owners, 
                        share pictures and videos of their pets, and find pet-friendly 
                        events and businesses in their area. I believe this app will fill 
                        a gap in the market for pet owners who want a dedicated platform 
                        to connect with others who share their love for pets.
                    </p>
                    <h2 className={`${styles.roles} semi-bold normal-gray medium-fs`}>Open Roles</h2>
                    <ul className={`${styles.ul} normal-gray light medium-fs`}>
                        <li className={styles.li}>
                            <p className={styles.p}>Android developer</p>
                            <span className={`${styles.span} light light-gray`}>1-2 YOE</span>
                            <span className={`${styles.span} ${styles.join} normal`}>Join team</span>
                        </li>
                        <li className={styles.li}>
                            <p className={styles.p}>IOS developer</p>
                            <span className={`${styles.span} light light-gray`}>2-3 YOE</span>
                            <span className={`${styles.span} ${styles.join} normal`}>Join team</span>
                        </li>
                        <li className={styles.li}>
                            <p className={styles.p}>Backend developer</p>
                            <span className={`${styles.span} light light-gray`}>3-4 YOE</span>
                            <span className={`${styles.span} ${styles.join} normal`}>Join team</span>
                        </li>
                        <li className={styles.li}>
                            <p className={styles.p}>UI/UX designer</p>
                            <span className={`${styles.span} light light-gray`}>Any YOE</span>
                            <span className={`${styles.span} ${styles.join} normal`}>Join team</span>
                        </li>
                    </ul>
                    <span className={`${styles.seeMore} medium-fs normal`}
                        onClick={()=>setIsPostShowen(prev => !prev)}
                    >{isPostShowen? 'See less' : 'See more'}</span>
                    <p className={`${styles.details} light-gray light medium-fs`}> <span className='semi-bold' >Posted by</span> Jenny Wilson <span className={styles.span}> {TbPointFilled({})} </span> 1hr ago </p>
                    <button className={styles.arrow}>
                        <span className={`${styles.icon} x-large-fs dark-gray`}>{BiLike({})}</span>
                        <span className={`${styles.count} medium-fs light light-gray`}>1k+</span>
                    </button>
                    <button className={styles.comments}>
                        <span className={`${styles.icon} x-large-fs dark-gray`}>{FiMessageCircle({})}</span>
                        <span className={`${styles.count} medium-fs light light-gray`}>20</span>
                    </button>
                    <button className={styles.share}>
                        <span className={`${styles.icon} x-large-fs dark-gray`}>{FiShare2({})}</span>
                        <span className={`${styles.count} medium-fs light light-gray`}>999</span>
                    </button>
                </article>
            </section>
            <section className={styles.rightSide}>
                <article className={styles.interests}>
                    <h2 className={`${styles.h2} large-fs light normal-gray`}>Interests</h2>
                    <ul className={styles.ul} role='list'>
                        <li className={styles.li}>
                            <p className='medium-fs normal dark-gray'>#Needideaclarity </p>
                            <span className='small-fs light light-gray'>300k+ posts</span>
                        </li>
                        <li className={styles.li}>
                            <p className='medium-fs normal dark-gray'>#lookingforteam </p>
                            <span className='small-fs light light-gray'>300k+ posts</span>
                        </li>
                        <li className={styles.li}>
                            <p className='medium-fs normal dark-gray'>#Discussion </p>
                            <span className='small-fs light light-gray'>300k+ posts</span>
                        </li>
                        <li className={styles.li}>
                            <p className='medium-fs normal dark-gray'>#Lookingforinvestor </p>
                            <span className='small-fs light light-gray'>300k+ posts</span>
                        </li>
                    </ul>
                </article>
                <article className={styles.trending}>
                    <h2 className={`${styles.h2} large-fs light normal-gray`}>Trending Products</h2>
                    <ul className={styles.ul} role='list'>
                        <li className={styles.li}>
                            <img className={styles.image} src="/avatar.png" alt="" />
                            <p className={`${styles.p} medium-fs normal dark-gray`}>Catalog </p>
                            <span className={`${styles.span} small-fs light light-gray`}>Brings all your news into one place</span>
                        </li>
                        <li className={styles.li}>
                            <img className={styles.image} src="/avatar2.png" alt="" />
                            <p className={`${styles.p} medium-fs normal dark-gray`}>Circooles </p>
                            <span className={`${styles.span} small-fs light light-gray`}>Super lightweight design app</span>
                        </li>
                        <li className={styles.li}>
                            <img className={styles.image} src="/avatar3.png" alt="" />
                            <p className={`${styles.p} medium-fs normal dark-gray`}>Command+R </p>
                            <span className={`${styles.span} small-fs light light-gray`}>AI and machine learning data</span>
                        </li>
                        <li className={styles.li}>
                            <img className={styles.image} src="/avatar4.png" alt="" />
                            <p className={`${styles.p} medium-fs normal dark-gray`}>Hourglass </p>
                            <span className={`${styles.span} small-fs light light-gray`}>Time management and productivity</span>
                        </li>
                    </ul>
                </article>
            </section>
        </>
    )
}

export default Ideapool