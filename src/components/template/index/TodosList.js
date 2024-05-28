"use client"
import React, { useState } from 'react';
import styles from './todosList.module.css'
import Todo from '@/components/models/todo/Todo';
import Pagination from './Pagination';

const TodosList = ({
    todos,
    handleComplete,
    handleDelete,
    categories,
    pageCount,
    perPageNum,
    isDisableNext,
    isDisablePrev,
    currentPage,
    setCurrentPage
}) => {

    const [activeIndex, setActiveIndex] = useState(null)
    const pages = new Array(pageCount).fill(0)
    /**
     * 
     */
    const handlePagination = (index) => {
        if (index === currentPage) {
            return false
        }
        if (index >= 0 && index < pageCount) {
            setCurrentPage(index)
        }
    }

    /**
     * check whick todo copmponent clicked base on index of component
     * @param {*} index 
     */
    const handleItemClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
    }
    /**
     * 
     */
    const hanldePrev = () => {
        if (currentPage === 0 && pages.length === 1) {
            setCurrentPage(0)
        }
        setCurrentPage(prev => prev - 1)
    }
    const handleNext = () => {
        if (pages.length < 1 && pages.length === currentPage + 1) {
            setCurrentPage(page.length)
        }
        setCurrentPage(prev => prev + 1)
    }

    return (
        <>
            <div className={styles.all_todos_list_container}>
                <ul className={styles.all_todos_list}>
                    {todos?.length ?
                        (todos.slice(currentPage * perPageNum, (currentPage * perPageNum) + perPageNum).map((todo, index) =>
                            <Todo
                                key={todo._id}
                                todo={todo}
                                handleComplete={handleComplete}
                                isOpen={activeIndex === index}
                                catTitle={(categories.filter(cat => cat._id === todo.catId))}
                                onClick={() => handleItemClick(index)}
                                handleDelete={handleDelete}
                            />
                        ))
                        : (<li className={styles.todo_not_found}>متاسفانه فعالیتی پیدا نشد</li>)}
                </ul>
                <Pagination
                    hanldePrev={hanldePrev}
                    handleNext={handleNext}
                    pages={pages}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    isDisableNext={isDisableNext}
                    isDisablePrev={isDisablePrev}

                />
            </div >
        </>
    );
};

export default TodosList;