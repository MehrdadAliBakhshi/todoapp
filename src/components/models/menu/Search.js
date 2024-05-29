"use client"
import React, { useEffect, useState } from 'react';
import styles from './search.module.css'
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
    const router = useRouter()
    const [searchVal, setSearchVal] = useState('')
    const searchParams = useSearchParams()
    const search = searchParams.get('s')

    const handleRedirect = (e) => {
        e.preventDefault()
        if (searchVal) {
            router.push(`/search/?s=${searchVal}`)
        }
    }

    useEffect(() => {
        if(search){
            setSearchVal(search)
        }
    })
    return (
        < >
            <form className={styles.search_container} onSubmit={handleRedirect}>
                <input type="text" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} className={styles.search_input} placeholder="جست و جو کنید" />
                <span className="icon" >
                    <FaMagnifyingGlass />
                </span>
            </form>
        </>
    );
};

export default Search;