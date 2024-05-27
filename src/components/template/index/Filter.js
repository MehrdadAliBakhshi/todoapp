"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from './filter.module.css'
const Filter = ({ categories, handleshowComplete, setCatId }) => {
    const complete = useRef()
    const catsChange = (e) => {
        if (e.target.value && e.target.value !== "") {
            setCatId(e.target.value)
        }
    }

    const handleComplete = () => {
        handleshowComplete(complete.current.checked)
    }
    return (
        <div className={styles.container}>
            <div className={styles.show_complete}>
                <span>
                    نمایش تکمیل شده ها
                </span>
                <input type='checkbox' ref={complete} onChange={handleComplete} />
            </div>
            <div className={styles.filter_by_cats}>
                بر اساس دسته بندی :
                <select
                    onChange={(e) => catsChange(e)}
                    defaultValue="-1"
                >
                    <option value="-1"  >همه دسته بندی ها</option>
                    {categories && categories.map(cat => {
                        return <option value={cat._id} key={cat._id}>{cat.title}</option>
                    })}


                </select>
            </div>
            {/* <div className={styles.filter_by_deadline}>
                <span>
                    مرتب سازی بر اساس تاریخ سررسید
                </span>
                <input type='checkbox' />
            </div> */}
        </div>
    );
};

export default Filter;