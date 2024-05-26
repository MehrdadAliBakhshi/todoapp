import React from 'react';
import styles from './categoryListItem.module.css'

const CategoryListItem = ({ category, children }) => {
    return (
        <li className={styles.List_info_item}>
            <div href="#" className={styles.list_info_item_link}>
                <span>
                    <span className="color" style={{ backgroundColor: category.color }}>
                    </span>
                    {category.title}
                </span>
                {children}
            </div>
        </li>
    );
};

export default CategoryListItem;