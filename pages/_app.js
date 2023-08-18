import '../styles/global.scss';
import { Provider, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import store from '@/redux/store';
import Alert from '@/components/Alert';
import { useEffect, useState } from 'react';
import Verification from '@/components/verification';
// import SideBar from '@/components/SideBar';
const SideBar = dynamic(() => import('@/components/SideBar'), { ssr: false });
import ProfileCreation from '@/components/ProfileCreation';
import Loading from '@/nestedComponents/Loading';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export default function App({ Component, pageProps }) {
  const [userStatus, setUserStatus] = useState({ isLoggedIn: false, isEmailVerified: false });
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [isFetching1, setIsFetching1] = useState(false);
  const [isFetching2, setIsFetching2] = useState(false);


  useEffect(() => {


  }, []);
  return (
    <GoogleOAuthProvider clientId='143187157687-me0h129maovoq0r7elmfmoa04v2hq8bl.apps.googleusercontent.com'>
      <Provider store={store}>

        {/* <Alert /> */}
        {isFetching1 || isFetching2 ?
          <section className='loading-holder'>
            <Loading />
          </section>
          :
          <>
            {userStatus.isLoggedIn ?
              <>
                {
                  // !userStatus.isEmailVerified?
                  //     <Verification />
                  //   :
                  <>
                    {isProfileCreated ?
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
