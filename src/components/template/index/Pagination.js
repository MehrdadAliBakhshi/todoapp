"use client"
import React, { useEffect, useState } from 'react';
import styles from './pagination.module.css'
const Pagination = ({
    hanldePrev,
    handleNext,
    pages,
    currentPage,
    handlePagination,
    isDisableNext,
    isDisablePrev }) => {

    const next = () => {
        if (currentPage < pages.length - 1 && pages.length > 1) {
            handleNext()
        }
    }
    const prev = () => {
        if (currentPage !== 0 && pages.length > 1) {
            hanldePrev()
        }
    }
    return (
        <>
            <div className={styles.paginations}>

                <a
                    href='#'
                    className={`${styles.button_pagination} ${isDisablePrev ? styles.disable_btn : ''}`}
                    onClick={prev}
                    disabled={currentPage === 0 || pages.length <= 1}
                >قبلی</a>
                {pages.map((page, index) => <a className={` ${styles.page_item} ${currentPage === index ? styles.current_page : ''} `} key={index} href='#' onClick={() => { handlePagination(index) }}>{index + 1}</a>)}

                <a
                    href='#'
                    className={`${styles.button_pagination} ${isDisableNext ? styles.disable_btn : ''}`}
                    onClick={next}
                    disabled={pages.length < 1 || pages.length === currentPage + 1}
                >بعدی</a>

            </div>
        </>
    );
};

export default Pagination;