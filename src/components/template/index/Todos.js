"use client"
import React, { useEffect, useState } from 'react';
import TodosList from './TodosList';
import styles from './todos.module.css'
import { ToastContainer, toast } from 'react-toastify';
import TodoLoad from '@/components/models/todoLoadin/TodoLoad';
import Link from 'next/link';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import Filter from './Filter';


const Todos = ({ categories, todos }) => {
    const router = useRouter()

    const [allTodos, setAllTodos] = useState();
    const [loading, setLoading] = useState(true)
    const [pageCount, setPageCount] = useState(0)
    const [isDisableNext, setIsDisableNext] = useState(false)
    const [isDisablePrev, setIsDisablePrev] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [catId, setCatId] = useState("-1")
    const [filterTodos, setFilterTodos] = useState(allTodos)
    const [resetCheckBox, setResetCheckBox] = useState(false)
    const [today, setToday] = useState(new Date())
    const perPageNum = 5;

    const getTodos = async () => {
        const res = await fetch('./api/todo')
        const data = await res.json()
        const sortBydeadline = data.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
        setAllTodos(sortBydeadline)

    }


    useEffect(() => {
        setAllTodos([...todos])
    }, [])
    useEffect(() => {
        if (allTodos?.length > 0) {
            setLoading(false)
            if (catId !== "-1" && catId) {
                const fillTodos = allTodos.filter(todo => todo.catId._id === String(catId))
                setFilterTodos([...fillTodos])
            } else {
                setFilterTodos(allTodos)
            }
        }else if(allTodos){
            setLoading(false)
        }
        setCurrentPage(0)
    }, [catId, allTodos])


/*     const fetchLostTodos = async () => {

        await fetch('./api/todo')
            .then(res => res.json())
            .then(data => {
                const lost = data.filter(todo => new Date(todo.deadline) < today)
                setLostTodos([...lost])
            })
    } */


    const countPage = () => {
        if (filterTodos) {
            if (filterTodos.length > 0) {
                setPageCount(Math.ceil(filterTodos?.length / perPageNum))
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
        if (currentPage >= pageCount - 1) {
            setIsDisableNext(true)
            setIsDisablePrev(false)
        }
    }, [currentPage])

    useEffect(() => {

    }, [])

    useEffect(() => {
        countPage()
    }, [filterTodos])



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
                    setResetCheckBox(true)
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
                    countPage(0)
                    getTodos()
                }
            }
        })

    }

    const handleshowComplete = (checked) => {
        if (checked) {
            if (allTodos?.length > 0) {
                const fillTodos = filterTodos.filter(todo => todo.isComplete === true)
                setFilterTodos([...fillTodos])
            }
            setCurrentPage(0)
        } else {
            setFilterTodos(allTodos)
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.all_todos}>
                <h1 className="title">فعــــــــــــالیــــــــت ها </h1>
                <Filter
                    categories={categories}
                    setCatId={setCatId}
                    handleshowComplete={handleshowComplete}
                    resetCheckBox={resetCheckBox}
                />
                {loading ?
                    <div className={styles.all_load_list_container}>
                        <ul className={styles.all_loads_list}>
                            {
                                new Array(5).fill(0).map((todo, index) => (<TodoLoad key={index} />))
                            }
                        </ul>
                    </div>
                    :
                    allTodos?.length ?
                        <TodosList
                            todos={filterTodos}
                            categories={categories}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                            pageCount={pageCount}
                            perPageNum={perPageNum}
                            isDisableNext={isDisableNext}
                            isDisablePrev={isDisablePrev}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            catId={catId}
                        />
                        :
                        <div className={styles.todos_not_created}>
                            <h2>شما هنوز فعالیتی تعریف نکرده اید</h2>
                            <Link className='primary_btn' href="/addTodo">تعریف فعالیت جدید</Link>
                        </div>
                }
            </div>
            <ToastContainer />
        </div>
    );
}
export default Todos;