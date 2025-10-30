import { getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { useState } from "react";

export const Main = () => {
  const postsRef = collection(db, "posts");
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
    const data = await getDocs(postsRef);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }




  fetchPosts();

    

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Witamy na stronie głównej 👋
      </h1>
      <p className="text-gray-600 text-lg max-w-md">
        
      </p>
    </div>
  );
};
