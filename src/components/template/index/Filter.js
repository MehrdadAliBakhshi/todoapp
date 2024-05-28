"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from './filter.module.css'
const Filter = ({ categories, handleshowComplete, setCatId, resetCheckBox }) => {
    const [check, setCheck] = useState(false)
    const complete = useRef()
    const catsChange = (e) => {
        if (e.target.value && e.target.value !== "") {
            setCatId(e.target.value)
        }
    }
    useEffect(() => {
        handleComplete()
    }, [resetCheckBox])
    useEffect(() => {
        handleshowComplete(check)
    }, [check])

    const handleComplete = () => {
        setCheck(prev => !prev)

    }
    return (
        <div className={styles.container}>
            <label className={styles.show_complete} ref={complete} >
                نمایش تکمیل شده ها :
                <input type='checkbox' value={check} onChange={handleComplete} />
            </label>
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