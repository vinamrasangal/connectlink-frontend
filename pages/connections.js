import React, { useEffect } from "react";
import styles from "../styles/Connections.module.scss";
import { CiSearch } from "react-icons/ci";
import { BiFilter } from "react-icons/bi";
import {
  FiUserCheck,
  FiPlus,
  FiChevronDown,
  FiUser,
  FiSearch,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  recommendUsers,
} from "@/redux/ActionCreators/profileAction";
import { useRouter } from "next/router";

const connections = () => {
  const dispatch = useDispatch();
  const recommendUsersArray = useSelector(
    (state) => state.users.recommendUsers
  );
  const currentUser = useSelector((state) => state.users.profile);
  console.log(currentUser);
  const router = useRouter();
  const imageUrl = "";

  const handleUserClick = (userId) => {
    router.push(`/profile/viewProfile?id=${userId}`);
  };

  const newArray = recommendUsersArray.filter(
    (user) => user._id !== currentUser._id
  );

  console.log(newArray);
  console.log(recommendUsersArray);

  useEffect(() => {
    dispatch(recommendUsers());
    dispatch(getProfile());
  }, [dispatch]);

  // useEffect(()=>{
  //     dispatch(currentPageAction.setPage({page:'connections'}))
  // },[])
  // if(!auth.currentUser) return <></>
  return (
    <div className={`${styles.mainDiv}`}>
      <div className={`${styles.left}`}>
        <div className={`${styles.h2}`}>
          <h2 className="x-large-fs semi-bold dark-gray">My Connections</h2>
        </div>
        <div className={`${styles.filterSort}`}>
          <span className={`${styles.innerDiv}`}>Add filter {FiPlus({})} </span>
          <span className={`${styles.innerDiv}`}>
            Sort {FiChevronDown({})}{" "}
          </span>
        </div>
        <div className={`${styles.users}`}>
          {newArray.map((user)=>{
            return(
              <article className={`${styles.userCard}`}>
            <div className={`${styles.imageDiv}`}>
              {user?.profilePicture !== "" ? (
                <img className={styles.image} src={user.profilePicture} alt="" />
              ) : (
                <span
                  className={`${styles.loggedOutIcon} x-large-fs dark-gray`}
                >
                  {FiUser({})}
                </span>
              )}
            </div>
            <div className={`${styles.bio}`} onClick={()=>handleUserClick(user?._id)}>
              <span
                className={`${styles.userName} large-fs dark-gray semi-bold`}
              >
                {user.firstName} {user.lastName}
              </span>
              <span className={`${styles.bioText} large-fs`}>
                {user.bio}
              </span>
            </div>
            <div className={`${styles.messageButton}`}>
              <button className={`${styles.button}`}>Message</button>
            </div>
          </article>
            )
          })}
          
          
        </div>
      </div>

      <div className={`${styles.right}`}>
        <div className={`${styles.search}`}>
          {FiSearch({})}
          <input
            className={`${styles.searchInput}`}
            placeholder="Search Connections"
          />
        </div>
        <div className={`${styles.currentUser}`}>
          <div className={`${styles.about}`}>
            {currentUser.profilePicture !== "" ? (
              <img className={styles.image} src={currentUser.profilePicture} alt="" />
            ) : (
              <span className={`${styles.loggedOutIcon} x-large-fs dark-gray`}>
                {FiUser({})}
              </span>
            )}
            <div className={`${styles.bio}`}>
            <span
                className={`${styles.userName} large-fs dark-gray semi-bold`}
              >
                {currentUser.firstName} {currentUser.lastName}
              </span>
              <span>Job title</span>
              <p className={`${styles.bioText} large-fs`}>{currentUser.bio}</p>
            </div>
          </div>
          <div className={`${styles.line}`}></div>
            <div className={`${styles.linksdiv}`}  onClick={()=>handleUserClick(currentUser?._id)}>
              View my Profile
            </div>
            <div className={`${styles.line}`}></div>
            <div className={`${styles.linksdiv}`}>
              Connection requests
            </div>
            <div className={`${styles.line}`}></div>
            <div className={`${styles.linksdiv}`}>
              Upgrade to Connectlink pro
            </div>
            <div className={`${styles.line}`}></div>
            <div className={`${styles.linksdiv}`}>
              Some pro features
            </div>
 
        </div>
      </div>
    </div>
  );
};

export default connections;
