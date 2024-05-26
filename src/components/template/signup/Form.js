"use client"
import React from 'react';
import styles from './form.module.css'
import { LuLock, LuMail, LuUser2 } from 'react-icons/lu';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

const validate = (values) => {
    const errors = {}
    if (!values.username) {
        errors.username = "نام کاربری نمی تواند خالی باشد";
    } else if (! /^[a-z0-9_-]{3,15}$/g.test(values.username.toLowerCase())) {
        errors.username = "نام کاربری وارد شده صحیح نمی باشد";
    }
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
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
            }}
            validate={validate}
            onSubmit={async (values, { setSubmitting }) => {
                const newUser = {
                    username: values.username,
                    email: values.email,
                    password: values.password
                }
                const res = await fetch('/api/auth/signup', {
                    method: "POST",
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(newUser)
                })
                if (res.status === 201) {
                    swal({
                        title: "هوراا",
                        text: "ثبت نام شما با موفقیت انجام شد",
                        icon: "success",
                        button: 'متوجه شدم'
                    }).then(() => {
                        router.push('/')
                        setSubmitting(false)
                    })
                } else if (res.status === 409) {
                    swal({
                        title: "Oops",
                        text: "ورودی ها نا معتبر می باشد",
                        icon: "error",
                        button: 'متوجه شدم'
                    })
                } else if (res.status === 422) {
                    swal({
                        title: "Oops",
                        text: "نام کاربری یا رمز عبور تکراری می باشد",
                        icon: "error",
                        button: 'متوجه شدم'
                    })
                }
            }}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                <form className={styles.signup_form} onSubmit={handleSubmit}>
                    <div className={styles.form_group_input}>
                        <LuUser2 />
                        <input
                            type="text"
                            className={styles.form_input}
                            placeholder="نام کاربری"
                            name='username'
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.username && touched.username && <span className='error'>{errors.username}</span>}
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
                    <button disabled={isSubmitting} type='submit' className="primary_btn">ثبت نام</button>
                </form>
            )}
        </Formik>

    );
};

export default Form;