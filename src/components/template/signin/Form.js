"use client"
import React from 'react';
import styles from './form.module.css'
import { Formik } from 'formik';
import { LuLock, LuMail } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const validate = (values) => {
    const errors = {}
    if (!values.email) {
        errors.email = "ایمیل نمی تواند خالی باشد";
    } else if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(values.email)) {
        errors.email = "ایمیل وارد شده صحیح نمی باشد";
    }
    if (!values.password) {
        errors.password = "پسورد نمی تواند خالی باشد";
    } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g.test(values.password)) {
        errors.password = "پسورد وارد شده صحیح نمی باشد";
    }
    return errors;
}

const Form = () => {
    const router = useRouter();
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validate={validate}
                onSubmit={async (values, { setSubmitting }) => {
                    const user = {
                        email: values.email,
                        password: values.password
                    }
                    const res = await fetch('./api/auth/signin', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(user)
                    })
                    if (res.status === 200) {
                        toast.success('با موفقیت وارد شدید', {
                            autoClose: 1000,
                            theme: "colored",
                            onClose: () => {
                                setSubmitting(false)
                                router.refresh('/')
                            }
                        });

                    } else if (res.status === 419 || res.status === 401) {
                        toast.error('ایمیل یا پسورد نا معتبر است', {
                            theme: "colored",
                            autoClose: 1000,
                        });
                    } else if (res.status === 402) {
                        toast.error('اکانت شما توسط ادمین بسته شده است', {
                            theme: "colored",
                            autoClose: 1000,
                        });
                    }else if (res.status === 404) {
                        toast.error('کاربری با این مشخصات یافت نشد', {
                            theme: "colored",
                            autoClose: 1000,
                        });
                    }
                }}
            >
                {({
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    values,
                    errors,
                    touched,
                    isSubmitting
                }) => (
                    <form className={styles.signin_form} onSubmit={handleSubmit}>
                        <div className={styles.form_group_input}>
                            <LuMail />
                            <input
                                type="email"
                                className={styles.form_input}
                                placeholder="ایمیل"
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.email && touched.email && <span className='error'>{errors.email}</span>}
                        <div className={styles.form_group_input}>
                            <LuLock />
                            <input
                                type="password"
                                className={styles.form_input}
                                placeholder="رمز عبور"
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.password && touched.password && <span className='error'>{errors.password}</span>}
                        <button disabled={isSubmitting} type='submit' className="primary_btn">
                            ورود
                        </button>
                    </form>
                )
                }
            </Formik >
            <ToastContainer />
        </>


    );
};

export default Form;