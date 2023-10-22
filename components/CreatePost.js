import React, { useEffect, useState } from "react";
import styles from "../styles/createPost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  closePost,
  addQuestion,
  addDiscussion,
  addIdea,
  getPosts,
} from "../redux/ActionCreators/postAction";
import DropImage from "../nestedComponents/DropImage";
import { FiUpload } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { Input } from "@mui/material";

const CreatePost = () => {
  const post = useSelector((state) => state.post);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [current, setCurrent] = useState(1);
  const [discussErrors, setDiscussErrors] = useState({
    title: "",
    desc: "",
    tags: "",
  });
  const [questionErrors, setQuestionErrors] = useState({
    question: "",
    desc: "",
    tags: "",
  });
  const [ideaErrors, setIdeaErrors] = useState({
    title:"",
    desc:"",
    industry: "",
    tags: "",
    links: "",
    image: "",

  });
  const dispatch = useDispatch();

  const [ideaFormData, setIdeaFormData] = useState({
    title: "",
    desc: "",
    industry: "software",
    tags: "",
    links: "",
    discussion: false,
    requirement: false,
    roles: [{ role: "", YOE: "" }],
    image: "",
  });
  const [questionFormData, setQuestionFormData] = useState({
    question: "",
    desc: "",
    tags: "",
  });
  const [discussionFormData, setDiscussionFormData] = useState({
    title: "",
    desc: "",
    tags: "",
  });
  const [postInput, setPostInput] = useState("");

  const onTabChange = (type) => {
    setCurrent(type);
    if (type !== "discuss") {
      setDiscussErrors({ title: "", desc: "", tags: "" });
    } 
    if (type !== "question") {
      setQuestionErrors({ question: "", desc: "", tags: "" });
    }
    if(type!=="post"){
      setIdeaErrors({title:"",
      desc:"",
      industry: "",
      tags: "",
      links: "",
      image: "",})
    }
  };
  function handleAddRoles() {
    setIdeaFormData((prev) => ({
      ...prev,
      roles: [...prev.roles, { role: "", YOE: "" }],
    }));
  }

  function ideaFormChange(e, i) {
    const { name, value } = e.target;
    const newErrors = { ...ideaErrors };
    if (name === "discussion" || name === "requirement") {
      setIdeaFormData((prev) => {
        let newObj = { ...prev, [name]: !prev[name] };
        if (!newObj.requirement) {
          newObj.roles = [{ role: "", YOE: "" }];
        }
        return newObj;
      });
    } else if (name === "YOE" || name === "role") {
      setIdeaFormData((prev) => {
        let newarr = [...prev.roles];
        if (name === "YOE") {
          newarr[i] = { [name]: value, role: newarr[i].role };
        } else {
          newarr[i] = { [name]: value, YOE: newarr[i].YOE };
        }
        return {
          ...prev,
          roles: newarr,
        };
      });
    }
    if (name === "title" && value === "") {
      newErrors.title = "Title is required";
    } else {
      newErrors.title = "";
    }
    if (name === "desc" && value === "") {
      newErrors.desc = "Description is required";
    } else {
      newErrors.desc = "";
    }
    if (name === "tags" && value === "") {
      newErrors.tags = "Tags is required";
    } else {
      newErrors.tags = "";
    }
    if (name === "links" && value === "") {
      newErrors.links = "links is required";
    } else {
      newErrors.links = "";
    }
    if (name === "industry" && value === "") {
      newErrors.industry = "industry is required";
    } else {
      newErrors.industry = "";
    }
    if (name === "image" && value === "") {
      newErrors.image = "image is required";
    } else {
      newErrors.image = "";
    }
    setIdeaFormData((prev) => ({ ...prev, [name]: value }));

  }

  function questionFormChange(e) {
    const { name, value } = e.target;
    const newErrors = { ...questionErrors };
    if (name === "question" && value === "") {
      newErrors.question = "Question is required";
    } else {
      newErrors.question = "";
    }
    if (name === "desc" && value === "") {
      newErrors.desc = "Description is required";
    } else {
      newErrors.desc = "";
    }
    if (name === "tags" && value === "") {
      newErrors.tags = "Tags is required";
    } else {
      newErrors.tags = "";
    }
    setQuestionErrors(newErrors);
    setQuestionFormData((prev) => ({ ...prev, [name]: value }));
  }
  function discussionFormChange(e) {
    const { name, value } = e.target;
    const newErrors = { ...discussErrors };
    if (name === "title" && value === "") {
      newErrors.title = "Title is required";
    } else {
      newErrors.title = "";
    }
    if (name === "desc" && value === "") {
      newErrors.desc = "Description is required";
    } else {
      newErrors.desc = "";
    }
    if (name === "tags" && value === "") {
      newErrors.tags = "Tags is required";
    } else {
      newErrors.tags = "";
    }
    setDiscussErrors(newErrors);
    setDiscussionFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(closePost());
    setCurrent(1);
    setQuestionFormData({
      question: "",
      desc: "",
      tags: "",
    });
    setDiscussionFormData({
      title: "",
      desc: "",
      tags: "",
    });
    setIdeaFormData({
      title: "",
      desc: "",
      industry: "software",
      tags: "",
      links: "",
      discussion: false,
      requirement: false,
      roles: [{ role: "", YOE: "" }],
    });
  };

  const submitPost = async (e, type) => {
    console.log(e);
    e.preventDefault();
    if (type === "post") {
      const errors = {};
      if (!ideaFormData.title) {
        errors.title = "Title is required";
        setIdeaErrors(errors);
      } else if (!ideaFormData.desc) {
        errors.desc = "Description is required";
        setIdeaErrors(errors);
      } else if (!ideaFormData.tags) {
        errors.tags = "Tags is required";
        setIdeaErrors(errors);
      }else if (!ideaFormData.links){
        errors.links = "Links is required";
        setIdeaErrors(errors);
      }else if(!ideaFormData.industry){
        errors.industry = "Industry is required";
        setIdeaErrors(errors);
      }else if(!ideaFormData.image){
        errors.image = "image is required";
        setIdeaErrors(errors);
      }
      else {
        setIdeaErrors({ title: "", desc: "", tags: "" });
        const { title, desc, industry, tags, links } = ideaFormData;
        let data = new FormData();
        data.append("title", title);
        data.append("desc", desc);
        data.append("tags", tags);
        data.append("image", image);
        data.append("industry", industry);
        data.append("links", links);
  
        await dispatch(addIdea(data));
        await handleCancel(e);
        
      }
     
    } else if (type === "question") {
      const errors = {};
      if (!questionFormData.question) {
        errors.question = "Question is required";
        setQuestionErrors(errors);
      } else if (!questionFormData.desc) {
        console.log("hhh");
        errors.desc = "Description is required";
        setQuestionErrors(errors);
      } else if (!questionFormData.tags) {
        errors.tags = "Tags is required";
        setQuestionErrors(errors);
      } else {
        setQuestionErrors({ question: "", desc: "", tags: "" });
        await dispatch(addQuestion(questionFormData));
        await handleCancel(e);
      }
      console.log(errors);
    } else if (type === "discussion") {
      const errors = {};
      if (!discussionFormData.title) {
        errors.title = "Title is required";
        setDiscussErrors(errors);
      } else if (!discussionFormData.desc) {
        errors.desc = "Description is required";
        setDiscussErrors(errors);
      } else if (!discussionFormData.tags) {
        errors.tags = "Tags is required";
        setDiscussErrors(errors);
      } else {
        setDiscussErrors({ title: "", desc: "", tags: "" });
        await dispatch(addDiscussion(discussionFormData));
        await handleCancel(e);
      }
      console.log(errors);
    }
    await dispatch(getPosts());
  };
  console.log();

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
     

  };

  return (
    <section
      className={`${styles.createPost} ${post.isShow ? styles.showen : ""}`}
    >
      <article className={styles.post}>
        <h2 className={`${styles.h2} large-fs semi-bold black`}>Create Post</h2>
        <ul className={`${styles.ul} medium-fs normal`} role="list">
          <li
            className={`${styles.li} ${current === 1 ? styles.active : ""}`}
            onClick={() => onTabChange(1)}
          >
            Share Your Idea
          </li>
          <li
            className={`${styles.li} ${current === 2 ? styles.active : ""}`}
            onClick={() => onTabChange(2)}
          >
            Ask Question
          </li>
          <li
            className={`${styles.li} ${current === 3 ? styles.active : ""}`}
            onClick={() => onTabChange(3)}
          >
            Discussion
          </li>
          {/* <li className={`${styles.li} ${current === 4 ? styles.active : ''}`} onClick={() => setCurrent(4)}>Post</li> */}
        </ul>
        <div
          className={`${styles.formsHolder} ${
            current === 1 ? styles.first : ""
          } ${current === 2 ? styles.second : ""} ${
            current === 3 ? styles.third : ""
          } ${current === 4 ? styles.fourth : ""}`}
        >
          <form className={styles.form}>
            <label className="small-fs normal dark-gray" htmlFor="title">
              Idea Title
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="title"
              placeholder="Briefly describe your idea in a few words"
              onChange={(e) => ideaFormChange(e)}
              value={ideaFormData.title}
              name="title"
            />
            {ideaErrors?.title && (
              <span className={styles.error}>{ideaErrors.title}</span>
            )}
            <label className="small-fs normal dark-gray" htmlFor="desc">
              Idea Description
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="desc"
              placeholder="Tell us more about your idea and how you envision it coming to life"
              onChange={(e) => ideaFormChange(e)}
              value={ideaFormData.desc}
              name="desc"
            />
            {ideaErrors?.desc && (
              <span className={styles.error}>{ideaErrors.desc}</span>
            )}
            <label className="small-fs normal dark-gray" htmlFor="industry">
              Industry
            </label>
            <select
              className={`${styles.input} medium-fs light normal-gray`}
              id="industry"
              onChange={(e) => ideaFormChange(e)}
              value="software"
              name="industry"
            ></select>
            {ideaErrors?.industry && (
              <span className={styles.error}>{ideaErrors.industry}</span>
            )}
            <label className="small-fs normal dark-gray" htmlFor="tags">
              Tags
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="tags"
              placeholder="Enter tags e.g #edtech, #produtivity"
              onChange={(e) => ideaFormChange(e)}
              value={ideaFormData.tags}
              name="tags"
            />
            {ideaErrors?.tags && (
              <span className={styles.error}>{ideaErrors.tags}</span>
            )}
            <div className={styles.add}>
              <label
                className={`${styles.linksLabel} small-fs normal dark-gray`}
                htmlFor="links"
              >
                Add links
              </label>
              <input
                className={`${styles.input} ${styles.linksInput} medium-fs light normal-gray`}
                type="text"
                id="links"
                placeholder="Add relevant links e.g articles/websites"
                onChange={(e) => ideaFormChange(e)}
                value={ideaFormData.links}
                name="links"
              />
              
              <label
                className={`${styles.imageLabel} small-fs normal dark-gray`}
                htmlFor="desc"
              >
                Add image
              </label>
              <div   className={`${styles.upload} S-BTN`}>
                <label htmlFor="fileInput">
                    {FiUpload({})} Upload
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImage}
                  className="d-none"
                />
              </div>
              
              {/* <div>
                <Input type="file" onChange={handleImage}/>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the form submission
                  }}
                  className={`${styles.upload} S-BTN`}
                >
                  {FiUpload({})} Upload
                </button>
              </div> */}

              {/* <DropImage setAcceptedFile={setImage} setUrl={setImageUrl}>
                <button className={`${styles.upload} S-BTN`}>
                  {FiUpload({})} Upload
                </button>
              </DropImage> */}
            </div>
            {ideaErrors?.links && (
              <span className={styles.error}>{ideaErrors.links}</span>
            )}
            {ideaErrors?.image && (
              <span className={styles.error}>{ideaErrors.image}</span>
            )}
            <div className={styles.checkBoxes}>
              <input
                type="checkbox"
                className={`${styles.checkbox} ${
                  ideaFormData.discussion && "checked"
                } checkbox `}
                onChange={(e) => ideaFormChange(e)}
                checked={ideaFormData.discussion}
                name="discussion"
              />
              <label
                className={`${styles.label} small-fs normal dark-gray`}
                htmlFor="desc"
              >
                Allow Discussion
              </label>
              <p className={`${styles.p} small-fs light normal-gray `}>
                Start a discussion and get valuable insights from the community
                on your idea.
              </p>
            </div>
            <div className={styles.checkBoxes}>
              <input
                type="checkbox"
                className={`${styles.checkbox} ${
                  ideaFormData.requirement && "checked"
                } checkbox `}
                onChange={(e) => ideaFormChange(e)}
                checked={ideaFormData.requirement}
                name="requirement"
              />
              <label
                className={`${styles.label} small-fs normal dark-gray`}
                htmlFor="desc"
              >
                Hire Requirement
              </label>
              <p className={`${styles.p} small-fs light normal-gray`}>
                Specify the roles you need to bring your idea to life. Find the
                perfect fit for your team and start collaborating today.
              </p>
            </div>
            {ideaFormData.requirement && (
              <>
                <p className={`${styles.HireReqP} small-fs normal dark-gray`}>
                  <label className={`${styles.HireReqLabel}`}>
                    Required Roles
                  </label>
                  <label className={`${styles.HireReqLabel}`}>
                    Years of experience
                  </label>
                </p>
                {ideaFormData.roles.map((e, i) => (
                  <div className={`${styles.HireInputs}`} key={i}>
                    <input
                      className={`${styles.HireInput} medium-fs light normal-gray`}
                      type="text"
                      placeholder="e.g. developer, designer"
                      value={e.role}
                      onChange={(e) => ideaFormChange(e, i)}
                      name="role"
                    />
                    <select
                      className={`${styles.HireInput} medium-fs light normal-gray`}
                      type="text"
                      value={e.YOE}
                      onChange={(e) => ideaFormChange(e, i)}
                      name="YOE"
                    >
                      <option value="">eg: 1-2 Years</option>
                      <option value="0-1">0-1 Years</option>
                      <option value="1-2">1-2 Years</option>
                      <option value="2-3">2-3 Years</option>
                      <option value="3-4">3-4 Years</option>
                      <option value="+4">+4 Years</option>
                      <option value="Any">Any Years of experience</option>
                    </select>
                  </div>
                ))}
                {ideaFormData.roles.length < 4 && (
                  <p className={`${styles.addIcon} small-fs normal`}>
                    <span className={`${styles.icon} large-fs`}>
                      {MdAdd({})}
                    </span>
                    <span className={styles.icon} onClick={handleAddRoles}>
                      Add role
                    </span>
                  </p>
                )}
              </>
            )}
            <div className={styles.btns}>
              <button
                className={`${styles.cancelBtn} S-BTN`}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={`${styles.postBtn} P-BTN`}
                onClick={(e) => submitPost(e, "post")}
              >
                Post Idea
              </button>
            </div>
          </form>
          <form className={styles.form}>
            <label className="small-fs normal dark-gray" htmlFor="title">
              Question
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="question"
              placeholder="What do you want to ask?"
              value={questionFormData.question}
              name="question"
              onChange={(e) => questionFormChange(e)}
            />
            {questionErrors?.question && (
              <span className={styles.error}>{questionErrors.question}</span>
            )}
            <label className="small-fs normal dark-gray" htmlFor="desc">
              Description
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="desc"
              placeholder="Tell us more about your idea and how you envision it coming to life"
              value={questionFormData.desc}
              name="desc"
              onChange={(e) => questionFormChange(e)}
            />
            {questionErrors?.desc && (
              <span className={styles.error}>{questionErrors.desc}</span>
            )}
            <label className="small-fs normal dark-gray" htmlFor="tags">
              Tags
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="tags"
              placeholder="Enter tags e.g #edtech, #produtivity"
              value={questionFormData.tags}
              name="tags"
              onChange={(e) => questionFormChange(e)}
            />
            {questionErrors?.tags && (
              <span className={styles.error}>{questionErrors.tags}</span>
            )}
            <div className={styles.btns}>
              <button
                className={`${styles.cancelBtn} S-BTN`}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={`${styles.postBtn} P-BTN`}
                onClick={(e) => submitPost(e, "question")}
              >
                Ask Question
              </button>
            </div>
          </form>
          <form className={styles.form}>
            <label className="small-fs normal dark-gray" htmlFor="title">
              Title
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="title"
              placeholder="What's on your mind?"
              value={discussionFormData.title}
              name="title"
              onChange={(e) => discussionFormChange(e)}
            />
            {discussErrors?.title && (
              <span className={styles.error}>{discussErrors.title}</span>
            )}
            <label className="small-fs normal dark-gray" htmlFor="desc">
              Description
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="desc"
              placeholder="Tell us more about your topic"
              value={discussionFormData.desc}
              name="desc"
              onChange={(e) => discussionFormChange(e)}
            />
            {discussErrors?.desc && (
              <span className={styles.error}>{discussErrors.desc}</span>
            )}

            <label className="small-fs normal dark-gray" htmlFor="tags">
              Tags
            </label>
            <input
              className={`${styles.input} medium-fs light normal-gray`}
              type="text"
              id="tags"
              placeholder="Enter tags e.g #edtech, #produtivity"
              value={discussionFormData.tags}
              name="tags"
              onChange={(e) => discussionFormChange(e)}
            />
            {discussErrors?.tags && (
              <span className={styles.error}>{discussErrors.tags}</span>
            )}

            <div className={styles.btns}>
              <button
                className={`${styles.cancelBtn} S-BTN`}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={`${styles.postBtn} P-BTN`}
                onClick={(e) => submitPost(e, "discussion")}
              >
                Post{" "}
              </button>
            </div>
          </form>
          <form className={styles.form}>
            <textarea
              className={styles.input}
              type="text"
              id="title"
              placeholder="What would you like to share today?"
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
            />
            <div className={styles.btns}>
              <button className={`${styles.cancelBtn} S-BTN`}>Cancel</button>
              <button className={`${styles.postBtn} P-BTN`}>Post Idea</button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default CreatePost;
