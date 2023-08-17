import '../styles/global.scss';
import { Provider, useSelector } from 'react-redux';
import { store } from '@/config/store';
import Alert from '@/components/Alert';
import { auth, db } from '@/config/firebaseConfig';
import { useEffect, useState } from 'react';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import Verification from '@/components/verification';
import SideBar from '@/components/SideBar';
import ProfileCreation from '@/components/ProfileCreation';
import { doc, onSnapshot } from 'firebase/firestore';
import Loading from '@/nestedComponents/Loading';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';


export default function App({ Component, pageProps }) {
  const [userStatus,setUserStatus] = useState({isLoggedIn:false,isEmailVerified:false});
  const [isFirstTime,setIsFirstTime] = useState(true);
  const [isProfileCreated,setIsProfileCreated] = useState(false);
  const [isFetching1,setIsFetching1] = useState(true);
  const [isFetching2,setIsFetching2] = useState(true);

  useEffect(()=>{
    const removeStateChanged = onAuthStateChanged(auth,(res)=>{
      setIsFirstTime(false);
      setIsFetching1(false);
      if (res) {
        if(isFirstTime && !res.emailVerified){
          signOut(auth)
        } else {
          setUserStatus({isLoggedIn:true,isEmailVerified:res.emailVerified})
        }
      }else {
        setUserStatus({isLoggedIn:false,isEmailVerified:false})
      }
    })
    return () => removeStateChanged();

},[isFirstTime])

useEffect(()=>{

  if(auth.currentUser){
    const docRef = doc(db,'userData',auth.currentUser.uid);
    let removeSnapShot = onSnapshot(docRef,(res)=>{
        setIsFetching2(false);
        if(res.exists() && res.data().profileCreated){
          setIsProfileCreated(true);
        }
      })
    return ()=> removeSnapShot();

    } else if(!isFetching1) {
      setTimeout(() => {
        setIsFetching2(false);
      }, 1000);
    }
},[auth.currentUser,isFetching1]);
  return (
    <GoogleOAuthProvider clientId='143187157687-me0h129maovoq0r7elmfmoa04v2hq8bl.apps.googleusercontent.com'>
      <Provider store={store}>
        
        <Alert />
        {isFetching1 || isFetching2 ?
        <section className='loading-holder'>
          <Loading />
        </section>
        :
          <>
            {userStatus.isLoggedIn ?
                <>
                  {!userStatus.isEmailVerified?
                      <Verification />
                    :
                    <>
                    {isProfileCreated?
                      <>
                        <SideBar />
                        <Component {...pageProps} />
                      </>
                    :
                      <ProfileCreation />
                    }
                    </>
                  }
                </>
              :

                <>
                  <SideBar />
                  <Component {...pageProps} />
                </>
              }
          </>
        }
      </Provider>
    </GoogleOAuthProvider>
    )
}
