import { getDocs, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './Post';
import { useAuthState } from 'react-firebase-hooks/auth';

export interface IPost {
  id: string,
  title: string,
  description: string,
  user_id: string,
  username: string
}

export const Main = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostsList] = useState<IPost[] | null>(null);

  const postsRef = collection(db, 'posts');

  const getPosts = async () => {
    try {
      const data = await getDocs(postsRef);
      const docs = data.docs.map(doc => ({...doc.data(), id: doc.id})) as IPost[];
      setPostsList(docs);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    user && getPosts();
  }, [])

  return (
    <div className='main'>
      {!user && <h1>Login to see posts</h1>}
      {user && postsList?.map(post => {
        return <Post  post={post}/>
      })}
    </div>
  )
}