import React from 'react';
import styles from './search.module.css'
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Search = () => {
    return (
        <div className={styles.search_container}>
            <input type="text" className={styles.search_input} placeholder="جست و جو کنید" />
            <span className="icon">
                <FaMagnifyingGlass />
            </span>
        </div>
    );
};

export default Search;