"use client"
import React from 'react';
import styles from './signout.module.css'
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';




const Signout = () => {
    const router = useRouter()
    const handleSignout = async (e) => {
        e.preventDefault();
        swal({
            title: 'آیا می خواهید خارج شوید؟',
            icon: "warning",
            buttons:["خیر","بله"]
        }).then(async (result) => {
            if (result) {
                const res = await fetch('./api/auth/signout', {
                    method: "POST"
                })
                if (res.status === 200) {
                    router.refresh()
                }
            }
        })

    }
    return (
        <div className={styles.signout_container}>
            <a href="#" className={styles.signout_link} onClick={(e) => handleSignout(e)}>
                <span className="icon">
                    <FaArrowRightToBracket />
                </span>
                خــــــــــــــــــــــــــروج
            </a>
        </div>
    );
};

export default Signout;