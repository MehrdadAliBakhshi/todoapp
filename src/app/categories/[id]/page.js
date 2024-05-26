import Menu from '@/components/models/menu/Menu';
import EditCat from '@/components/template/categories/EditCat';
import CategoryModel from '@/models/Category';
import { authUser } from '@/utils/serverHelper';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({ params }) => {
    const user = await authUser()
    if(!user){
        return redirect('/')
    }
    const { id } = params;
    const category = await CategoryModel.findOne({ _id: id }, "-__v")
    return (
        <>
            <Menu username={JSON.parse(JSON.stringify(user.username)) } />
            <EditCat category={JSON.parse(JSON.stringify(category))} />
        </>
    );
};

export default page;