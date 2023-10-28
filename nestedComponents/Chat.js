import React, { useEffect, useState } from 'react';
import style from '../styles/Messages.module.scss';
import { AiOutlineClose,AiOutlineFile } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';

const Chat = ({setIsShowen}) => {
    const [messages,setMessages] = useState([
        {
            sender:'Phoenix Baker',
            type:'file',
            fileSize:'1.2 MB',
            fileName:'Tech requirements.pdf',
            date:'Thursday 11:40am'
        },
        {
            sender:'you',
            type:'text',
            content:'Awesome! Thanks.',
            date:'Thursday 11:41am'
        },
        {
            type:'newDay',
            date:'Today'
        },
        {
            sender:'Phoenix Baker',
            type:'text',
            content:'Hey Olivia, can you please review the latest design when you can?',
            date:'Friday 2:20pm'
        },
        {
            sender:'you',
            type:'text',
            content:'Sure thing, I’ll have a look today.',
            date:'Friday 2:20pm'
        },
    ])
    return (
        <section className={style.chatHolder}>
            <article className={style.chat}>
                <header className={style.header}>
                    <h2 className={`${style.name} dark-gray semi-bold x-large-fs`}>
                        Phoenix Baker
                    </h2>
                    <button className={`${style.icon} normal-gray large-fs`} onClick={()=>setIsShowen(false)}>
                        {AiOutlineClose({})}
                    </button>
                </header>
                <ul className={style.ul} role='list'>
                    {messages.map((e,i)=>{
                        if(e.type === 'newDay'){
                            return <li className={`${style.li} ${style.day}`} key={i}>
                                <p className={`${style.p} light medium-fs light-gray`}>Today</p>
                            </li>
                        }else if (e.type === 'file'){
                            if(e.sender === 'you'){
                                return <li className={`${style.li} ${style.you} ${style.attachment}`} key={i}>
                                    <div className={style.content}>
                                        <p className={`${style.name} small-fs semi-bold normal-gray`}>{e.sender}</p>
                                        <span className={`${style.date} small-fs light light-gray`}>{e.date}</span>
                                        <div className={style.file}>
                                            <span className={style.icon}>
                                                {AiOutlineFile({})}
                                            </span>
                                            <p className={`${style.fileName} normal normal-gray medium-fs`}>
                                                {e.fileName}
                                            </p>
                                            <span className={`${style.size} light light-gray medium-fs`}>
                                                {e.fileSize}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            } else {
                                return <li className={`${style.li} ${ style.user} ${style.attachment}`} key={i}>
                                    <div className={style.content}>
                                        <img className={style.image} src="/personal-image.png" alt="" />
                                        <span className={`${style.isActive} ${style.yes}`}></span>
                                        <p className={`${style.name} small-fs semi-bold normal-gray`}>{e.sender}</p>
                                        <span className={`${style.date} small-fs light light-gray`}>{e.date}</span>
                                        <div className={style.file}>
                                            <span className={style.icon}>
                                                {AiOutlineFile({})}
                                            </span>
                                            <p className={`${style.fileName} normal normal-gray medium-fs`}>
                                                {e.fileName}
                                            </p>
                                            <span className={`${style.size} light light-gray medium-fs`}>
                                                {e.fileSize}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            }
                        }else {
                            if(e.sender === 'you'){
                                return <li className={`${style.li} ${style.you}`} key={i}>
                                    <div className={style.content}>
                                        <p className={`${style.name} small-fs semi-bold normal-gray`}>{e.sender}</p>
                                        <p className={`${style.date} small-fs light light-gray`}>{e.date}</p>
                                        <p className={`${style.p} light medium-fs`}>{e.content}</p>
                                    </div>
                                </li>
                            } else {
                                return <li className={`${style.li} ${style.user}`} key={i}>
                                    <div className={style.content}>
                                        <img className={style.image} src="/personal-image.png" alt="" />
                                        <span className={`${style.isActive} ${style.yes}`}></span>
                                        <p className={`${style.name} small-fs semi-bold normal-gray`}>{e.sender}</p>
                                        <p className={`${style.date} small-fs light light-gray`}>{e.date}</p>
                                        <p className={`${style.p} light medium-fs`}>
                                            {e.content}
                                        </p>
                                    </div>
                                </li>
                            }
                        }
                    })
                    }
                </ul>
                <nav className={style.sendMessage}>
                    <input 
                        type="text" 
                        className={`${style.input} medium-fs light normal-gray`} 
                        placeholder='Message'
                    />
                    <button className={`${style.sendBtn} large-fs`}>
                        {FiSend({})}
                    </button>
                </nav>
            </article>

        </section>
    )
}

export default Chat