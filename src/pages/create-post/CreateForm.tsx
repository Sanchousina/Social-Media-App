import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver} from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

interface ICreatePostForm {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description")
  })

  const { register, handleSubmit, formState: { errors }} = useForm<ICreatePostForm>({
    resolver: yupResolver(schema)
  })

  const postsRef = collection(db, 'posts');

  const onSubmit = async (data: ICreatePostForm) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      user_id: user?.uid
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Title..." {...register('title')}/>
      <p style={{color: "red"}}>{errors.title?.message}</p>
      <textarea placeholder="Description" {...register('description')}/>
      <p style={{color: "red"}}>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  )
}