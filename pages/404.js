import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Link from 'next/link';

const NotFound = () => {
    return (
        <section className='not-found'>
            <img src="/Page Not Found.svg" alt="" />
            <h2 className='heading-fs black semi-bold'>Sorry, We couldn’t find that page</h2>
            <Link href='/'>
                <button className='P-BTN'>
                    <span className='large-fs'>{AiOutlineArrowLeft({})}</span>
                    <p>Back home</p>
                </button>
            </Link>
        </section>
    )
}

export default NotFound