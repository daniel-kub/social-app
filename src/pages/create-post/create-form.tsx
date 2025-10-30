import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface IFormInput {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: IFormInput) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      id: user?.uid,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onCreatePost)}
      className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
        Create a Post
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Title
        </label>
        <input
          placeholder="Enter a title..."
          {...register("title")}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Description
        </label>
        <textarea
          placeholder="Enter a description..."
          {...register("description")}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 resize-none"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Post
      </button>
    </form>
  );
};
