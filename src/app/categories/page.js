import Menu from '@/components/models/menu/Menu';
import Create from '@/components/template/categories/Create';
import TodoModel from '@/models/Todo';
import { authUser } from '@/utils/serverHelper';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
    const user = await authUser();
    if (!user) {
        return redirect('/signin')
    }
    const todos = await TodoModel.find({userId:user._id},"catId")
    return (
        <>
            <Menu
                username={JSON.parse(JSON.stringify(user.username))}
                role={JSON.parse(JSON.stringify(user.role))}
            />
            <Create 
            userId={JSON.parse(JSON.stringify(user._id))} 
            todos = {JSON.parse(JSON.stringify(todos))}
             />
        </>
    );
};

export default page;