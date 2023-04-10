import React, { useState } from 'react';
import ViewProfile from '@/components/ViewProfile';
import EditProfile from '@/components/EditProfile';


const Profile = () => {
    const [showenPage,setShowenPage] = useState('editProfile');
    return (
        <>
        {showenPage === 'viewProfile' ?
            <ViewProfile />
        :
            <EditProfile setShowenPage={setShowenPage} />
        }
        </>
    )
}

export default Profile