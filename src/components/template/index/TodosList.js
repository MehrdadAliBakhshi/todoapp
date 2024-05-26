"use client"
import React, { useContext, useEffect, useState } from 'react';
import styles from './todosList.module.css'
import Todo from '@/components/models/todo/Todo';
import Link from 'next/link';
import Pagination from './Pagination';

const TodosList = ({ todos, handleComplete, handleDelete, categories, showComplete }) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [activeIndex, setActiveIndex] = useState(null)
    const [isDisablePrev, setIsDisablePrev] = useState(false)
    const [isDisableNext, setIsDisableNext] = useState(false)
    useEffect(() => {
        setPageCount(Math.ceil(todos.length / perPageNum))
    }, [])

    const perPageNum = 5;

    /**
     * change next and prev btn to disable
     * base on current page
     */
    useEffect(() => {
        if (currentPage === 0) {
            setIsDisablePrev(true)
            setIsDisableNext(false)
        } else if (currentPage === pageCount - 1) {
            setIsDisableNext(true)
            setIsDisablePrev(false)
        } else {
            setIsDisableNext(false)
            setIsDisablePrev(false)
        }
    }, [currentPage])

    /**
     * 
     */


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
        setCurrentPage(prev => prev - 1)
    }
    const handleNext = () => {
        setCurrentPage(prev => prev + 1)
    }

    return (
        <>
            <div className={styles.all_todos_list_container}>
                <ul className={styles.all_todos_list}>
                    {todos.length ? (
                        !showComplete ? (todos.slice(currentPage * perPageNum, (currentPage * perPageNum) + perPageNum).map((todo, index) =>
                            <Todo
                                key={todo._id}
                                todo={todo}
                                handleComplete={handleComplete}
                                isOpen={activeIndex === index}
                                catTitle={(categories.filter(cat => cat._id === todo.catId))}
                                onClick={() => handleItemClick(index)}
                                handleDelete={handleDelete}
                            />)) : (todos.slice(currentPage * perPageNum, (currentPage * perPageNum) + perPageNum).filter(todo => todo.isComplete === showComplete).map((todo, index) =>
                                <Todo
                                    key={todo._id}
                                    todo={todo}
                                    handleComplete={handleComplete}
                                    isOpen={activeIndex === index}
                                    catTitle={(categories.filter(cat => cat._id === todo.catId))}
                                    onClick={() => handleItemClick(index)}
                                    handleDelete={handleDelete}
                                />))
                    ) : (<li className={styles.todo_not_found}>متاسفانه فعالیتی پیدا نشد</li>)}
                </ul>
                <Pagination
                    hanldePrev={hanldePrev}
                    handleNext={handleNext}
                    pages={pages}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    isDisablePrev={isDisablePrev}
                    isDisableNext={isDisableNext}
                />
            </div >
        </>
    );
};

export default TodosList;