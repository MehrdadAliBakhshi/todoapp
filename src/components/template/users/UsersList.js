'use client'
import React, { useEffect, useState } from 'react';
import styles from './userList.module.css'

const UsersList = ({ users , todos }) => {
    
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
                                <tr className={styles.user_info} key={index+1}>
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
                                            <a
                                                href='#'
                                                className={styles.eidt}
                                            >
                                                بن
                                            </a>
                                            <a
                                                href='#'
                                                className={styles.delete}
                                            >
                                                حذف

                                            </a>
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