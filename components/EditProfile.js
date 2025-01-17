import React, { useEffect, useState } from "react";
import styles from "../styles/EditProfile.module.scss";
import DropImage from "../nestedComponents/DropImage";
import { FiUploadCloud, FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import allCountries from "@/suggestions/allCountries";
import timeZones from "@/suggestions/timeZones";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../nestedComponents/Loading";
import Link from "next/link";
import { editProfile, getProfile } from "@/redux/ActionCreators/profileAction";
import { useRouter } from "next/router";


const EditProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [profile, setProfile] = useState({
    Fname: "",
    Lname: "",
    isAvailable: false,
    username: "",
    bio: "",
    country: "",
    timezone: "",
    email: "",
    profilePicture: "",
    coverPicture: "",
    portfolioUrl: "",
    linkedinUrl: "",
    industry: "",
  });

  function handleInfoChange(e) {
    const { value, name } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  const handleViewProfile = (userId,e) =>{
    e.preventDefault();
    router.push(`/profile/viewProfile?id=${userId}`);

  }

  const handleSaveInfo = async(e) => {
    e.preventDefault();
    const obj = {
      firstName: profile.Fname,
      lastName: profile.Lname,
      bio: profile.bio,
      // industry:profile.industry,
      // linkedinUrl:profile.linkedinUrl,
      portfolioUrl: profile.portfolioUrl,
      // email:profile.email,
      // country:profile.country,
      // timezone:profile.timezone,
    };
    console.log(obj);
    await dispatch(editProfile(obj));
    await dispatch(getProfile());
    
  }

  const data = useSelector((state) => state.users.profile);

  // const error = useSelector((state)=>state.error);
  // console.log(error);

  useEffect(() => {
    if(isFetching){
      dispatch(getProfile());
    }
    
    const {
      UserName,
      email,
      profilePicture,
      coverPicture,
      firstName,
      lastName,
      linkedinUrl,
      bio,
      portfolioUrl,
      industry,
      country,
      timezone,
    } = data;
    setProfile((prev) => ({
      ...prev,
      username:UserName,
      email: email,
      profilePicture: profilePicture,
      coverPicture: coverPicture,
      Fname: firstName,
      Lname: lastName,
      bio: bio,
      portfolioUrl: portfolioUrl,
      country: country,
      timezone: timezone,
    }));
    setIsFetching(false);
  }, [dispatch,data, isFetching]);

  if (isFetching)
    return (
      <section className={styles.loadingContainer}>
        <Loading />
      </section>
    );
  return (
    <section className={`${styles.container} container`}>
      <div
        className={styles.BgImage}
        style={{ backgroundImage: "url(/cover-image.jpg)" }}
      >
        {profile?.profilePicture !== "" ? (
          <img
            className={styles.personalImage}
            src={profile.profilePicture}
            alt=""
          />
        ) : (
          <span className={`${styles.loggedOutIcon} heading-fs dark-gray`}>
            {FiUser({})}
          </span>
        )}
        <h2 className={`${styles.name} dark-gray normal x-large-fs`}>
          {profile?.Fname} {profile?.Lname}
        </h2>
        <p className={`${styles.email} small-fs light light-gray`}>
          {profile?.email}
        </p>
        <button className={`${styles.shareBtn} S-BTN`}>Share</button>
        <Link href="/profile/viewProfile">
          <button className={`${styles.viewBtn} P-BTN`} onClick={(e)=>handleViewProfile(data._id,e)}>View profile</button>
        </Link>
        {/* <Link href='/profile/viewProfile' target='_blank'>
                    <button className={`${styles.viewBtn} P-BTN`}>View profile</button>
                </Link> */}
      </div>
      <article className={styles.editInfo}>
        <p className="normal normal-gray medium-fs">Personal info</p>
        <p className="light small-fs light-gray">
          Update your photo and personal details.
        </p>
        <form action="" className={styles.form}>
          <label
            htmlFor="Fname"
            className={`${styles.FnameLabel} small-fs normal normal-gray`}
          >
            First Name
          </label>
          <input
            type="text"
            id="Fname"
            name="Fname"
            value={profile?.Fname}
            onChange={(e) => handleInfoChange(e)}
            className={`${styles.FnameInput} medium-fs light dark-gray`}
          />
          <label
            htmlFor="Lname"
            className={`${styles.LnameLabel} small-fs normal normal-gray`}
          >
            Last name
          </label>
          <input
            type="text"
            id="Lname"
            name="Lname"
            value={profile?.Lname}
            onChange={(e) => handleInfoChange(e)}
            className={`${styles.LnameInput} medium-fs light dark-gray`}
          />
          <span className={`${styles.emailIcon} light-gray x-large-fs`}>
            {HiOutlineMail({})}
          </span>
          <label
            htmlFor="email"
            className={`${styles.emailLabel} small-fs normal normal-gray`}
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={profile?.email}
            onChange={(e) => handleInfoChange(e)}
            className={`${styles.email} medium-fs light dark-gray`}
          />
          {profile?.profilePicture !== "" ? (
            <img
              className={styles.personalImage}
              src={profile.profilePicture}
              alt=""
            />
          ) : (
            <span className={`${styles.loggedOutIcon} heading2-fs dark-gray`}>
              {FiUser({})}
            </span>
          )}
          <DropImage setAcceptedFile={setImage} setUrl={setImageUrl}>
            <div className={styles.selectImage}>
              <span className={styles.icon}>{FiUploadCloud({})}</span>
              <p className="small-fs light light-gray">
                <span className={`${styles.blue} normal medium-fs`}>
                  Click to upload{" "}
                </span>
                or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </DropImage>
          <div className={styles.line}></div>
          <button className={`${styles.cancelBtn} S-BTN`}>cancel</button>
          <button
            onClick={handleSaveInfo}
            className={`${styles.saveBtn} P-BTN`}
          >
            save changes
          </button>
        </form>
      </article>
      <div className={styles.articlesLine}></div>
      <article className={styles.editProfile}>
        <p className="normal normal-gray medium-fs">Profile</p>
        <p className="light small-fs light-gray">
          Update your portfolio and bio.
        </p>
        <form action="" className={styles.form}>
          <span
            className={`heading2-fs ${styles.availableBtn}`}
            onClick={() =>
              setProfile((prev) => ({
                ...prev,
                isAvailable: !prev.isAvailable,
              }))
            }
          >
            {profile?.isAvailable ? BsToggleOn({}) : BsToggleOff({})}
          </span>
          <p className={`${styles.availableTxt} normal normal-gray medium-fs`}>
            {profile?.isAvailable ? "" : "Not"} Available for projects
          </p>
          <p className={`${styles.availableState} light small-fs light-gray`}>
            I’m {profile?.isAvailable ? "open and available" : "Not available"}{" "}
            for freelance work.
          </p>
          <p className={`${styles.usernameUrl} light medium-fs light-gray`}>
            myconnectlink.com/
          </p>
          <label
            htmlFor="username"
            className={`${styles.usernameLable} small-fs normal normal-gray`}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile?.username}
            onChange={(e) => handleInfoChange(e)}
            className={`${styles.username} medium-fs light dark-gray`}
          />
          <p className={`${styles.websiteHttp} light medium-fs light-gray`}>
            https://
          </p>
          <label
            htmlFor="website"
            className={`${styles.websiteLabel} small-fs normal normal-gray`}
          >
            Website
          </label>
          <input
            type="text"
            id="portfolioUrl"
            name="portfolioUrl"
            value={profile?.portfolioUrl}
            onChange={(e) => handleInfoChange(e)}
            className={`${styles.website} medium-fs light dark-gray`}
          />
          <label
            htmlFor="bio"
            className={`${styles.bioLabel} small-fs normal normal-gray`}
          >
            Bio
          </label>
          <textarea
            type="text"
            id="bio"
            name="bio"
            value={profile?.bio}
            onChange={(e) => handleInfoChange(e)}
            className={`${styles.bio} medium-fs light dark-gray`}
          />
          <p className={`${styles.leftChar} light small-fs light-gray`}>
            {300 - profile.bio?.length} characters left
          </p>
          <label
            htmlFor="country"
            className={`${styles.countryLabel} small-fs normal normal-gray`}
          >
            Country
          </label>
          <select
            name="country"
            id="country"
            className={`${styles.country} medium-fs light dark-gray`}
            onChange={(e) => handleInfoChange(e)}
            value={profile?.country}
          >
            <option value="">choose your country </option>
            {allCountries.map((e, i) => (
              <option key={i} value={e.name} className={styles.option}>
                {e.code} - {e.name}{" "}
              </option>
            ))}
          </select>
          <label
            htmlFor="timezone"
            className={`${styles.timezoneLabel} small-fs normal normal-gray`}
          >
            Timezone
          </label>
          <select
            name="timezone"
            id="timezone"
            className={`${styles.timezone} medium-fs light dark-gray`}
            onChange={(e) => handleInfoChange(e)}
            value={profile?.timezone}
          >
            <option value=""> choose your timezone </option>
            {timeZones.map((e, i) => (
              <option key={i} value={e.offset}>
                {e.offset} - {e.name}{" "}
              </option>
            ))}
          </select>
          <div className={styles.line}></div>
          <button className={`${styles.cancelBtn} S-BTN`}>cancel</button>
          <button
            onClick={(e) => handleSaveInfo(e)}
            className={`${styles.saveBtn} P-BTN`}
          >
            save changes
          </button>
        </form>
      </article>
    </section>
  );
};

export default EditProfile;
