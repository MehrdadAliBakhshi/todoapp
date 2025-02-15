import Menu from '@/components/models/menu/Menu';
import Todo from '@/components/template/addTodo/Todo';
import { authUser } from '@/utils/serverHelper';
import { redirect } from 'next/navigation';
import React from 'react';

const AddTodo = async () => {
    const user = await authUser()
    if (!user) {
        return redirect('/signin')
    }
    return (
        <>
            <Menu
                username={JSON.parse(JSON.stringify(user.username))}
                role={JSON.parse(JSON.stringify(user.role))}
            />
            <Todo user={JSON.parse(JSON.stringify(user._id))} />
        </>
    );
};

export default AddTodo;