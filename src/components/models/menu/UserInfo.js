import React from 'react';
import styles from './userInfo.module.css';

const UserInfo = ({ username }) => {
    return (
        <div className={styles.userinfo_container}>
            <h2 className={styles.UserInfo}>
                سلام :
                <span className={styles.username}>
                    {username}
                </span>
            </h2>
        </div>
    );
};

export default UserInfo;