"use client"
import React, { useEffect, useState } from 'react';
import styles from './todo.module.css'
import { FaAngleLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const Todo = ({ todo, onClick, isOpen, handleComplete, handleDelete }) => {
    const router = useRouter()
    const [today, setToday] = useState(new Date().getTime())
    const todoDeadline = new Date(todo.deadline).getTime();
    const diff = Math.round((todoDeadline - today) / (1000 * 60 * 60 * 24))
    const handleTodoEdit = (id) => {
        router.push(`./update/${id}`)
    }

    const handleTgComplete = async (id) => {
        handleComplete(id)
    }
    return (
        <>
            <div className={`${styles.todos_list_item} ${isOpen && styles.todo_whit_des} }`}>
                <div
                    onClick={onClick}
                    className={`${styles.todo_header} ${isOpen ? styles.active : ''} ${todo.isComplete ? styles.is_complete_header : ''}`}
                >
                    <div className={styles.todo_title_container}>
                        <span className={todo.isComplete ? styles.completed_square : styles.notComplete_squre}></span>
                        <p className={styles.todo_title}>{todo.title}</p>
                    </div>
                    <div
                        className={styles.show_describer_container}>
                        <span className="icon">
                            <FaAngleLeft className={isOpen ? styles.edit_icon : ''} />
                        </span>
                    </div>
                </div>
                <div className={`${styles.todo_body} ${isOpen && styles.active_body}`}>
                    {todo.des && <p className={styles.todo_des}>
                        <span className={styles.sub_title}>توضیحات : </span>{todo.des}
                    </p>}
                    <p className={styles.todo_cat}>
                        <span className="color" style={{ backgroundColor: todo.catId.color }}></span>
                        <span className={styles.sub_title}>دسته بندی : </span><span >
                            دسته بندی
                        </span>
                    </p>
                    <span className={styles.todo_deadline}>
                        <span className={styles.sub_title}>مهلت اجرا : </span>
                        {diff > 0 ? diff + " روز " : 'امروز'}</span>
                    <div className={styles.todo_actions}>
                        <div
                            className={styles.edit_todo}
                            onClick={() => handleTodoEdit(todo._id)}
                        >
                            ویرایش
                        </div>
                        <div className={styles.todo_complete_container}>
                        وضیعت : 
                            <div className={todo.isComplete ? styles.todo_is_completed : styles.todo_is_not_completed} onClick={() => handleTgComplete(todo._id)}>
                                {todo.isComplete ? 'انجام دادم' : 'انجام ندادم'}</div>
                        </div>
                        <div className={styles.todo_delete} onClick={() => handleDelete(todo._id)}>حذف</div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default Todo;