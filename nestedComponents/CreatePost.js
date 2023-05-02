import React, { useEffect, useState } from 'react';
import styles from '../styles/createPost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostActions } from '../redux/showCreatePost';
import DropImage from './DropImage';
import { FiUpload } from 'react-icons/fi';

const CreatePost = () => {
    const isShowen = useSelector(state => state.createPostController.showen);
    const [image,setImage] = useState(null);
    const [imageUrl,setImageUrl] = useState(null);
    const [current,setCurrent] = useState(1);
    const dispatch = useDispatch();
    function handleCancel(e){
        e.preventDefault();
        dispatch(CreatePostActions.hideCreatePost());
    }
    return (
        <section className={`${styles.createPost} ${isShowen ? styles.showen : ''}`}>
            <article className={styles.post}>
                <h2 className={`${styles.h2} large-fs semi-bold black`}>Create Post</h2>
                <ul className={`${styles.ul} medium-fs normal`} role='list'>
                    <li className={`${styles.li} ${current === 1? styles.active :''}`} onClick={()=>setCurrent(1)}>Share Your Idea</li>
                    <li className={`${styles.li} ${current === 2? styles.active :''}`} onClick={()=>setCurrent(2)}>Ask Question</li>
                    <li className={`${styles.li} ${current === 3? styles.active :''}`} onClick={()=>setCurrent(3)}>Discussion</li>
                    <li className={`${styles.li} ${current === 4? styles.active :''}`} onClick={()=>setCurrent(4)}>Post</li>
                </ul>
                <div 
                className={`${styles.formsHolder} ${current === 1?styles.first:''} ${current === 2?styles.second:''} ${current === 3?styles.third:''} ${current === 4?styles.fourth:''}`}
                >
                    <form action="" className={styles.form}>
                        <label className='small-fs normal dark-gray'  htmlFor="title">Idea Title</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='title' 
                            placeholder='Briefly describe your idea in a few words' 
                        />
                        <label className='small-fs normal dark-gray' htmlFor="desc">Idea Description</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your idea and how you envision it coming to life' 
                        />
                        <label className='small-fs normal dark-gray' htmlFor="industry">Industry</label>
                        <select className={`${styles.input} medium-fs light normal-gray`} id='industry' >
                            <option value="">Select the industry </option>
                        </select>
                        <label className='small-fs normal dark-gray' htmlFor="desc">Tags</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Enter tags e.g #edtech, #produtivity' 
                        />
                        <div className={styles.add}>
                            <label className={`${styles.linksLabel} small-fs normal dark-gray`} htmlFor="desc">Add links</label>
                            <input 
                                className={`${styles.input} ${styles.linksInput} medium-fs light normal-gray`}
                                type="text" 
                                id='desc' 
                                placeholder='Add relevant links e.g articles/websites' 
                            />
                            <label className={`${styles.imageLabel} small-fs normal dark-gray`} htmlFor="desc">Add image</label>
                            <DropImage setAcceptedFile={setImage} setUrl={setImageUrl}>
                                <button className={`${styles.upload} S-BTN`}>
                                    {FiUpload({})} Upload
                                </button>
                            </DropImage>
                        </div>
                        <div className={styles.checkBoxes}>
                            <input type='checkbox' className={`${styles.checkbox} checkbox `} />
                            <label className={`${styles.label} small-fs normal dark-gray`} htmlFor="desc">Allow Discussion</label>
                            <p className={`${styles.p} small-fs light normal-gray `}>Start a discussion and get valuable insights from the community on your idea.</p>
                        </div>
                        <div className={styles.checkBoxes}>
                            <input type='checkbox' className={`${styles.checkbox} checkbox `} />
                            <label className={`${styles.label} small-fs normal dark-gray`} htmlFor="desc">Hire Requirement</label>
                            <p className={`${styles.p} small-fs light normal-gray`}>Specify the roles you need to bring your idea to life. Find the perfect fit for your team and start collaborating today.</p>
                        </div>
                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`} onClick={(e)=>handleCancel(e)}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Post Idea</button>
                        </div>
                    </form>
                    <form action="" className={styles.form}>
                        <label className='small-fs normal dark-gray'  htmlFor="title">Question</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='title' 
                            placeholder='What do you want to ask?' 
                        />
                        <label className='small-fs normal dark-gray' htmlFor="desc">Description</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your idea and how you envision it coming to life' 
                        />
                        <label className='small-fs normal dark-gray' htmlFor="industry">Tags</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Enter tags e.g #edtech, #produtivity' 
                        />
                        

                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Post Idea</button>
                        </div>
                    </form>
                    <form action="" className={styles.form}>
                    <label className='small-fs normal dark-gray'  htmlFor="title">Title</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='title' 
                            placeholder="What's on your mind?"
                        />
                        <label className='small-fs normal dark-gray' htmlFor="desc">Description</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your topic' 
                        />
                        <label className='small-fs normal dark-gray' htmlFor="industry">Tags</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Enter tags e.g #edtech, #produtivity' 
                        />
                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Post Idea</button>
                        </div>
                    </form>
                    <form action="" className={styles.form}>
                        <textarea 
                            className={styles.input}
                            type="text" 
                            id='title' 
                            placeholder='What would you like to share today?' 
                        />
                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Post Idea</button>
                        </div>
                    </form>
                </div>
            </article>
        </section>
    )
}

export default CreatePost