import { getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import {Post} from "../components/post";
export interface IPost {
    id: string;
    title: string;
    description: string;
    username: string;
    userId: string;
  }
export const Main = () => {
  const postsRef = collection(db, "posts");
  const [posts, setPosts] = useState<IPost [] | null>(null);

  const getPosts = async () =>{
    const data = await getDocs(postsRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]);
  }
  

  useEffect(() => {
    getPosts();
  }, []);    

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      {posts?.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  );
};
