import React from 'react';
import styles from './cat.module.css'

const Cat = ({cat , index , todoCount}) => {
    return (
        <>
            <tr className={styles.data} key={index}>
                <td>{index + 1}</td>
                <td>{cat.title}</td>
                <td><span className={styles.cat_color} style={{ backgroundColor: cat.color }}></span></td>
                <td>
                    {todoCount}
                </td>
                <td>
                    <div className={styles.btns}>
                        <a
                            href='#'
                            className={styles.eidt}
                            onClick={() => editCat(id)}
                        >ویرایش</a>
                        <a
                            href='#'
                            className={styles.delete} onClick={() => deleteCat(cat._id)}
                        
                        >
                            حذف

                        </a>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Cat;