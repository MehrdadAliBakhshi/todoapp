import Menu from '@/components/models/menu/Menu';
import Form from '@/components/template/update/Form';
import CategoryModel from '@/models/Category';
import TodoModel from '@/models/Todo';
import { authUser } from '@/utils/serverHelper';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({ params }) => {
    const { id } = params;
    const user = await authUser();
    const categories = await CategoryModel.find({ userId: user._id })
    const todo = await TodoModel.findOne({ _id: id }, "-__v")
    if (!user) {
        return redirect('/')
    }
    return (
        <>
            <Menu
                username={JSON.parse(JSON.stringify(user.username))}
                role={JSON.parse(JSON.stringify(user.role))}
            />
            <Form
                categories={JSON.parse(JSON.stringify(categories))}
                userId={JSON.parse(JSON.stringify(user._id))}
                todo={JSON.parse(JSON.stringify(todo))}
            />
        </>
    );
};

export default page;