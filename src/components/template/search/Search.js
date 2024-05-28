"use client"
import React, { useState } from 'react';
import styles from './search.module.css'
import { useSearchParams } from 'next/navigation';
import Todo from '@/components/models/todo/Todo';
import { ToastContainer, toast } from 'react-toastify';
import { FaAngleLeft } from 'react-icons/fa6';
import SearchTodo from './SearchTodo';

const Search = ({ categories }) => {
    const [loading, setLoading] = useState(true)
    const [activeIndex, setActiveIndex] = useState(null)
    const [todos, setTodos] = useState([])
    const [cats, setCats] = useState([])
    const searchParams = useSearchParams()
    const search = searchParams.get('s')
    const getTodos = async () => {
        await fetch('./api/todo')
            .then(res => res.json())
            .then(data => {
                const searchTodos = data.filter(todo => todo.title.toLowerCase().includes(search))
                setTodos([...searchTodos])
            })
            .finally(() => setLoading(false))
    }
    /* const getCats = async () => {
        await fetch('./api/category')
            .then(res => res.json())
            .then(data => {
                setCats([...data])
            })
    } */
    useState(() => {
        getTodos()
        /* getCats() */
    }, [])

    const handleItemClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
    }
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

    return (
        <>
            <div className={styles.container}>
                <h3 className='sub_title'> نتایج جست و جو :</h3>
                <div className={styles.todos_container} >
                    {loading ? <span>loading ... </span>
                        : todos && todos.map((todo, index) => <SearchTodo
                            key={todo._id}
                            todo={todo}
                            handleComplete={handleComplete}
                            isOpen={activeIndex === index}
                            onClick={() => handleItemClick(index)}
                            handleDelete={handleDelete}
                            category={todo.catId.title}

                        />)
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Search;