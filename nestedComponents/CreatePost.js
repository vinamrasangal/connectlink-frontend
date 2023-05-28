import React, { useEffect, useState } from 'react';
import styles from '../styles/createPost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostActions } from '../redux/showCreatePost';
import DropImage from './DropImage';
import { FiUpload } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';

const CreatePost = () => {
    const isShowen = useSelector(state => state.createPostController.showen);
    const [image,setImage] = useState(null);
    const [imageUrl,setImageUrl] = useState(null);
    const [current,setCurrent] = useState(1);
    const [ideaFormData,setIdeaFormData] = useState({
        title:'',desc:'',industury:'',tags:'',links:'',discussion:false,requirement:false,roles:[{role:'',YOE:''}]
    });
    const [questionFormData,setQuestionFormData] = useState({
        question:'',desc:'',tags:''
    });
    const [discussionFormData,setDiscussionFormData] = useState({
        title:'',desc:'',tags:''
    });
    const [postInput,setPostInput] = useState('');

    function handleAddRoles(){
        setIdeaFormData(prev => ({...prev,roles:[...prev.roles,{role:'',YOE:''}]}))
    }

    function ideaFormChange(e,i){
        const {name,value} = e.target
        if(name === 'discussion' || name === 'requirement'){
            setIdeaFormData(prev => {
                let newObj = {...prev,[name]:!prev[name]}
                if(!newObj.requirement){
                    newObj.roles = [{role:'',YOE:''}]
                }
                return newObj
            })
        }else if(name === 'YOE' || name === 'role'){
            setIdeaFormData(prev => {
                let newarr = [...prev.roles]
                if(name === 'YOE'){
                    newarr[i] = {[name]:value,role:newarr[i].role}
                }else {
                    newarr[i] = {[name]:value,YOE:newarr[i].YOE}
                }
                return {
                    ...prev,
                    roles: newarr
                }
            })
        }else {
            setIdeaFormData(prev => ({...prev,[name]:value}))
        }
    }

    function questionFormChange(e){
        const {name,value  } = e.target
        setQuestionFormData(prev => ({...prev,[name]:value}))
    }
    function discussionFormChange(e){
        const {name,value  } = e.target
        setDiscussionFormData(prev => ({...prev,[name]:value}))
    }

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
                            onChange={(e)=>ideaFormChange(e)}
                            value={ideaFormData.title}
                            name='title'
                        />
                        <label className='small-fs normal dark-gray' htmlFor="desc">Idea Description</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your idea and how you envision it coming to life' 
                            onChange={(e)=>ideaFormChange(e)}
                            value={ideaFormData.desc}
                            name='desc'
                        />
                        <label className='small-fs normal dark-gray' htmlFor="industry">Industry</label>
                        <select 
                            className={`${styles.input} medium-fs light normal-gray`} 
                            id='industry' 
                            onChange={(e)=>ideaFormChange(e)}
                            value={ideaFormData.industury}
                            name='industury'
                            >
                            <option value="">Select the industry </option>
                        </select>
                        <label className='small-fs normal dark-gray' htmlFor="tags">Tags</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='tags' 
                            placeholder='Enter tags e.g #edtech, #produtivity' 
                            onChange={(e)=>ideaFormChange(e)}
                            value={ideaFormData.tags}
                            name='tags'
                        />
                        <div className={styles.add}>
                            <label className={`${styles.linksLabel} small-fs normal dark-gray`} htmlFor="links">Add links</label>
                            <input 
                                className={`${styles.input} ${styles.linksInput} medium-fs light normal-gray`}
                                type="text" 
                                id='links' 
                                placeholder='Add relevant links e.g articles/websites' 
                                onChange={(e)=>ideaFormChange(e)}
                                value={ideaFormData.links}
                                name='links'
                            />
                            <label className={`${styles.imageLabel} small-fs normal dark-gray`} htmlFor="desc">Add image</label>
                            <DropImage setAcceptedFile={setImage} setUrl={setImageUrl}>
                                <button className={`${styles.upload} S-BTN`}>
                                    {FiUpload({})} Upload
                                </button>
                            </DropImage>
                        </div>
                        <div className={styles.checkBoxes}>
                            <input 
                                type='checkbox' 
                                className={`${styles.checkbox} ${ideaFormData.discussion && 'checked'} checkbox `} 
                                onChange={(e)=>ideaFormChange(e)}
                                checked={ideaFormData.discussion}
                                name='discussion'
                                />
                            <label className={`${styles.label} small-fs normal dark-gray`} htmlFor="desc">Allow Discussion</label>
                            <p className={`${styles.p} small-fs light normal-gray `}>Start a discussion and get valuable insights from the community on your idea.</p>
                        </div>
                        <div className={styles.checkBoxes}>
                            <input 
                                type='checkbox' 
                                className={`${styles.checkbox} ${ideaFormData.requirement && 'checked'} checkbox `} 
                                onChange={(e)=>ideaFormChange(e)}
                                checked={ideaFormData.requirement}
                                name='requirement'
                                />
                            <label className={`${styles.label} small-fs normal dark-gray`} htmlFor="desc">Hire Requirement</label>
                            <p className={`${styles.p} small-fs light normal-gray`}>Specify the roles you need to bring your idea to life. Find the perfect fit for your team and start collaborating today.</p>
                        </div>
                        {ideaFormData.requirement &&
                            <>
                                <p className={`${styles.HireReqP} small-fs normal dark-gray`}>
                                    <label className={`${styles.HireReqLabel}`}>Required Roles</label> 
                                    <label className={`${styles.HireReqLabel}`}>Years of experience</label>
                                </p>
                                {ideaFormData.roles.map((e,i)=>
                                <div className={`${styles.HireInputs}`} key={i}>
                                    <input 
                                        className={`${styles.HireInput} medium-fs light normal-gray`} 
                                        type="text" 
                                        placeholder='e.g. developer, designer'
                                        value={e.role}
                                        onChange={(e)=>ideaFormChange(e,i)}
                                        name='role'
                                        />
                                    <select 
                                        className={`${styles.HireInput} medium-fs light normal-gray`} 
                                        type="text"
                                        value={e.YOE}
                                        onChange={(e)=>ideaFormChange(e,i)}
                                        name='YOE'
                                        >
                                        <option value="">eg: 1-2 Years</option>
                                        <option value="0-1">0-1 Years</option>
                                        <option value="1-2">1-2 Years</option>
                                        <option value="2-3">2-3 Years</option>
                                        <option value="3-4">3-4 Years</option>
                                        <option value="+4">+4 Years</option>
                                        <option value="Any">Any Years of experience</option>
                                    </select>
                                </div>)
                                }
                                {ideaFormData.roles.length < 4 &&
                                    <p className={`${styles.addIcon} small-fs normal`}>
                                        <span className={`${styles.icon} large-fs`}>
                                            {MdAdd({})}
                                        </span>
                                        <span className={styles.icon} onClick={handleAddRoles}>
                                            Add role
                                        </span>
                                    </p>
                                }
                            </>
                        }
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
                            value={questionFormData.question}
                            name='question'
                            onChange={(e)=>questionFormChange(e)}
                        />
                        <label className='small-fs normal dark-gray' htmlFor="desc">Description</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your idea and how you envision it coming to life' 
                            value={questionFormData.desc}
                            name='desc'
                            onChange={(e)=>questionFormChange(e)}
                        />
                        <label className='small-fs normal dark-gray' htmlFor="tags">Tags</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='tags' 
                            placeholder='Enter tags e.g #edtech, #produtivity' 
                            value={questionFormData.tags}
                            name='tags'
                            onChange={(e)=>questionFormChange(e)}
                        />
                        

                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Ask Question</button>
                        </div>
                    </form>
                    <form action="" className={styles.form}>
                    <label className='small-fs normal dark-gray'  htmlFor="title">Title</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='title' 
                            placeholder="What's on your mind?"
                            value={discussionFormData.title}
                            name='title'
                            onChange={(e)=>discussionFormChange(e)}
                        />
                        <label className='small-fs normal dark-gray' htmlFor="desc">Description</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='desc' 
                            placeholder='Tell us more about your topic' 
                            value={discussionFormData.desc}
                            name='desc'
                            onChange={(e)=>discussionFormChange(e)}
                        />
                        <label className='small-fs normal dark-gray' htmlFor="tags">Tags</label>
                        <input 
                            className={`${styles.input} medium-fs light normal-gray`}
                            type="text" 
                            id='tags' 
                            placeholder='Enter tags e.g #edtech, #produtivity' 
                            value={discussionFormData.tags}
                            name='tags'
                            onChange={(e)=>discussionFormChange(e)}
                        />
                        <div className={styles.btns}>
                            <button className={`${styles.cancelBtn} S-BTN`}>Cancel</button>
                            <button className={`${styles.postBtn} P-BTN`}>Post </button>
                        </div>
                    </form>
                    <form action="" className={styles.form}>
                        <textarea 
                            className={styles.input}
                            type="text" 
                            id='title' 
                            placeholder='What would you like to share today?' 
                            value={postInput}
                            onChange={(e)=>setPostInput(e.target.value)}
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