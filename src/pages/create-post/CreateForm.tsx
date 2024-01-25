import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver} from "@hookform/resolvers/yup"

interface ICreatePostForm {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description")
  })

  const { register, handleSubmit, formState: { errors }} = useForm<ICreatePostForm>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: ICreatePostForm) => {
    console.log(data);
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