import React from 'react';
import styles from './signup.module.css'
import Form from '@/components/template/signup/Form';
import Footer from '@/components/template/signup/Footer';
import { authUser } from '@/utils/serverHelper';

const page = async () => {
    const user =await authUser();
    if(user){
        redirect('/')
    }

    return (
        <div className="main_container">
            <div className={styles.signup_container}>
                <div className={styles.signup_wrapper}>
                    <h2 className={styles.signup_title}>
                        ثبت نام
                    </h2>
                    <Form />
                    <Footer />
                </div>

            </div>
        </div>
    );
};

export default page;