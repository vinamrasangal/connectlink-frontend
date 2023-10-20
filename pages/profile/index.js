import React, { useEffect, useState } from "react";
// import EditProfile from '@/components/EditProfile';
import { useDispatch, useSelector } from "react-redux";
import { currentPageAction } from "@/redux/CurrentPage";
import EditProfile from "@/components/EditProfile";
import ViewProfile from "./viewProfile";
import { getProfile } from "@/redux/ActionCreators/profileAction";
// import ViewProfile from './viewProfile';

const Profile = () => {
  const dispatch = useDispatch();

  if(typeof window !== "undefined" && localStorage.getItem("loginToken")) {
  return <><EditProfile /></>
  }
};
export default Profile;
