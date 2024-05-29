"use client"
import React, { useEffect, useState } from 'react';
import styles from './catForm.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from 'formik';

const validate = (values) => {
    const error = {};
    if (!values.title) {
        error.title = "عنوان نمی تواند خالی باشد";
    } else if (!values.title.length > 3) {
        error.title = "عنوان باید حداقل 3 حرف باشد"
    }
    return error;
}

const CatForm = ({ userId, getCats, catsCount }) => {

    return (
        <>
            <div className={styles.create_cat_container}>
                <Formik
                    initialValues={{
                        title: "",
                        color: "#06623B"
                    }}
                    validate={validate}
                    onSubmit={async (values, { setSubmitting }) => {
                        const newCat = {
                            title: values.title,
                            userId,
                            color: values.color && values.color
                        }
                        if (catsCount < 5) {
                            const res = await fetch('./api/category', {
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newCat)
                            })
                            if (res.status === 201) {
                                toast.success('دسته بندی با موفقیت ایجاد شد', {
                                    theme: 'colored',
                                    autoClose: 1000,
                                    onClose: () => {
                                        setSubmitting(false)
                                        values.title = ""
                                        getCats()
                                    }

                                })
                            } else if (res.status === 422) {
                                toast.error('دسته بندی با این عنوان قبلا ایجاد شده است', {
                                    theme: 'colored'
                                })
                            } else if (res.status === 401) {
                                toast.error('شما به اپ وارد نشده اید', {
                                    theme: 'colored'
                                })
                            } else if (res.status === 409) {
                                toast.error('ورودی ها نامعتبر می باشد', {
                                    theme: 'colored'
                                })
                            }
                        } else {
                            toast.error('حداکثر تداد دسته بندی 5 عدد است', {
                                theme: "colored"
                            })
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form className={styles.create_cat_form} onSubmit={handleSubmit}>
                            <div className={styles.create_cat_inputs}>
                                <label className={styles.cat_title}>
                                    <input
                                        type="text"
                                        placeholder='عنوان دسته بندی را انتخاب نمایید *'
                                        className={styles.input_cat_title}
                                        name='title'
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                    {errors.title && touched.title && <span className={styles.error}>{errors.title}</span>}
                                </label>
                                <label className={styles.select_cat_color_container}>
                                    <span>انتخاب رنگ دسته بندی</span>
                                    <input
                                        type="color"
                                        className={styles.input_cat_color}
                                        name='color'
                                        value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </label>
                            </div>
                            <div className={styles.create_cat_btns}>
                                <button disabled={isSubmitting} type='submit' className="primary_btn">ذخیره</button>
                            </div>
                        </form>
                    )

                    }

                </Formik>
            </div>
            <ToastContainer />
        </>
    );
};

export default CatForm;