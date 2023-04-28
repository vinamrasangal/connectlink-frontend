import React, { useEffect, useState } from 'react';
import styles from '../styles/createPost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostActions } from '../redux/showCreatePost';

const CreatePost = () => {
    const isShowen = useSelector(state => state.createPostController.showen)
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
                    <li className={`${styles.li} ${current === 4? styles.active :''}`} onClick={()=>setCurrent(4)}>Custom</li>
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
                        <div className={styles.rolesAndTags}>
                            <label htmlFor="" className={`${styles.RolesLable} small-fs normal dark-gray`}>Required Roles</label>
                            <input className={`${styles.input} ${styles.RolesInput} medium-fs light normal-gray`} placeholder='tell us more' type="text" />
                            <label htmlFor="" className={`${styles.tagsLabel} small-fs normal dark-gray`}>tags</label>
                            <select className={`${styles.input} ${styles.tagsInput} medium-fs light normal-gray`} id='industry'>
                                <option value="">Select relevant tags </option>
                            </select>
                        </div>
                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`} onClick={(e)=>handleCancel(e)}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Post Idea</button>
                        </div>
                    </form>
                    <form action="" className={styles.form}>
                        <label  htmlFor="title">Idea Title</label>
                        <input 
                            className={styles.input}
                            type="text" 
                            id='title' 
                            placeholder='Briefly describe your idea in a few words' 
                        />
                        <label  htmlFor="desc">Idea Description</label>
                        <input 
                            className={styles.input}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your idea and how you envision it coming to life' 
                        />
                        <label htmlFor="industry">Industry</label>
                        <select className={styles.input} id='industry' >
                            <option value="">Select the industry </option>
                        </select>
                        <div className={styles.rolesAndTags}>
                            <label htmlFor="" className={styles.RolesLable}>Required Roles</label>
                            <input className={`${styles.input} ${styles.RolesInput}`} placeholder='tell us more' type="text" />
                            <label htmlFor="" className={styles.tagsLabel}>tags</label>
                            <select className={`${styles.input} ${styles.tagsInput}`} id='industry'>
                                <option value="">Select relevant tags </option>
                            </select>
                        </div>
                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Post Idea</button>
                        </div>
                    </form>
                    <form action="" className={styles.form}>
                        <label  htmlFor="title">Idea Title</label>
                        <input 
                            className={styles.input}
                            type="text" 
                            id='title' 
                            placeholder='Briefly describe your idea in a few words' 
                        />
                        <label  htmlFor="desc">Idea Description</label>
                        <input 
                            className={styles.input}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your idea and how you envision it coming to life' 
                        />
                        <label htmlFor="industry">Industry</label>
                        <select className={styles.input} id='industry' >
                            <option value="">Select the industry </option>
                        </select>
                        <div className={styles.rolesAndTags}>
                            <label htmlFor="" className={styles.RolesLable}>Required Roles</label>
                            <input className={`${styles.input} ${styles.RolesInput}`} placeholder='tell us more' type="text" />
                            <label htmlFor="" className={styles.tagsLabel}>tags</label>
                            <select className={`${styles.input} ${styles.tagsInput}`} id='industry'>
                                <option value="">Select relevant tags </option>
                            </select>
                        </div>
                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Post Idea</button>
                        </div>
                    </form>
                    <form action="" className={styles.form}>
                        <label  htmlFor="title">Idea Title</label>
                        <input 
                            className={styles.input}
                            type="text" 
                            id='title' 
                            placeholder='Briefly describe your idea in a few words' 
                        />
                        <label  htmlFor="desc">Idea Description</label>
                        <input 
                            className={styles.input}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your idea and how you envision it coming to life' 
                        />
                        <label htmlFor="industry">Industry</label>
                        <select className={styles.input} id='industry' >
                            <option value="">Select the industry </option>
                        </select>
                        <div className={styles.rolesAndTags}>
                            <label htmlFor="" className={styles.RolesLable}>Required Roles</label>
                            <input className={`${styles.input} ${styles.RolesInput}`} placeholder='tell us more' type="text" />
                            <label htmlFor="" className={styles.tagsLabel}>tags</label>
                            <select className={`${styles.input} ${styles.tagsInput}`} id='industry'>
                                <option value="">Select relevant tags </option>
                            </select>
                        </div>
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