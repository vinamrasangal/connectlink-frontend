import React, { useEffect, useState } from 'react';
import styles from '../styles/EditProfile.module.scss';
import DropImage from '../nestedComponents/DropImage';
import { FiUploadCloud,FiUser } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { BsToggleOn,BsToggleOff } from 'react-icons/bs';
import allCountries from '@/suggestions/allCountries';
import timeZones from '@/suggestions/timeZones';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../nestedComponents/Loading';
import { doc, getDoc,updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import { storage } from '@/config/firebaseConfig';
import { ref,getDownloadURL, uploadBytes } from 'firebase/storage';
import { alertActions } from '@/redux/AlertController';
import Link from 'next/link';



const EditProfile = () => {
    const dispatch = useDispatch();
    const [userInfo,setUserInfo] = useState({LName:'',FName:'',email:'',userImage:''})
    const [personalInfo,setPersonalInfo] = useState({Fname:'',Lname:'',email:''});
    const [image,setImage] = useState(null);
    const [imageUrl,setImageUrl] = useState(null);
    const personalImageRef = ref(storage,`images/personalImage_${auth.currentUser.uid}`);
    const [isFetching,setIsFetching] = useState(true);
    const [profile,setProfile] = useState({isAvailable:false,username:'',website:'',bio:'',country:'',timezone:''});

    function handleInfoChange(e){
        const { value, name} = e.target;
        setPersonalInfo(prev => ({...prev,[name]:value}));
    }

    function handleProfileChange(e){
        const { value, name} = e.target;
        if(name === 'bio'){
            if(value.length <= 300){
                setProfile(prev => ({...prev,[name]:value}));
            }
        }else {
            setProfile(prev => ({...prev,[name]:value}));
        }
    }

    function handleSaveInfo(e){
        e.preventDefault();
        if(personalInfo.Fname.length === 0){
            dispatch(alertActions.showAlert({msg:'First name cannot be empty',type:'warrning'}))
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(personalInfo.email)) {
            dispatch(alertActions.showAlert({msg:'please use a valid email address',showen:true,type:'warrning'}));
        } else {
            if(image.length > 0){
                uploadBytes(personalImageRef,image[0]);
            }
            const ref = doc(db,'userData',auth.currentUser.uid);
            updateDoc(ref,{firstName:personalInfo.Fname , lastName: personalInfo.Lname, email:personalInfo.email})
            .then(()=> {
                setUserInfo({FName:personalInfo.Fname,LName:personalInfo.Lname,email:personalInfo.email,userImage:imageUrl})
                dispatch(alertActions.showAlert({msg:'profile updated successfully',type:'success'}))
            })
            .catch((err)=> dispatch(alertActions.showAlert({msg:err.message,type:'error'})))
        }

    }

    function handleSaveProfile(e){
        e.preventDefault();
        const ref = doc(db,'userData',auth.currentUser.uid);
        const { isAvailable,username,website,bio,country,timezone } = profile;
            updateDoc(ref,{
                isAvailable,
                username,
                websiteURL:website,
                bio,
                country,
                timezone
            })
            .then(()=> dispatch(alertActions.showAlert({msg:'profile updated successfully',type:'success'})))
            .catch((err)=> dispatch(alertActions.showAlert({msg:err.message,type:'error'})))
    }

    useEffect(()=>{
        if(auth.currentUser.uid){
            const docRef = doc(db,'userData', auth.currentUser.uid);
            getDoc(docRef)
            .then(res => {
                setIsFetching(false);
                const {firstName,lastName,email,websiteURL,bio,username,isAvailable,country,timezone} = res.data();
                setPersonalInfo({Fname:firstName,Lname:lastName,email});
                setProfile({
                    isAvailable: isAvailable || false,
                    username: username || '',
                    website:websiteURL,
                    bio,
                    country:country || '',
                    timezone:timezone || ''
                })
                return res;
            }).then(res => {
                const {firstName,lastName,email} = res.data();
                const storageRef = ref(storage,`images/personalImage_${auth.currentUser.uid}`);
                getDownloadURL(storageRef)
                .then(url => {
                    setImageUrl(url)
                    setUserInfo({FName : firstName ,LName: lastName ,email:email,userImage:url})
                })
                .catch(()=>{
                    setImageUrl('')
                    setUserInfo({FName : firstName ,LName: lastName ,email:email,userImage:''})
                })
            })
        }
    },[])

    if(isFetching) return <section className={styles.loadingContainer}><Loading /></section>
    return (
        <section className={`${styles.container} container`}>
            <div className={styles.BgImage} style={{backgroundImage: 'url(/cover-image.jpg)'}}>
                {userInfo.userImage !== '' ?
                    <img className={styles.personalImage} src={userInfo.userImage} alt="" />
                :
                    <span className={`${styles.loggedOutIcon} heading-fs dark-gray`}>
                        {FiUser({})}
                    </span>
                }
                <h2 className={`${styles.name} dark-gray normal x-large-fs`}>{userInfo.FName} {userInfo.LName}</h2>
                <p className={`${styles.email} small-fs light light-gray`}>{userInfo.email}</p>
                <button className={`${styles.shareBtn} S-BTN`}>Share</button>
                <Link href='/profile/viewProfile' target='_blank'>
                    <button className={`${styles.viewBtn} P-BTN`}>View profile</button>
                </Link>
            </div>
            <article className={styles.editInfo}>
                <p className='normal normal-gray medium-fs'>Personal info</p>
                <p className='light small-fs light-gray'>Update your photo and personal details.</p>
                <form action="" className={styles.form}>
                    <label htmlFor="Fname" className={`${styles.FnameLabel} small-fs normal normal-gray`}>First name</label>
                    <input 
                        type="text" 
                        id='Fname'
                        name='Fname'
                        value={personalInfo.Fname}
                        onChange={(e)=>handleInfoChange(e)}
                        className={`${styles.FnameInput} medium-fs light dark-gray`}
                    />
                    <label htmlFor="Lname" className={`${styles.LnameLabel} small-fs normal normal-gray`}>Last name</label>
                    <input 
                        type="text" 
                        id='Lname'
                        name='Lname'
                        value={personalInfo.Lname}
                        onChange={(e)=>handleInfoChange(e)}
                        className={`${styles.LnameInput} medium-fs light dark-gray`}
                    />
                    <span className={`${styles.emailIcon} light-gray x-large-fs`}>{HiOutlineMail({})}</span>
                    <label htmlFor="email" className={`${styles.emailLabel} small-fs normal normal-gray`}>Email</label>
                    <input 
                        type="text" 
                        id='email'
                        name='email'
                        value={personalInfo.email}
                        onChange={(e)=>handleInfoChange(e)}
                        className={`${styles.email} medium-fs light dark-gray`}
                    />
                    {imageUrl !== '' ?
                        <img className={styles.personalImage} src={imageUrl} alt="" />
                    :
                        <span className={`${styles.loggedOutIcon} heading2-fs dark-gray`}>
                            {FiUser({})}
                        </span>
                    }
                    <DropImage setAcceptedFile={setImage} setUrl={setImageUrl}>
                        <div className={styles.selectImage}>
                            <span className={styles.icon}>{FiUploadCloud({})}</span>
                            <p className='small-fs light light-gray'><span className={`${styles.blue} normal medium-fs`}>Click to upload </span>or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>
                    </DropImage>
                    <div className={styles.line}></div>
                    <button className={`${styles.cancelBtn} S-BTN`}>cancel</button>
                    <button className={`${styles.saveBtn} P-BTN`} onClick={(e)=>handleSaveInfo(e)}>save changes</button>
                </form>
            </article>
            <div className={styles.articlesLine}></div>
            <article className={styles.editProfile}>
                <p className='normal normal-gray medium-fs'>Profile</p>
                <p className='light small-fs light-gray'>Update your portfolio and bio.</p>
                <form action="" className={styles.form}>
                    <span 
                        className={`heading2-fs ${styles.availableBtn}`}
                        onClick={()=> setProfile(prev=>({...prev,isAvailable:!prev.isAvailable}))}
                        >
                        {profile.isAvailable ?
                            BsToggleOn({})
                        :
                            BsToggleOff({})
                        }
                    </span>
                    <p className={`${styles.availableTxt} normal normal-gray medium-fs`}>{profile.isAvailable? '' :'Not'} Available for projects</p>
                    <p className={`${styles.availableState} light small-fs light-gray`}>I’m {profile.isAvailable? 'open and available' :'Not available'} for freelance work.</p>
                    <p className={`${styles.usernameUrl} light medium-fs light-gray`}>myconnectlink.com/</p>
                    <label htmlFor="username" className={`${styles.usernameLable} small-fs normal normal-gray`}>Username</label>
                    <input 
                        type="text" 
                        id='username'
                        name='username'
                        value={profile.username}
                        onChange={(e)=>handleProfileChange(e)}
                        className={`${styles.username} medium-fs light dark-gray`}
                    />
                    <p className={`${styles.websiteHttp} light medium-fs light-gray`}>http://</p>
                    <label htmlFor="website" className={`${styles.websiteLabel} small-fs normal normal-gray`}>Website</label>
                    <input 
                        type="text" 
                        id='website'
                        name='website'
                        value={profile.website}
                        onChange={(e)=>handleProfileChange(e)}
                        className={`${styles.website} medium-fs light dark-gray`}
                    />
                    <label htmlFor="bio" className={`${styles.bioLabel} small-fs normal normal-gray`}>Bio</label>
                    <textarea 
                        type="text" 
                        id='bio'
                        name='bio'
                        value={profile.bio}
                        onChange={(e)=>handleProfileChange(e)}
                        className={`${styles.bio} medium-fs light dark-gray`}
                    />
                    <p className={`${styles.leftChar} light small-fs light-gray`}>{300 - profile.bio.length} characters left</p>
                    <label htmlFor="country" className={`${styles.countryLabel} small-fs normal normal-gray`}>Country</label>
                    <select
                        name="country" 
                        id="country" 
                        className={`${styles.country} medium-fs light dark-gray`}
                        onChange={(e)=>handleProfileChange(e)}
                        value={profile.country}
                        >
                        <option value="">choose your country </option>
                        {allCountries.map((e,i)=> <option key={i} value={e.name} className={styles.option}>{e.code} - {e.name} </option>)}
                    </select>
                    <label htmlFor="timezone" className={`${styles.timezoneLabel} small-fs normal normal-gray`}>Timezone</label>
                    <select 
                        name="timezone" 
                        id="timezone" 
                        className={`${styles.timezone} medium-fs light dark-gray`}
                        onChange={(e)=>handleProfileChange(e)}
                        value={profile.timezone}
                        >
                        <option value=""> choose your timezone </option>
                        {timeZones.map((e,i)=> <option key={i} value={e.offset}>{e.offset} - {e.name} </option>)}
                    </select>
                    <div className={styles.line}></div>
                    <button className={`${styles.cancelBtn} S-BTN`}>cancel</button>
                    <button className={`${styles.saveBtn} P-BTN`} onClick={(e)=>handleSaveProfile(e)}>save changes</button>
                </form>
            </article>
        </section>
    )
}

export default EditProfile