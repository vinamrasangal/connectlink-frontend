import React, { useEffect, useState } from 'react';
import styles from '../../styles/ViewProfile.module.scss';
import { FiUserPlus, FiMessageCircle, FiArrowUpRight } from 'react-icons/fi';
import { MdOutlineExpandMore, MdOutlineOpenInNew } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
// import { auth, db, storage } from '@/config/firebaseConfig';
// import { doc, getDoc } from 'firebase/firestore';
// import { ref, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';
import Loading from '../../nestedComponents/Loading';
// import { onAuthStateChanged } from 'firebase/auth';

const ViewProfile = () => {
    const [data, setData] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const getProfile = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json();
            console.log(json)
            if (res.ok) {
                if (rememberMe) {
                    window.localStorage.setItem('user', JSON.stringify(json));
                }
                dispatch(alertActions.showAlert({ msg: 'logged in successfully', showen: true, type: 'success' }));
                dispatch(userActions.setUserData({ username: json.username, email: json.email, token: json.token }));
                setIsFetching(false);
            } else {
                dispatch(alertActions.showAlert({ msg: json.message, showen: true, type: 'error' }));
            }
        }
        // if(auth.currentUser){
        //     const docRef = doc(db,'userData', auth.currentUser.uid);
        //     getDoc(docRef)
        //     .then(res => {
        //         setData(res.data());
        //         const storageRef = ref(storage,`images/personalImage_${auth.currentUser.uid}`);
        //         getDownloadURL(storageRef)
        //         .then(url => {
        //             setImageUrl(url);
        //         })
        //         .catch(()=> setImageUrl(''))
        //         .finally(()=> setIsFetching(false))
        //     });
        // }else {
        //     setImageUrl('')
        //     setData({})
        //     setIsFetching(false)
        // }
        getProfile();
    }, [])

    if (isFetching) return <section className={styles.loadingContainer}><Loading /></section>
    return (
        <section className={styles.container}>
            <div className={styles.images} style={{ backgroundImage: 'url(/cover-image.jpg)' }}>
                <img className={styles.personalImage} src={imageUrl} alt="" />
            </div>
            <article className={styles.contact}>
                <h2 className={`${styles.name} heading2-fs bold dark-gray`}>{data.firstName} {data.lastName}</h2>
                <p className={`${styles.companyDesc} small-fs light light-gray`}>{data.companyName}</p>
                <ul className={styles.btns} role='list'>
                    <li><button className={`${styles.btn} P-BTN small-fs`}>Follow {FiUserPlus({})}</button></li>
                    <li><a href={`https://${data.websiteURL}`} target='_blank'><button className={`${styles.btn} S-BTN small-fs`}>Visit website {MdOutlineOpenInNew({})}</button></a></li>
                    <li><button className={`${styles.btn} S-BTN small-fs`}>Connect {AiOutlineUserAdd({})}</button></li>
                    <li><button className={`${styles.btn} S-BTN small-fs`}>Message {FiMessageCircle({})}</button></li>
                    <li><button className={`${styles.btn} S-BTN small-fs`}>More {MdOutlineExpandMore({})}</button></li>
                </ul>
                <ul className={styles.pages} role='list'>
                    <li className={`${styles.page} ${styles.active} normal light-gray small-fs`}>About</li>
                    <li className={`${styles.page} normal light-gray small-fs`}>Activity</li>
                    <li className={`${styles.page} normal light-gray small-fs`}>Products/Services</li>
                    <li className={`${styles.page} normal light-gray small-fs`}>Projects</li>
                    <li className={`${styles.page} normal light-gray small-fs`}>Testimonials</li>
                </ul>
            </article>
            <article className={styles.details}>
                <p className={`${styles.desc} medium-fs light dark-gray`}>
                    {data.bio}
                    <span className={`${styles.more} small-fs normal`}>Show more {MdOutlineExpandMore({})}</span>
                </p>
                <h2 className={`${styles.h2} x-large-fs semi-bold black`}> Featured work </h2>
                <div className={styles.featuredWork}>
                    <div className={styles.work}>
                        <img src="/work-image.png" alt="" className={styles.workImage} />
                        <span className={`${styles.workType} small-fs semi-bold`}>Design</span>
                        <h2 className={`${styles.workH2} large-fs semi-bold dark-gray`}>UX review presentations {FiArrowUpRight({})}</h2>
                        <p className={`${styles.workDesc} medium-fs light light-gray`}>
                            How do you create compelling presentations
                            that wow your colleagues and impress your managers?
                        </p>
                    </div>
                </div>
                <h2 className={`${styles.linksH2} x-large-fs semi-bold black`}>Links</h2>
                <div className={styles.links}>
                    {data.facebook !== '' ?
                        <div className={styles.link}>
                            <img src="/facebook.png" alt="" className={styles.linkIcon} />
                            <p className={`${styles.name} dark-gray normal medium-fs`}>Facebook</p>
                            <a href={data.facebook} target='_blank' className={`${styles.linkURL} light-gray light small-fs`}>{data.facebook}</a>
                        </div>
                        :
                        ''
                    }
                    {data.instagram !== '' ?
                        <div className={styles.link}>
                            <img src="/instagram.png" alt="" className={styles.linkIcon} />
                            <p className={`${styles.name} dark-gray normal medium-fs`}>Instagram</p>
                            <a href={data.instagram} target='_blank' className={`${styles.linkURL} light-gray light small-fs`}>{data.instagram}</a>
                        </div>
                        :
                        ''
                    }
                    {data.linkedIn !== '' ?
                        <div className={styles.link}>
                            <img src="/linkedIn.png" alt="" className={styles.linkIcon} />
                            <p className={`${styles.name} dark-gray normal medium-fs`}>LinkedIn</p>
                            <a href={data.linkedIn} target='_blank' className={`${styles.linkURL} light-gray light small-fs`}>{data.linkedIn}</a>
                        </div>
                        :
                        ''
                    }
                    {data.twitter !== '' ?
                        <div className={styles.link}>
                            <img src="/twitter.png" alt="" className={styles.linkIcon} />
                            <p className={`${styles.name} dark-gray normal medium-fs`}>Twitter</p>
                            <a href={data.linkedIn} target='_blank' className={`${styles.linkURL} light-gray light small-fs`}>{data.twitter}</a>
                        </div>
                        :
                        ''
                    }
                </div>
            </article>
        </section>
    )
}

export default ViewProfile