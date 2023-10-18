import React, { useEffect, useState } from 'react';
import styles from '../styles/Ideapool.module.scss';
import { BiFilter } from 'react-icons/bi';
import { FiMoreHorizontal, FiMessageCircle, FiShare2, FiUser } from 'react-icons/fi';
import { BiLike } from 'react-icons/bi';
import { TbPointFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/ActionCreators/postAction';
import { openPost } from '../redux/ActionCreators/postAction';
import { AiOutlineCheck } from 'react-icons/ai';
import ShareComponent from '@/nestedComponents/ShareComponent';
import IdeapoolArticle from './IdeapoolArticle';
import { getProfile } from '@/redux/ActionCreators/profileAction';




const Ideapool = () => {
    const [isSortShowen, setIsSortShowen] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [shareData, setShareData] = useState(
        { url: '', quote: '', hashtag: '', isShowen: false })
    const auth = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const post = useSelector(state=> state.post);
    const PostArray = post.allPosts.AllPost
    const currentUser = useSelector(state=> state.users.profile)
    


    const handleClick = () => {
        console.log('ffff')
        dispatch(openPost())
    }

    useEffect(() => {
        dispatch(getProfile())
        dispatch(getPosts())
    }, [])



    return (
        <>
            <section className={styles.ideas}>
                <h2 className={`${styles.shareIdea} large-fs semi-bold dark-gray`}>Share an idea</h2>
                <div className={styles.createPost}>
                    {(auth && imageUrl !== '') ?
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
                    <button className={`${styles.filterBtn} S-BTN`} onClick={() => setIsSortShowen(prev => !prev)}>
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
                {PostArray?.map((post)=><IdeapoolArticle key={post._id} title={post.title} type={post.type} tags={post.tags} desc={post.desc} question={post.question} likes= {post.likes} islike = {post.isLike} comments={post.comments} currentUser={currentUser} postId = {post._id} />)}
                
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