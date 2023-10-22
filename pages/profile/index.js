import React, { useEffect, useState } from "react";
// import EditProfile from '@/components/EditProfile';
import { useDispatch, useSelector } from "react-redux";
import { currentPageAction } from "@/redux/CurrentPage";
import EditProfile from "@/components/EditProfile";
import ViewProfile from "./viewProfile";
import { getProfile } from "@/redux/ActionCreators/profileAction";
// import ViewProfile from './viewProfile';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <EditProfile />
    </>
  );
};
export default Profile;
