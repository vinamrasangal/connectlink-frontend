import React, { useEffect, useState } from 'react';
import styles from '../styles/ProfileCreation.module.scss';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { alertActions } from '@/redux/AlertController';
import { FiUploadCloud } from 'react-icons/fi';
import { ref,uploadBytes,deleteObject } from 'firebase/storage';
import { auth, storage } from '@/config/firebaseConfig';
import DropImage from '@/nestedComponents/DropImage';
import AddHistory from '@/nestedComponents/AddHistory';
import { AiOutlineDelete,AiOutlineArrowRight,AiOutlineArrowLeft } from 'react-icons/ai';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';




const ProfileCreation = () => {
    const [progress,setProgress] = useState(25);
    const [sliderTransform,setSliderTransform] = useState(0);
    const dispatch = useDispatch();
    const [personalImage,setPersonalImage] = useState(null);
    const [personalImageUrl,setPersonalImageUrl] = useState(null);
    const [coverImage,setCoverlImage] = useState(null);
    const [showenAddHistory,setShowenAddHistory] = useState(null);
    const [formData,setFormData] = useState({
        FName:'',
        LName:'',
        JobTitle:'',
        Company:'',
        Industry:'',
        Bio:'',
        Email:'',
        PhoneNum:'',
        Address:'',
        Website:'',
        LinkedIn:'',
        Instagram:'',
        Facebook:'',
        Twitter:'',
        Skill:'',
        Skills:[],
        Award:'',
        Awards:[],
        Interest:'',
        Interests:[],
        workHistory:[],
        eduHistory:[],
        certifications:[],
        volunteer:[],
        agreement:false
    });
    function handleShowAddHistory(e,type) {
        e.preventDefault();
        if(showenAddHistory === type ) {
            setShowenAddHistory(null);
        }else {
            setShowenAddHistory(type);
        }
    }

    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        if(name === 'agreement'){
            setFormData(prev => ({...prev,agreement:!prev.agreement}));
        }else {
            setFormData(prev => ({...prev,[name]:value}));
        }
    }

    function removeHistory(name,index){
        setFormData(prev => ({...prev,[name]:prev[name].filter((e,i)=> i !== index)}))
    }

    function handleAdd(e,inputName){
        e.preventDefault();
        let isItemExist = formData[`${inputName}s`].filter(e => e === formData[inputName]).length > 0;
        if(formData[inputName] === ''){

        }else if(isItemExist){
            dispatch(alertActions.showAlert({msg:`the ${inputName} is already added`,showen:true, type:'warrning'}));
        } else {
            setFormData(prev => {
                let newItems = [...prev[`${inputName}s`],prev[inputName]];
                return {
                    ...prev,
                    [`${inputName}s`]:newItems,
                    [inputName]:''
                }
            })
        }
    }

    function handleRemove(e,itemsName,item){
        e.preventDefault();
        setFormData(prev => {
            let newItems = prev[itemsName].filter(prevItem => prevItem != item);
            return {
                ...prev,
                [itemsName]:newItems
            }
        })
    }


    function handleUploadImages(){
        if(personalImage.length > 0){
            const personalImageRef = ref(storage,`images/personalImage_${auth.currentUser.uid}`);
            uploadBytes(personalImageRef,personalImage[0]);
        }
        // if(coverImage.length < 0){
        //     const coverImageRef = ref(storage,`${auth.currentUser.uid}/coverImage_${coverImage[0].name}`);
        //     uploadBytes(coverImageRef,coverImage[0]);
        // }
    }

    function handleNext(e){
        e.preventDefault();
        if(formData.FName === '' || formData.Email === ''){
            dispatch(alertActions.showAlert({msg:'make sure to fill up all the required feilds',type:'warrning'}))
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.Email)) {
            dispatch(alertActions.showAlert({msg:'please use a valid email address',showen:true,type:'warrning'}));
        } else {
            setProgress(prev => prev + 25);
            setSliderTransform(prev => prev + 100);
        }
    }

    function handleBack(e){
        e.preventDefault();
        setProgress(prev => prev - 25);
        setSliderTransform(prev => prev - 100);
    }



    function handleCreateProfile(e){
        e.preventDefault();
        handleUploadImages();
        if(formData.agreement){
            const {
                Address:address,
                Awards:awards,
                Bio:bio,
                certifications,
                Company:companyName,
                eduHistory,
                Email:email,
                Facebook:facebook,
                FName:firstName,
                Industry:industury,
                Instagram:instagram,
                Interests:interests,
                JobTitle:jobTitle,
                LName:lastName,
                LinkedIn:linkedIn,
                PhoneNum:phoneNumber,
                Skills:skills,
                Twitter:twitter,
                volunteer:volunteer,
                Website:websiteURL,
            } = formData;
            const ref = doc(db,'userData',auth.currentUser.uid);
            setDoc(ref,{
                address,awards,bio,certifications,companyName,eduHistory,
                email,facebook,firstName,industury,instagram,interests,jobTitle,
                lastName,linkedIn,phoneNumber,skills,twitter,volunteer,websiteURL,
                profileCreated:true
            })
            .then(()=> dispatch(alertActions.showAlert({msg:'profile created successfully',type:'success'})))
            .catch((err)=> dispatch(alertActions.showAlert({msg:err.message,type:'error'})))
        }else {
            dispatch(alertActions.showAlert({msg:'make sure to agree to our privacy policy',type:'warrning'}))
        }
    }

    // useEffect(()=>{
    //     const removeStateChanged =onAuthStateChanged(auth,(res)=>{
    //         if (res) {
    //             dispatch(userAction.setUser({isLoggedIN:true,rememberMe:formData.rememberMe,userData:auth.currentUser}));
    //         }
    //     })
    //     return () => removeStateChanged();
    // },[])

    return (
        <>
            <section className={styles.ProfileCreation}>
                <h2 className={`${styles.heading} heading2-fs bold dark-gray`}>Create Your Personal Profile</h2>
                <div className={styles.progressBar}>
                    <span className={styles.progress} style={{width:`${progress}%`}}></span>
                </div>
                <p className={`${styles.firstP} light-gray light medium-fs`}>
                    Showcase your skills, achievements, and personality to potential employers, 
                    clients, and collaborators by creating a personal profile that tells your 
                    story and highlights your strengths.
                </p>
                <article className={styles.formsSlider}>
                    <article className={styles.formsHolder} style={{transform:`translateX(calc(-${sliderTransform}% - ${sliderTransform*2}px))`}}>
                        <form action="" className={`${styles.form} ${styles.firstForm} medium-fs normal-gray`}>
                            <div className={styles.uploadImages}>
                                <DropImage setAcceptedFile={setPersonalImage} setUrl={setPersonalImageUrl}>
                                    <div className={styles.personalImage}>
                                        {personalImageUrl?
                                            <img className={styles.image} src={personalImageUrl} alt="" />
                                        :
                                            <>
                                                <span className={styles.icon}>{FiUploadCloud({})}</span>
                                                <span className={`${styles.blue} normal medium-fs`}>click to upload profile picture</span>
                                            </>
                                        }
                                    </div>
                                </DropImage>
                                {/* <DopImage setAcceptedFile={setCoverlImage}>
                                    <div className={styles.coverImage}>
                                        <span className={styles.icon}>{FiUploadCloud({})}</span>
                                        <p className='small-fs light light-gray'><span className={`${styles.blue} normal medium-fs`}>Click to upload cover </span>or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </div>
                                </DropImage> */}
                            </div>
                            <div className={styles.name}>
                                <label htmlFor="FName" className={`${styles.FirstLabel} normal`}>First name <span className={styles.required}>*</span></label>
                                <input 
                                    type="text" 
                                    name='FName' 
                                    id='FName' 
                                    className={`${styles.FNameInput}  light`}
                                    placeholder='First name'
                                    value={formData.FName}
                                    onChange={(e)=>handleChange(e)}
                                />
                                <label htmlFor="LName" className={`${styles.LastLabel} normal`}>Last name</label>
                                <input 
                                    type="text" 
                                    name='LName' 
                                    id='LName' 
                                    className={`${styles.LNameInput}  light`}
                                    placeholder='Last Name'
                                    value={formData.LName}
                                    onChange={(e)=>handleChange(e)}
                                />
                            </div>
                            <label htmlFor="PhoneNum" className={`${styles.formLabel} normal`}>Phone Number</label>
                            <input 
                                type="text" 
                                name='PhoneNum' 
                                id='PhoneNum' 
                                className={`${styles.formInput} light`}
                                placeholder='+1 (555) 000-0000'
                                value={formData.PhoneNum}
                                onChange={(e)=>handleChange(e)}
                            />
                            <label htmlFor="Email" className={`${styles.formLabel} normal`}>Email<span className={styles.required}>*</span></label>
                            <input 
                                type="text" 
                                name='Email' 
                                id='Email' 
                                className={`${styles.formInput}  light`}
                                placeholder='example@email.com'
                                value={formData.Email}
                                onChange={(e)=>handleChange(e)}
                            />
                            <label htmlFor="Address" className={`${styles.formLabel} normal`}>Address</label>
                            <input 
                                type="text" 
                                name='Address' 
                                id='Address' 
                                className={`${styles.formInput}  light`}
                                placeholder='e.g . New Delhi, India'
                                value={formData.Address}
                                onChange={(e)=>handleChange(e)}
                            />
                            <div className={styles.btns}>
                                <button className={`${styles.nextBtn} P-BTN`} onClick={(e)=>handleNext(e)}>
                                    <span>
                                        Next 
                                    </span>
                                    <span className={`${styles.span} large-fs`}>
                                        {AiOutlineArrowRight({})}
                                    </span>
                                </button>
                            </div>
                        </form>
                        <form action="" className={`${styles.form} ${styles.secondForm} medium-fs normal-gray`}>
                            <label htmlFor="JobTitle" className={`${styles.formLabel} normal`}>Job Title</label>
                            <input 
                                type="text" 
                                name='JobTitle' 
                                id='JobTitle' 
                                className={`${styles.formInput}  light`}
                                placeholder='Job Title'
                                value={formData.JobTitle}
                                onChange={(e)=>handleChange(e)}
                            />
                            <label htmlFor="Company" className={`${styles.formLabel} normal`}>Company</label>
                            <input 
                                type="text" 
                                name='Company' 
                                id='Company' 
                                className={`${styles.formInput}  light`}
                                placeholder='Company'
                                value={formData.Company}
                                onChange={(e)=>handleChange(e)}
                            />
                            <label htmlFor="Industry" className={`${styles.formLabel} normal`}>Industry</label>
                            <input 
                                type="text" 
                                name='Industry' 
                                id='Industry' 
                                className={`${styles.formInput}  light`}
                                placeholder='Industry'
                                value={formData.Industry}
                                onChange={(e)=>handleChange(e)}
                            />
                            <div className={styles.addFile}>
                                <p className={`${styles.fileLabel} normal `}>Work history</p>
                                <button className={`${styles.addBtn} S-BTN `} onClick={(e)=> handleShowAddHistory(e,'work')}>Add Experience</button>
                            </div>
                            {showenAddHistory === 'work'?
                                <AddHistory historyFor={{asA:'job title',org:'company',currently:'I currently work here'}} setData={setFormData} name='workHistory' hide={setShowenAddHistory}/>
                            :
                                ''
                            }
                            {formData.workHistory.map((ele,i)=> {
                                const {FirstInput,secondInput,startDate,endDate,currently} = ele;
                                const IsVowel  = secondInput.toLocaleLowerCase().startsWith('a') || 
                                    secondInput.toLocaleLowerCase().startsWith('e') || 
                                    secondInput.toLocaleLowerCase().startsWith('i') || 
                                    secondInput.toLocaleLowerCase().startsWith('o') || 
                                    secondInput.toLocaleLowerCase().startsWith('u')
                                return (
                                <div className={styles.history} key={i}>
                                    {currently?
                                        <>
                                            <h2 className={`${styles.jobDesc} large-fs bold dark-gray`}> working at {FirstInput} as {IsVowel? 'an' : 'a'} {secondInput}</h2>
                                            <p className={`${styles.date} medium-fs light light-gray`}>since {startDate}</p>
                                            <span className={`${styles.delete} heading2-fs light light-gray`} onClick={()=>removeHistory('workHistory',i)}>{AiOutlineDelete({})}</span>
                                        </>
                                    :
                                        <>
                                            <h2 className={`${styles.jobDesc} large-fs bold dark-gray`}> worked at {FirstInput} as {IsVowel? 'an' : 'a'} {secondInput}</h2>
                                            <p className={`${styles.jobDesc} medium-fs light light-gray`}> from {startDate} to {endDate}</p>
                                            <span className={`${styles.delete} heading2-fs light light-gray`} onClick={()=>removeHistory('workHistory',i)}>{AiOutlineDelete({})}</span>
                                        </>
                                    }
                                </div>
                            )})
                            }
                            <div className={styles.addFile}>
                                <p className={`${styles.fileLabel} normal`}>Education history</p>
                                <button className={`${styles.addBtn} S-BTN `} onClick={(e)=> handleShowAddHistory(e,'student')}>Add Education</button>
                            </div>
                            {showenAddHistory === 'student'?
                                <AddHistory historyFor={{asA:'feild',org:'university',currently:'I am still a students'}} setData={setFormData} name='eduHistory' hide={setShowenAddHistory}/>
                            :
                                ''
                            }
                            {formData.eduHistory.map((ele,i)=> {
                                const {FirstInput,secondInput,startDate,endDate,currently} = ele;
                                return (
                                <div className={styles.history} key={i}>
                                    {currently?
                                        <>
                                            <h2 className={`${styles.jobDesc} large-fs bold dark-gray`}> studying {secondInput} at {FirstInput}</h2>
                                            <p className={`${styles.date} medium-fs light light-gray`}>since {startDate}</p>
                                            <span className={`${styles.delete} heading2-fs light light-gray`} onClick={()=>removeHistory('eduHistory',i)}>{AiOutlineDelete({})}</span>
                                        </>
                                    :
                                        <>
                                            <h2 className={`${styles.jobDesc} large-fs bold dark-gray`}> studied {secondInput} at  {FirstInput}</h2>
                                            <p className={`${styles.jobDesc} medium-fs light light-gray`}> from {startDate} to {endDate}</p>
                                            <span className={`${styles.delete} heading2-fs light light-gray`} onClick={()=>removeHistory('eduHistory',i)}>{AiOutlineDelete({})}</span>
                                        </>
                                    }
                                </div>
                            )})
                            }
                            <div className={styles.addFile}>
                                <p className={`${styles.fileLabel} normal`}>Certifications or licenses (if applicable)</p>
                                <button className={`${styles.addBtn} S-BTN `} onClick={(e)=> handleShowAddHistory(e,'certifications')} >Add Certificates</button>
                            </div>
                            {showenAddHistory === 'certifications'?
                                <AddHistory historyFor={{asA:'certification name',org:'provider name',currently:null}} setData={setFormData} name='certifications' hide={setShowenAddHistory}/>
                            :
                                ''
                            }
                            {formData.certifications.map((ele,i)=> {
                                const {FirstInput,secondInput,startDate,endDate} = ele;
                                return (
                                    <div className={styles.history} key={i}>
                                        <h2 className={`${styles.jobDesc} large-fs bold dark-gray`}> got {secondInput} that is provided by  {FirstInput}</h2>
                                        <p className={`${styles.jobDesc} medium-fs light light-gray`}> from {startDate} to {endDate}</p>
                                        <span className={`${styles.delete} heading2-fs light light-gray`} onClick={()=>removeHistory('certifications',i)}>{AiOutlineDelete({})}</span>
                                    </div>
                            )})
                            }
                            <div className={styles.addFile}>
                                <p className={`${styles.fileLabel} normal`}>Volunteer or community service experience</p>
                                <button className={`${styles.addBtn} S-BTN `} onClick={(e)=> handleShowAddHistory(e,'Volunteer')}>Add Experience</button>
                            </div>
                            {showenAddHistory === 'Volunteer'?
                                <AddHistory historyFor={{asA:'job title',org:'worked for',currently:'I currently work here'}} setData={setFormData} name='volunteer' hide={setShowenAddHistory}/>
                            :
                                ''
                            }
                            {formData.volunteer.map((ele,i)=> {
                                const {FirstInput,secondInput,startDate,endDate,currently} = ele;
                                const IsVowel  = secondInput.toLocaleLowerCase().startsWith('a') || 
                                    secondInput.toLocaleLowerCase().startsWith('e') || 
                                    secondInput.toLocaleLowerCase().startsWith('i') || 
                                    secondInput.toLocaleLowerCase().startsWith('o') || 
                                    secondInput.toLocaleLowerCase().startsWith('u')
                                return (
                                <div className={styles.history} key={i}>
                                    {currently?
                                        <>
                                            <h2 className={`${styles.jobDesc} large-fs bold dark-gray`}> working at {FirstInput} as {IsVowel? 'an' : 'a'} {secondInput} volunteer</h2>
                                            <p className={`${styles.date} medium-fs light light-gray`}>since {startDate}</p>
                                            <span className={`${styles.delete} heading2-fs light light-gray`} onClick={()=>removeHistory('volunteer',i)}>{AiOutlineDelete({})}</span>
                                        </>
                                    :
                                        <>
                                            <h2 className={`${styles.jobDesc} large-fs bold dark-gray`}> worked at {FirstInput} as {IsVowel? 'an' : 'a'} {secondInput} volunteer</h2>
                                            <p className={`${styles.jobDesc} medium-fs light light-gray`}> from {startDate} to {endDate}</p>
                                            <span className={`${styles.delete} heading2-fs light light-gray`} onClick={()=>removeHistory('volunteer',i)}>{AiOutlineDelete({})}</span>
                                        </>
                                    }
                                </div>
                            )})
                            }
                            <div className={styles.btns}>
                                <button onClick={(e)=>handleBack(e)} className={`${styles.backBtn} medium-fs normal light-gray`}>
                                    <span className={styles.span}>{AiOutlineArrowLeft({})}</span>
                                    <span>Back</span>
                                </button>
                                <button onClick={(e)=>handleNext(e)} className={`${styles.skipBtn} medium-fs normal light-gray`}>
                                    <span >Skip</span>
                                </button>
                                <button onClick={(e)=>handleNext(e)} className={`${styles.nextBtn} P-BTN`}>
                                    <span>Next</span>
                                    <span className={styles.span}>{AiOutlineArrowRight({})}</span>
                                </button>
                            </div>
                        </form>
                        <form action="" className={`${styles.form} ${styles.thirdForm} medium-fs normal-gray`}>
                        <label htmlFor="Website" className={`${styles.formLabel} normal`}>Website URL</label>
                            <input 
                                type="text" 
                                name='Website' 
                                id='Website' 
                                className={`${styles.formInput}  light`}
                                placeholder='www.example.com'
                                value={formData.Website}
                                onChange={(e)=>handleChange(e)}
                            />
                            <label htmlFor="LinkedIn" className={`${styles.formLabel} normal`}>LinkedIn</label>
                            <input 
                                type="text" 
                                name='LinkedIn' 
                                id='LinkedIn' 
                                className={`${styles.formInput}  light`}
                                placeholder='linkedin.com/company/'
                                value={formData.LinkedIn}
                                onChange={(e)=>handleChange(e)}
                            />
                            <label htmlFor="Instagram" className={`${styles.formLabel} normal`}>Instagram</label>
                            <input 
                                type="text" 
                                name='Instagram' 
                                id='Instagram' 
                                className={`${styles.formInput}  light`}
                                placeholder='instagram.com/'
                                value={formData.Instagram}
                                onChange={(e)=>handleChange(e)}
                            />
                            <label htmlFor="Facebook" className={`${styles.formLabel} normal`}>Facebook</label>
                            <input 
                                type="text" 
                                name='Facebook' 
                                id='Facebook' 
                                className={`${styles.formInput}  light`}
                                placeholder='facebook.com/'
                                value={formData.Facebook}
                                onChange={(e)=>handleChange(e)}
                            />
                            <label htmlFor="Twitter" className={`${styles.formLabel} normal`}>Twitter</label>
                            <input 
                                type="text" 
                                name='Twitter' 
                                id='Twitter' 
                                className={`${styles.formInput}  light`}
                                placeholder='twitter.com/'
                                value={formData.Twitter}
                                onChange={(e)=>handleChange(e)}
                            />
                            <div className={styles.btns}>
                                <button onClick={(e)=>handleBack(e)} className={`${styles.backBtn} medium-fs normal light-gray`}>
                                    <span className={styles.span}>{AiOutlineArrowLeft({})}</span>
                                    <span>Back</span>
                                </button>
                                <button onClick={(e)=>handleNext(e)} className={`${styles.skipBtn} medium-fs normal light-gray`}>
                                    <span >Skip</span>
                                </button>
                                <button onClick={(e)=>handleNext(e)} className={`${styles.nextBtn} P-BTN`}>
                                    <span>Next</span>
                                    <span className={styles.span}>{AiOutlineArrowRight({})}</span>
                                </button>
                            </div>
                        </form>
                        <form action="" className={`${styles.form} ${styles.fourthForm} medium-fs normal-gray`}>
                        <label htmlFor="Bio" className={`${styles.formLabel} normal`}>Bio or summary of skills/experience</label>
                            <textarea 
                                type="text" 
                                name='Bio' 
                                id='Bio' 
                                className={`${styles.formInput} ${styles.textarea}  light`}
                                placeholder=''
                                value={formData.Bio}
                                onChange={(e)=>handleChange(e)}
                            />
                            <div className={styles.addItems}>
                                <label htmlFor="Skill" className={`${styles.formLabel} normal`}>Skills or areas of expertise</label>
                                <input 
                                    type="text" 
                                    name='Skill' 
                                    id='Skill' 
                                    className={`${styles.formInput} light`}
                                    placeholder='add your skills'
                                    value={formData.Skill}
                                    onChange={(e)=>handleChange(e)}
                                />
                                <button className={`${styles.addSkill} S-BTN`} onClick={(e)=>handleAdd(e,'Skill')}>
                                    Add
                                </button>
                                <div className={`${styles.items} small-fs light dark-gray`}>
                                    {formData.Skills.map((skill,i)=>(<span className={styles.item} key={i} onClick={(e)=>handleRemove(e,'Skills',skill)}>
                                        {skill}
                                        {IoMdRemoveCircleOutline({})}
                                    </span>))
                                    }
                                </div>
                            </div>
                            <div className={styles.addItems}>
                                <label htmlFor="Award" className={`${styles.formLabel} normal`}>Awards or recognition (if applicable)</label>
                                <input 
                                    type="text" 
                                    name='Award' 
                                    id='Award' 
                                    className={`${styles.formInput}  light`}
                                    placeholder='add your awards'
                                    value={formData.Award}
                                    onChange={(e)=>handleChange(e)}
                                />
                                <button className={`${styles.addSkill} S-BTN`} onClick={(e)=>handleAdd(e,'Award')}>
                                    Add
                                </button>
                                <div className={`${styles.items} small-fs light dark-gray`}>
                                    {formData.Awards.map((Award,i)=>(<span className={styles.item} key={i} onClick={(e)=>handleRemove(e,'Awards',Award)}>
                                        {Award}
                                        {IoMdRemoveCircleOutline({})}
                                    </span>))
                                    }
                                </div>
                            </div>
                            <div className={styles.addItems}>
                                <label htmlFor="Interest" className={`${styles.formLabel} normal`}>Professional or personal interests</label>
                                <input 
                                    type="text" 
                                    name='Interest' 
                                    id='Interest' 
                                    className={`${styles.formInput}  light`}
                                    placeholder='add your interests'
                                    value={formData.Interest}
                                    onChange={(e)=>handleChange(e)}
                                />
                                <button className={`${styles.addSkill} S-BTN`} onClick={(e)=>handleAdd(e,'Interest')}>
                                    Add
                                </button>
                                <div className={`${styles.items} small-fs light dark-gray`}>
                                    {formData.Interests.map((Interest,i)=>(<span className={styles.item} key={i} onClick={(e)=>handleRemove(e,'Interests',Interest)}>
                                        {Interest}
                                        {IoMdRemoveCircleOutline({})}
                                    </span>))
                                    }
                                </div>
                            </div>
                            <div className={styles.checkbox}>
                                <input 
                                type='checkbox' 
                                name='agreement'
                                id='agreement'
                                className={styles.agreement}
                                onChange={(e)=>handleChange(e)}
                                value={formData.agreement}
                                />
                                <label htmlFor="agreement" className={`${styles.agreementLabel} normal small-fs`}>You agree to our friendly <a href="" className={`${styles.terms} small-fs`}>privacy policy.</a></label>
                            </div>
                            <div className={styles.btns}>
                                <button onClick={(e)=>handleBack(e)} className={`${styles.backBtn} medium-fs normal light-gray`}>
                                    <span className={styles.span}>{AiOutlineArrowLeft({})}</span>
                                    <span>Back</span>
                                </button>
                                <button onClick={(e)=>handleCreateProfile(e)} className={`${styles.nextBtn} P-BTN`}>
                                    <span>Let's go</span>
                                    <span className={styles.span}>{AiOutlineArrowRight({})}</span>
                                </button>
                            </div>
                        </form>
                    </article>
                </article>
            </section>
        </>
    )
}

export default ProfileCreation