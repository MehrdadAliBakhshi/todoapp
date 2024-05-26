import React from 'react';
import styles from './footer.module.css'
import Link from 'next/link';

const Footer = () => {
    return (
        <div className={styles.form_footer}>
            هنوز ثبت نام نکردی ؟
            <Link href="/signup" className="primary_link"> ثبت نام </Link>
        </div>
    );
};

export default Footer;