import React, { useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { BiFilter } from 'react-icons/bi';
import { FiUserCheck } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import CreatePost from '@/components/CreatePost';
import styles from '../styles/Home.module.scss';


const Home = () => {

    const dispatch = useDispatch();

    return (
        <section className={`container ${styles.container}`}>
            <h2 className={`${styles.h2} x-large-fs semi-bold dark-gray`}>Home</h2>
            {/* <CreatePost/> */}
        </section>
    )
}

export default Home
