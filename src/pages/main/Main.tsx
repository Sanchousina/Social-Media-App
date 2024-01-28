import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './Post';

export interface IPost {
  id: string,
  title: string,
  description: string,
  user_id: string,
  username: string
}

export const Main = () => {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);

  const postsRef = collection(db, 'posts');

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    const docs = data.docs.map(doc => ({...doc.data(), id: doc.id})) as IPost[];
    setPostsList(docs);
    console.log(docs);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className='main'>
      {postsList?.map(post => {
        return <Post  post={post}/>
      })}
    </div>
  )
}