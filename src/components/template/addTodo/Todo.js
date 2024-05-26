"use client"
import React, { useEffect, useState } from 'react';
import styles from './todo.module.css'
import CreateTodoForm from './CreateTodoForm';
import Link from 'next/link';

const Todo = ({ user }) => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const getCats = async () => {
        await fetch('./api/category')
            .then(res => res.json())
            .then(data => setCategories([...data]))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getCats()
    }, [])

    return (
        <>
            <div className={styles.todo}>
                {
                    !loading ? (
                        categories.length !== 0 ?
                            <CreateTodoForm categories={categories} userId={user} />
                            : <div className={styles.add_cat_first}>
                                <h3>
                                    شما دسته بندی تعریف نکردید
                                </h3>
                                <h5>ابتدا یک دسته بندی تعریف کنید</h5>
                                <Link className='primary_btn' href="/categories">افزودن دسته بندی</Link>
                            </div>
                    ) : <p>در حال بارگزاری لطفا منتظر باشید ..</p>
                }
            </div>

        </>
    );
};

export default Todo;