import { authUser } from "@/utils/serverHelper";
import { redirect } from "next/navigation";
import CategoryModel from "@/models/Category";
import TodoModel from "@/models/Todo";
import Menu from "@/components/models/menu/Menu";
import Todos from "@/components/template/index/Todos";


const Home = async () => {
  const user = await authUser();
  if (!user) {
    return redirect('/signin')
  }
  const categories = await CategoryModel.find({ userId: user._id }, "-__v -userId")
  /* if (categories.length === 0) {
    await CategoryModel.create({
      title: "شخصی",
      userId: user._id,
    })
  } */
  const todos = await TodoModel.find({ userId: user._id }).sort({_id:-1}).populate("catId")
  return (
    <>
      <Menu
        username={JSON.parse(JSON.stringify(user.username))}
        role={JSON.parse(JSON.stringify(user.role))}
      />
      <Todos categories={JSON.parse(JSON.stringify(categories))} todos={JSON.parse(JSON.stringify(todos))} />
    </>
  );
}

export default Home;