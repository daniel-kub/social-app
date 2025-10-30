import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection  } from "firebase/firestore";
import { db } from "../../config/firebase";
interface IFormInput {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description"),
  });
  const {register,handleSubmit, formState:{errors}} = useForm({
    resolver :yupResolver(schema)
})

const onCreatePost = (data:IFormInput) =>{
    console.log(data);
}
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")}/>
      <p>{errors.title?.message}</p>
      <input placeholder="Description..." {...register("description")}/>
      <p>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};