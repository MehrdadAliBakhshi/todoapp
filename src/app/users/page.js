import Menu from '@/components/models/menu/Menu';
import UserInfo from '@/components/models/menu/UserInfo';
import UsersList from '@/components/template/users/UsersList';
import TodoModel from '@/models/Todo';
import UserModel from '@/models/User';
import { authUser } from '@/utils/serverHelper';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
    const user = await authUser();
    if (!user) {
        return redirect('/signin')
    } else if (user.role !== "ADMIN") {
        return redirect('/todos')
    }
    const todos = await TodoModel.find({})
    const users = await UserModel.find({})
    return (
        <>
            <Menu
                username={JSON.parse(JSON.stringify(user.username))}
                role ={JSON.parse(JSON.stringify(user.role))}
            />
            <UsersList 
            users={JSON.parse(JSON.stringify(users))}
            todos={JSON.parse(JSON.stringify(todos))}
             />

        </>
    );
};

export default page;