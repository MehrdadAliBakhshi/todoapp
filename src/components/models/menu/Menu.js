"use client"
import React, { useEffect, useState } from 'react';
import Search from './Search';
import styles from './menu.module.css'
import { FaFingerprint } from "react-icons/fa6";
import Signout from './Signout';
import UserInfo from './UserInfo';
import Link from 'next/link';

const Menu = ({ username, role }) => {

    return (
        <div className={styles.menu}>
            <UserInfo username={username} />
            <div className={styles.d_flex}>
                <h2 className="title">منــــــــــــــــــــــو</h2>
                <span className="icon">
                    <FaFingerprint />
                </span>
            </div>
            <Search />
            <nav className={styles.nav_container}>
                <ul className={styles.nav} >
                    <li className={styles.nav_item}>
                        <Link className={styles.nav_link} href="/">همه فعالیت ها</Link>
                    </li>
                    <li className={styles.nav_item}>
                        <Link className={styles.nav_link} href="/addTodo">فعالیت جدید</Link>
                    </li>
                    <li className={styles.nav_item}>
                        <Link className={styles.nav_link} href="/categories">دسته بندی ها</Link>
                    </li>
                    {role === "ADMIN" && <li className={styles.nav_item}>
                        <Link className={styles.nav_link} href="/users">کاربران</Link>
                    </li>}

                </ul>
            </nav>
            <Signout />
        </div>

    );
};

export default Menu;