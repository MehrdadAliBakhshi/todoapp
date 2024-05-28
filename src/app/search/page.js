import Menu from '@/components/models/menu/Menu';
import Search from '@/components/template/search/Search';
import CategoryModel from '@/models/Category';
import { authUser } from '@/utils/serverHelper';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
    const user = await authUser()
    if (!user) {
        return redirect('/signin')
    }
    const categories = await CategoryModel.find({ userId: user._id },"_id title")
    return (
        <>
            <Menu
                username={JSON.parse(JSON.stringify(user.username))}
                role={JSON.parse(JSON.stringify(user.role))}
            />
            <Search categories={JSON.parse(JSON.stringify(categories))} />
        </>
    );
};

export default page;