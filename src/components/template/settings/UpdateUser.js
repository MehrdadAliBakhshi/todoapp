import React from 'react';
import styles from './updateUser.module.css'
const UpdateUser = () => {
    return (
        <>
            <div className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.input_group}>
                        <input 
                        type='text'
                        name='firstName'
                         />
                    </div>
                    <div className={styles.input_group}>
                        <input 
                        type='text'
                        name='lastName'
                         />
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateUser;