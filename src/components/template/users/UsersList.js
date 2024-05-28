'use client'
import React, { useEffect, useState } from 'react';
import styles from './userList.module.css'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const UsersList = ({ users, todos }) => {
    const router = useRouter()
    const handleBanUser = async (id) => {
        const res = await fetch('./api/banUser', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        if (res.status === 200) {
            toast.success("وضعیت کاربر با موفقیت تغییر کرد", {
                theme: 'colored',
                autoClose: 1000,
                onClose: () => router.refresh()
            })
        } else if (res.status === 401) {
            toast.error("کاربران عادی اجازه بن را ندارند", {
                theme: 'colored',
                autoClose: 1000,
                onClose: () => router.refresh()
            })
        } else if (res.status === 404) {
            toast.error("کاربری با این مشخصات یافت نشد", {
                theme: 'colored',
                autoClose: 1000,
                onClose: () => router.refresh()
            })
        } else if (res.status === 409) {
            toast.error("شما نمی توانید ادمین را بن کنید", {
                theme: 'colored',
                autoClose: 1000,
                onClose: () => router.refresh()
            })
        }
    }
    return (
        <div className={styles.container}>

            <>
                <h2 className='sub_title'>دسته بندی ها</h2>
                {users.length !== 0 ?
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.header}>
                                <th>ردیف</th>
                                <th>نام کاربری</th>
                                <th>ایمیل</th>
                                <th>فعالیت ها</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr className={styles.user_info} key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td className={styles.user_username}>{user.username}</td>
                                    <td className={styles.user_email}>
                                        {user.email}
                                    </td>
                                    <td className={styles.user_todos}>
                                        {todos.filter(todo => todo.userId === user._id).length}
                                    </td>
                                    <td>
                                        <div className={styles.btns}>
                                            {user.isBan ?
                                                <a
                                                    href='#'
                                                    className={styles.make_free}
                                                    onClick={() => handleBanUser(user._id)}
                                                >
                                                    فعال کردن
                                                </a>
                                                : <a
                                                    href='#'
                                                    className={styles.make_ban}
                                                    onClick={() => handleBanUser(user._id)}
                                                >
                                                    بن کردن
                                                </a>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <div className={styles.div_loading}>در حال بارگزاری ....</div>
                }
            </>

        </div>
    );
};

export default UsersList;