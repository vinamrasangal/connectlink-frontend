import React, {useState, useEffect} from "react";
import styles from '../styles/Ideapool.module.scss';
import { FiMoreHorizontal, FiMessageCircle, FiShare2, FiUser, FiSend,  } from 'react-icons/fi';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { TbPointFilled } from 'react-icons/tb';
import ShareComponent from "@/nestedComponents/ShareComponent";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts, likeDislike } from "@/redux/ActionCreators/postAction";
import { HiArrowCircleUp } from "react-icons/hi";


const IdeapoolArticle = ({tags, title, question, type, desc,likes,comments, currentUser,postId,isLike}) => {
    const dispatch = useDispatch();
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const[comment, setComment] = useState("");
    const [isPostShowen, setIsPostShowen] = useState(false);
    const [shareData, setShareData] = useState(
        { url: '', quote: '', hashtag: '', isShowen: false })

    const likesCount = likes.length
    const likeObj = {userId:currentUser._id}
    
   
    const handleCommentClick = ()=>{
        setIsCommentOpen(prev => !prev);
    }

    const handleLike = () =>{
        dispatch(likeDislike(likeObj,postId));
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () =>{
        const commentObj = {desc:comment}
        dispatch(addComment(commentObj,postId))
    }
        

   

    return(
        <>
            <article className={`${styles.post} ${isPostShowen && styles.showen}`}>
                    <div className={`${styles.hashTags} small-fs normal`}>
                        <span className={styles.hash}> {tags} </span>
                        <span className={`${styles.hashCount} normal-gray`}>+4</span>
                    </div>
                    <span className={`${styles.more} large-fs normal-gray`}>{FiMoreHorizontal({})}</span>
                    <h2 className={`${styles.title} large-fs bold normal-gray `}> {type === "ask"? question: title} </h2>
                    <p className={`${styles.text} normal-gray light medium-fs`}>
                        {desc}
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
                        onClick={() => setIsPostShowen(prev => !prev)}
                    >{isPostShowen ? 'See less' : 'See more'}</span>
                    <p className={`${styles.details} light-gray light medium-fs`}> <span className='semi-bold' >Posted by</span> Jenny Wilson <span className={styles.span}> {TbPointFilled({})} </span> 1hr ago </p>
                    <button className={styles.arrow} onClick={handleLike}>
                        <span className={`${styles.icon} x-large-fs dark-gray`}>
                            {isLike ? (BiSolidLike({})):(BiLike({}))}</span>
                        <span className={`${styles.count} medium-fs light light-gray`}>{likesCount}</span>
                    </button>
                    <button className={styles.comments} onClick={handleCommentClick}>
                        <span className={`${styles.icon} x-large-fs dark-gray`}>{FiMessageCircle({})}</span>
                        <span className={`${styles.count} medium-fs light light-gray`}>20</span>
                    </button>
                    <button className={styles.share}
                        onClick={() => setShareData({ url: 'https://www.example.com', quote: 'Dummy text!', hashtag: '#muo', isShowen: true })}>
                        <span className={`${styles.icon} x-large-fs dark-gray`}>{FiShare2({})}</span>
                        <span className={`${styles.count} medium-fs light light-gray`}>999</span>
                    </button>
                    <ShareComponent
                    url={shareData.url}
                    quote={shareData.quote}
                    hashtag={shareData.hashtag}
                    isShowen={shareData.isShowen}
                    setShareData={setShareData}
            />
                </article>
                {isCommentOpen ?(
                <div className={styles.commentSection}>
                    <div className={styles.commentInput}>
                    <span className={`${styles.loggedOutIcon} x-large-fs dark-gray`}>
                            {FiUser({})}
                        </span>
                    <input className={`${styles.input} medium-fs light light-gray`} placeholder='write a comment' type="text" onChange={handleCommentChange}/>
                    <span className={`${styles.sendCommentIcon} x-large-fs `} onClick={handleCommentSubmit}>
                        {FiSend({})}
                    </span>

                   <hr />

                    </div>
                    <div className={styles.commentArea}>
                    <span className={`${styles.loggedOutIcon} x-large-fs dark-gray`}>
                            {FiUser({})}
                    </span>
                    <span className={styles.commentBubble}>
                        <div className={styles.userInfo}>
                            <p className={`${styles.userName} large-fs bold normal-gray`} >John Doe</p>
                            <p className={`${styles.commentTime}`}> 10 hours ago</p>
                        </div>
                        <p>I absolutely love this concept! A pet-centric social media app sounds like a fantastic idea, providing a tailored space for pet owners to bond over their furry friends and discover pet-related activities. 🐾</p>
                    </span>


                    


                   
                    </div>
                    <div className={styles.commentArea}>
                    <span className={`${styles.loggedOutIcon} x-large-fs dark-gray`}>
                            {FiUser({})}
                    </span>
                    <span className={styles.commentBubble}>
                        <div className={styles.userInfo}>
                            <p className={`${styles.userName} large-fs bold normal-gray`} >John Doe</p>
                            <p className={`${styles.commentTime}`}> 10 hours ago</p>
                        </div>
                        <p>I absolutely love this concept!</p>
                    </span>


                    


                   
                    </div>
                    
                   
                       
                </div>):(<></>)}

                
        </>
        
    )
}

export default IdeapoolArticle;