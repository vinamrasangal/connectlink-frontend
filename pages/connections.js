import React, { useEffect } from "react";
import styles from "../styles/Connections.module.scss";
import { CiSearch } from "react-icons/ci";
import { BiFilter } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, recommendUsers } from "@/redux/ActionCreators/profileAction";
import { useRouter } from "next/router";

const connections = () => {
  const dispatch = useDispatch();
  const recommendUsersArray = useSelector(
    (state) => state.users.recommendUsers
  );
  const currentUser = useSelector((state)=>state.users.profile);
  console.log(currentUser);
  const router = useRouter();

  const handleUserClick= (userId) =>{
    router.push(`/profile/viewProfile?id=${userId}`)
  }


  const newArray = recommendUsersArray.filter((user) => user._id !== currentUser._id);

  console.log(newArray);
  console.log(recommendUsersArray);

  useEffect(() => {
    dispatch(recommendUsers());
    dispatch(getProfile());
  }, []);

  // useEffect(()=>{
  //     dispatch(currentPageAction.setPage({page:'connections'}))
  // },[])
  // if(!auth.currentUser) return <></>
  return (
    <section className={`container ${styles.container}`}>
      <h2 className={`${styles.h2} x-large-fs semi-bold dark-gray`}>
        Connections
      </h2>
      <nav className={styles.nav}>
        <div className={styles.search}>
          <span className={`${styles.icon} normal-gray x-large-fs`}>
            {CiSearch({})}
          </span>
          <input
            type="text"
            placeholder="Search"
            className={`${styles.input} normal-gray medium-fs normal`}
          />
        </div>
        <button className={`${styles.filter} S-BTN`}>
          <span className={`${styles.icon} dark-gray x-large-fs`}>
            {BiFilter({})}
          </span>
          <p className={`${styles.p}`}>Filters</p>
        </button>
        <button className={`${styles.Requests} S-BTN`}>
          <p className={`${styles.p}`}>Requests</p>
          <span className={`${styles.icon} dark-gray large-fs`}>
            {FiUserCheck({})}
          </span>
        </button>
      </nav>
      {newArray.map((user) => {
        return (
          <article key={user.id} className={styles.users}>
            <div className={styles.usersHolder}>
              <div className={styles.user} onClick={()=>handleUserClick(user?._id)}>
                <img
                  className={styles.image}
                  src="/personal-image.png"
                  alt=""
                />
                <h2 className={`${styles.name} dark-gray semi-bold large-fs`}>
                  {user?.firstName} {user?.lastName}{" "}
                </h2>
                <span className={`${styles.position} medium-fs normal`}>
                  Founder & CEO
                </span>
                <p className={`${styles.desc} light-gray medium-fs light`}>
                  {user?.bio}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default connections;
