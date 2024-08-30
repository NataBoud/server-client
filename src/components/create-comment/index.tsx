import { Button, Textarea } from "@nextui-org/react"
import { IoMdCreate } from "react-icons/io"
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "../error"
import { useCreateCommentMutation } from "../../app/services/commentsApi"
import { useParams } from "react-router-dom"
import { useLazyGetPostByIdQuery } from "../../app/services/postApi"


export const CreateComment = () => {
    // extrait l'id de la route actuelle, qui est le id du post affiché 
    const { id } = useParams<{ id: string }>()
    const [createComment] = useCreateCommentMutation()
    const [getPostById] = useLazyGetPostByIdQuery();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm()

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (id) {
                await createComment({ content: data.comment, postId: id }).unwrap()
                await getPostById(id).unwrap()
                setValue("comment", "")
            }
        } catch (error) {
            console.log("err", error)
        }
    })

    const error = errors?.comment?.message as string

    return (
        <form className="flex-grow" onSubmit={onSubmit}>
            <Controller
                name="comment"
                control={control}
                defaultValue=""
                rules={{
                    required: 'required field',
                }}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        labelPlacement="outside"
                        placeholder="Write your comment"
                        className="mb-5"
                    />
                )}
            />
            {errors && <ErrorMessage error={error} />}
            <Button
                color="primary"
                className="flex-end"
                endContent={<IoMdCreate />}
                type="submit"
            >
                Send
            </Button>
        </form>
    )
}