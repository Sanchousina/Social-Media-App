import { addDoc, getDocs, deleteDoc, collection, query, where, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { IPost } from "./Main"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface IProps {
  post: IPost
}

interface ILike {
  user_id: string
}

export const Post = ({post}: IProps) => {
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<ILike[] | null>(null)

  const likesRef = collection(db, 'likes');
  
  const getLikes = async () => {
    const likesDocQuery = query(likesRef, where("post_id", "==", post.id));
    const likesDocs = await getDocs(likesDocQuery);
    setLikes(likesDocs.docs.map(doc => ({user_id: doc.data().user_id})))
  }

  const likePost = async () => {
    await addDoc(likesRef, {
     user_id: user?.uid,
     post_id: post.id
    })
  }

  const unlikePost = async () => {
    const likeToDeleteQuery = query(
      likesRef, 
      where("post_id", "==", post.id), 
      where("user_id", "==", user?.uid)
    );
    const likeToDeleteDoc = (await getDocs(likeToDeleteQuery)).docs[0];
    const likeToDelete = doc(db, "likes", likeToDeleteDoc.id);

    await deleteDoc(likeToDelete);
  }

  const hasUserLiked = likes?.find(el => el.user_id === user?.uid);

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
        <button 
          onClick={() => {hasUserLiked ? unlikePost() : likePost(); getLikes()}}> 
          { hasUserLiked ? <>&#128078;</> : <>&#128077;</> }
        </button>
        <p>Likes: {likes?.length}</p>
      </div>
    </div>
  )
}