"use client"
import React, { useEffect, useState } from 'react';
import TodosList from './TodosList';
import styles from './todos.module.css'
import { ToastContainer, toast } from 'react-toastify';
import TodoLoad from '@/components/models/todoLoadin/TodoLoad';
import Link from 'next/link';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';

const Todos = ({ categories }) => {
    const [allTodos, setAllTodos] = useState();
    const [showComplete, setShowComplete] = useState(false)
    const [loading, setLoading] = useState(true)
    const [pageCount, setPageCount] = useState(0)
    const [isDisableNext, setIsDisableNext] = useState(false)
    const [isDisablePrev, setIsDisablePrev] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [changePageCount, setChangePageCount] = useState(false)

    const router = useRouter()
    const perPageNum = 5;

    console.log(currentPage);
    console.log(changePageCount);
    const fetchTodos = async () => {
        await fetch('./api/todo')
            .then(res => res.json())
            .then(data => {
                setAllTodos([...data])
            })
            .finally(() => {
                setLoading(false)

            })
    }
    const countPage = () => {
        if (allTodos) {
            if (allTodos.length > 0) {
                setPageCount(Math.ceil(allTodos?.length / perPageNum))
            } else {
                setPageCount(0)
            }
        }
    }
    useEffect(() => {
        if (currentPage === 0) {
            setIsDisablePrev(true)
            setIsDisableNext(false)

        }
        if (currentPage === pageCount - 1) {
            setIsDisableNext(true)
            setIsDisablePrev(false)
        }
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(pageCount - 1)
    }, [changePageCount , pageCount])
    useEffect(() => {
        fetchTodos()
    }, [])
    useEffect(() => {
        countPage()
    }, [allTodos])
    /**
     * toggle isComplete of todo by id and refresh page
     * @param {*} id 
     */

    const handleComplete = async (id) => {
        const res = await fetch('./api/todo/updateComplete', {
            method: "PUT",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ id })
        })
        if (res.status === 200) {
            toast.success("فعالیت با موفقیت بروز شد", {
                theme: 'colored',
                autoClose: 1000,
                onClose: () => {
                    getTodos()
                }
            })
        } else {
            toast.warning("متاسفانه مشکلی پیش اومد", {
                autoClose: 1000,
            })
        }
    }

    /**
     * delete todo
     */
    const handleDelete = async (id) => {
        swal({
            title: "از حذف فعالیت اطمینان دارید؟",
            icon: "warning",
            buttons: ["خیر", "بله"]
        }).then(async (result) => {
            if (result) {
                const res = await fetch('./api/todo', {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                })
                if (res.status === 200) {
                    fetchTodos()
                    countPage()
                    router.push('/')
                    setChangePageCount(prev => !prev)
                }
            }
        })

    }
    return (
        <>
            <div className={styles.all_todos}>

                <h1 className="title">فعــــــــــــالیــــــــت ها </h1>
                {/* <TodoFilters categories={categories} getTodos={getTodos} setShowComplete={setShowComplete} /> */}
                {loading ?
                    <div className={styles.all_load_list_container}>
                        <ul className={styles.all_loads_list}>
                            {
                                new Array(5).fill(0).map((todo, index) => (<TodoLoad key={index} />))
                            }
                        </ul>
                    </div>
                    :
                    allTodos.length > 0 ?
                        <TodosList
                            todos={allTodos}
                            categories={categories}
                            showComplete={showComplete}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                            pageCount={pageCount}
                            perPageNum={perPageNum}
                            isDisableNext={isDisableNext}
                            isDisablePrev={isDisablePrev}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        :
                        <div className={styles.todos_not_created}>
                            <h2>شما هنوز فعالیتی تعریف نکرده اید</h2>
                            <Link className='primary_btn' href="/addTodo">تعریف فعالیت جدید</Link>
                        </div>
                }
            </div>
            <ToastContainer />
        </>
    );
}
export default Todos;