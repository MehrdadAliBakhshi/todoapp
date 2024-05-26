import React from 'react';
import styles from './TodoLoad.module.css'
import { FaAngleLeft } from 'react-icons/fa6';

const TodoLoad = () => {

    return (
        <>
            <div className={styles.todos_load_item}>
                <div
                    className={styles.load_header}
                >
                    <div className={styles.load_title_container}>
                        <span className={styles.completed_square}></span>
                    </div>
                    <div
                        className={styles.show_describer_container}>
                        <span className="icon">
                            <FaAngleLeft />
                        </span>
                    </div>
                </div>
            </div >

        </>
    );
};

export default TodoLoad;