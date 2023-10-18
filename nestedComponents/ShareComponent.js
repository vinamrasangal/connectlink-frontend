import React, { useState } from 'react';
import styles from '../styles/Ideapool.module.scss';
import { AiOutlineClose } from 'react-icons/ai'
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    ViberShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    InstapaperIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    ViberIcon,
    WhatsappIcon,
} from "react-share";

const ShareComponent = ({url,quote,hashtag,isShowen,setShareData}) => {
    const [btnTxt,setBtnTxt] = useState('Copy');
    function handleClose(){
        setShareData({url:'',quote:'',hashtag:'',isShowen:false})
    }
    function handleCopy(){
        navigator.clipboard.writeText(url);
        setBtnTxt('Copied')
        setTimeout(()=>{
            handleClose()
            setBtnTxt('Copy')
        },2000)
    }
    return (
        <section className={`${styles.shareSection} ${isShowen && styles.showen}`}>
                <div className={styles.overLay}></div>
                <article className={styles.shareBtns}>
                    <h2 className={`${styles.shareH2} normal-gray`}>
                        <span className='large-fs light'>
                            Share
                        </span>
                        <span className={`${styles.icon} x-large-fs`} onClick={handleClose}>
                            {AiOutlineClose({})}
                        </span>
                    </h2>
                    <div className={styles.shareIconsHolder}>
                        <EmailShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <EmailIcon size={54} round={true}/>
                        </EmailShareButton>
                        <FacebookShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <FacebookIcon size={54} round={true}/>
                        </FacebookShareButton>
                        <FacebookMessengerShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <FacebookMessengerIcon size={54} round={true}/>
                        </FacebookMessengerShareButton>
                        <InstapaperShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <InstapaperIcon size={54} round={true}/>
                        </InstapaperShareButton>
                        <LinkedinShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <LinkedinIcon size={54} round={true}/>
                        </LinkedinShareButton>
                        <PinterestShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                            media={url}
                        >
                            <PinterestIcon size={54} round={true}/>
                        </PinterestShareButton>
                        <RedditShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <RedditIcon size={54} round={true}/>
                        </RedditShareButton>
                        <TelegramShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <TelegramIcon size={54} round={true}/>
                        </TelegramShareButton>
                        <TwitterShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <TwitterIcon size={54} round={true}/>
                        </TwitterShareButton>
                        <ViberShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <ViberIcon size={54} round={true}/>
                        </ViberShareButton>
                        <WhatsappShareButton
                            url={url}
                            quote={quote}
                            hashtag={hashtag}
                        >
                            <WhatsappIcon size={54} round={true}/>
                        </WhatsappShareButton>

                    </div>
                    <div className={styles.copy}>
                        <p className={`${styles.url} normal-gray normal medium-fs`}>
                            {url}
                        </p>
                        <button className={`${styles.copyBtn} P-BTN`} onClick={handleCopy}>
                            {btnTxt}
                        </button>
                    </div>
                </article>
            </section>
    )
}

export default ShareComponent