import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { IPost } from "./Main"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface IProps {
  post: IPost
}

export const Post = ({post}: IProps) => {
  const [user] = useAuthState(auth);

  const [likesAmount, setLikesAmount] = useState<number>(0)

  const likesRef = collection(db, 'likes');

  const likesDocQuery = query(likesRef, where("post_id", "==", post.id));

  const getLikes = async () => {
    const likesDocs = await getDocs(likesDocQuery);
    setLikesAmount(likesDocs.docs.length)
  }

  const likePost = async () => {
    await addDoc(likesRef, {
     user_id: user?.uid,
     post_id: post.id
    })
  }

  useEffect(() => {
    getLikes();
  }, [])

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={() => {likePost(); getLikes()}}> &#128077; </button>
        <p>Likes: {likesAmount}</p>
      </div>
    </div>
  )
}