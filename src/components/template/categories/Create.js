"use client"
import React, { useEffect, useState } from 'react';
import styles from './create.module.css'
import CatForm from './CatForm';
import CatsList from './CatsList';
import swal from 'sweetalert';

const Create = ({ userId, todos }) => {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(true)

    const getCats = async () => {
        await fetch('./api/category')
            .then(res => res.json())
            .then(data => setCategories(data))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getCats()
    }, [])
    const catTodos = (id) => {
        const catTodos = todos.filter(todo => todo.catId === id)
        return catTodos;
    }


    const deleteCategory = async (id) => {
        const haveTodos = catTodos(id)
        if (!haveTodos.length > 0) {
            swal({
                title: 'از حذف دسته بندی مطمئن هستید؟',
                icon: "warning",
                buttons: ["خیر", "بله"]
            }).then(async (result) => {
                if (result) {
                    const res = await fetch('./api/category', {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id })
                    })
                    if (res.status === 200) {
                        getCats()
                    }
                }

            })
        } else {
            swal({
                title: "برای این دسته بندی فعالیت تعریف شده",
                icon: "warning",
                button: "متوجه شدم"
            })
        }
    }
    return (
        <div className={styles.create_todo_container}>
            <CatForm
                getCats={getCats}
                userId={userId}
                catsCount={categories.length}
            />
            <CatsList
                categories={categories}
                loading={loading}
                deleteCategory={deleteCategory}
                todos={todos} />
        </div>
    );
};

export default Create;