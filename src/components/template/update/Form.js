"use client"
import React, { useEffect, useState } from 'react';
import styles from './form.module.css'
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const validate = (values) => {
    const errors = {}

    if (!values.title) {
        errors.title = "عنوان نمی تواند خالی باشد"
    } else if (!values.title.length > 3) {
        errors.title = "عنوان نباید کمتر از 3 حرف باشد"
    }
    if (values.des.length > 25) {
        errors.des = "توضیحت نباید بیشتر از 25 حرف باشد"
    }
    if (values.cats === -1) {
        errors.cats = "لطفا یک دسته بندی را انتخاب نمایید"
    }
    return errors;
}
const Form = ({ categories, todo, userId }) => {
    const router = useRouter()
    const [today, setToday] = useState();
    const [val, setVal] = useState(todo.deadline)
    const [valValidate, setValValidate] = useState('')
    useEffect(() => {
        setToday(new DateObject({ calendar: persian, locale: persian_fa }))
    
    }, [])
    return (
        <div className={styles.form_container}>
            <h2 className='sub_title'>ایجاد فعالیت جدید :</h2>
            <Formik
                initialValues={{
                    title: todo.title,
                    des: todo.des ? todo.des : "",
                    cats: todo.catId,
                }}
                validate={validate}
                onSubmit={async (values, { setSubmitting }) => {
                    if (!valValidate) {
                        const newTodo = {
                            title: values.title,
                            des: values.des,
                            deadline: val ? val : today,
                            catId: values.cats === "-1" ? todo.catId : values.cats,
                            userId
                        }
                        const res = await fetch(`../api/todo/${todo._id}`, {
                            method: "PUT",
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify(newTodo)
                        })
                        if (res.status === 200) {
                            toast.success("فعالیت با موفقیت ویرایش شد", {
                                autoClose: 1000,
                                theme: "colored",
                                onClose: () => {
                                    values.title = "";
                                    values.des = "";
                                    values.cat = "-1";
                                    router.push('/');
                                    setSubmitting(false)
                                }
                            })
                        } else if (res.status === 409) {
                            toast.error("مقادیر ورودی نا معتبر است", {
                                autoClose: 1000,
                                theme: "colored",
                            })
                        }
                    }
                }}
            >
                {({
                    values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting
                }) => (
                    <form className={styles.form} onSubmit={handleSubmit} >
                        <div className={styles.inputs}>
                            <input
                                name='title'
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                className={styles.input_todo_title}
                                placeholder="عنوان فعالیت"
                            />
                            {errors.title && touched.title && <span className='error'>{errors.title}</span>}
                            <textarea
                                name="des"
                                value={values.des}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={styles.input_todo_des}
                                placeholder="توضیحات"
                                id=""
                            />
                            {errors.des && touched.des && <span className='error'>{errors.des}</span>}
                            <label className={styles.select_cat_container}>
                                <span>
                                    دسته بندی :
                                </span>
                                <select
                                    name="cats"
                                    value={values.cats}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={styles.select_todo_list}
                                >
                                    <option value="-1" >لطفا انتخاب کنید</option>
                                    {categories.length > 0 && categories.map(category => <option value={category._id} key={category._id}>{category.title}</option>)}

                                </select>
                            </label>
                            {errors.cats && touched.cats && <span className='error'>{errors.cats}</span>}
                            <div style={{ direction: "rtl" }}>
                                <label className={styles.data_picker_container} >
                                    <span>زمان اتمام فعالیت :</span>
                                    <DatePicker
                                        value={val}
                                        calendar={persian}
                                        locale={persian_fa}
                                        placeholder="تاریخ"
                                        onChange={(date) => {
                                            const year = date.year
                                            const month = date.month.number
                                            const day = date.day
                                            if (year < today.year) {
                                                setValValidate('سال انتخابی نباید گذشته باشد')
                                            } else if (year === today.year) {
                                                if (month < today.month.number) {
                                                    setValValidate('ماه انتخابی نباید گذشته باشد')
                                                } else if (month === today.month.number) {
                                                    if (day < today.day) {
                                                        setValValidate('روز انتخابی نباید گذشته باشد')
                                                    } else {
                                                        setVal(date)
                                                        setValValidate(false)
                                                    }
                                                } else {
                                                    setVal(date)
                                                    setValValidate(false)
                                                }
                                            } else {
                                                setVal(date)
                                                setValValidate(false)
                                            }
                                        }}

                                    />
                                </label>
                                {
                                    valValidate && <span className="error">{valValidate}</span>
                                }
                            </div>
                        </div>
                        <div className={styles.create_todo_btns}>
                            <button
                                type='submit'
                                className="primary_btn"
                                disabled={isSubmitting}
                            > ذخیره </button>
                        </div>
                    </form>
                )}

            </Formik>
        </div>
    );
};

export default Form;