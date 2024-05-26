import React from 'react';
import styles from './footer.module.css'
import Link from 'next/link';

const Footer = () => {
    return (
        <div className={styles.form_footer}>
            قبلاً ثبت نام کردم
            <Link href="/signin" className="primary_link"> ورود</Link>
        </div>
    );
};

export default Footer;