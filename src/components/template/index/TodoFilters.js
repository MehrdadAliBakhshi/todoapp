"use client"
import React, { useState } from 'react';
import styles from './todoFilters.module.css'

const TodoFilters = ({ categories, getTodos , setShowComplete }) => {

    const [isChecked, setIsChecked] = useState(false)
    const catSelectHandler = (e) => {
        setCatSelected(e.target.value)
    }
    const showComplete = () => {
        setIsChecked(prev => !prev)
        setShowComplete(prev => !prev)
    }
    return (
        <div className={styles.filter_container}>
            <label className={styles.filter_completed}>
                <input type='checkbox' checked={isChecked} onChange={showComplete} />
                نمایش فعالیت های تمام شده
            </label>
            <div className={styles.filter_by_cats_container}>
                <span>مرتب سازی بر اساس دسته بندی : </span>
                <select className={styles.filter_by_cats} onChange={(e) => catSelectHandler(e)}>
                    <option value="-1" >انتخاب دسته بندی</option>
                    {categories.map(cat => (<option value={cat._id} key={cat._id}>{cat.title}</option>))}
                </select>
            </div>

        </div>
    );
};

export default TodoFilters;