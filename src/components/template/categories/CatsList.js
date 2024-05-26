"use client"
import React from 'react';
import styles from './catsList.module.css'
import { useRouter } from 'next/navigation';

const CatsList = ({ categories, loading, deleteCategory, todos }) => {
    const router = useRouter()
    const deleteCat = (id) => {
        deleteCategory(id)
    }
    const editCat= (id)=>{
        router.push(`/categories/${id}`)
    }
    return (
        <>
            <div className={styles.container}>

                {categories.length ? (
                    <>
                        <h2 className='sub_title'>دسته بندی ها</h2>
                        {!loading ?
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.header}>
                                        <th>ردیف</th>
                                        <th>عنوان</th>
                                        <th>رنگ</th>
                                        <th>فعالیت ها</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat, index) => (
                                        <tr className={styles.data} key={index}>
                                            <td>{index + 1}</td>
                                            <td>{cat.title}</td>
                                            <td><span className={styles.cat_color} style={{ backgroundColor: cat.color }}></span></td>
                                            <td>
                                                {todos.length > 0 ? todos.filter(todo => todo.catId === cat._id).length : 0}
                                            </td>
                                            <td>
                                                <div className={styles.btns}>
                                                    <a
                                                        href='#'
                                                        className={styles.eidt}
                                                        onClick={() => editCat(cat._id)}
                                                        >ویرایش</a>
                                                    <a
                                                        href='#'
                                                        className={styles.delete} onClick={() => deleteCat(cat._id)}
                                                    >
                                                        حذف

                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <div className={styles.div_loading}>در حال بارگزاری ....</div>}
                    </>
                )
                    : <h2 className={styles.cats_not_created}>
                        شما دسته بندی تعریف نکرده اید
                    </h2>
                }
            </div>
        </>
    );
};

export default CatsList;