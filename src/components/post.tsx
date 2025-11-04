import type { IPost as Interface } from "../pages/main";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

interface Post {
    post: Interface;
}

export const Post = (props: Post) => {
    const {post} = props;
    const likesRef = collection(db, "posts", post.id, "likes");
    const addLike = async () => {
        await addDoc(likesRef, {
            userId: post.userId, 
            postId: post.id
        });
    }
    return (
        <div key={props.post.id} className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{props.post.title}</h2>
          <p className="text-gray-600 mb-4">{props.post.description}</p>
          <span className="text-sm text-gray-500">Posted by: {props.post.username}</span><br />
          <button>&#128077;</button>
        </div>
    );
}