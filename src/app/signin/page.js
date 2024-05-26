import React from 'react';
import styles from './signin.module.css'
import Form from '@/components/template/signin/Form';
import Footer from '@/components/template/signin/Footer';
import { authUser } from '@/utils/serverHelper';
import { redirect } from 'next/navigation';

const page = async () => {
    const user =await authUser();
    if(user){
        redirect('/')
    }
    return (
        <div className={styles.signin_container}>
            <div className={styles.signin_wrapper}>
                <span className={styles.signin_title}>
                    ورود
                </span>
                <Form />
                <Footer />
            </div>
        </div>
    );
};

export default page;