"use client"
import React, { useState } from 'react';
import styles from './pagination.module.css'
const Pagination = ({ hanldePrev, handleNext, pages ,currentPage,handlePagination , isDisablePrev, isDisableNext }) => {
    return (
        <>
            <div className={styles.paginations}>
                <button
                    className={`${styles.button_pagination} ${isDisablePrev ? styles.disable_btn : ''}`}
                    onClick={hanldePrev}
                    disabled={isDisablePrev}
                >قبلی</button>
                {pages.map((page, index) => <a className={` ${styles.page_item} ${currentPage === index ? styles.current_page : ''} `} key={index} href='#' onClick={() => { handlePagination(index) }}>{index + 1}</a>)}
                <button
                    className={`${styles.button_pagination} ${isDisableNext ? styles.disable_btn : ''}`}
                    onClick={handleNext}
                    disabled={isDisableNext}
                >بعدی</button>
            </div>
        </>
    );
};

export default Pagination;