import {
    CardBody,
    CardFooter,
    CardHeader,
    Card as NextUiCard,
    Spinner,

} from "@nextui-org/react"
import { useLikePostMutation, useUnlikePostMutation } from "../../app/services/likesApi";
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from "../../app/services/postApi";
import { useDeleteCommentMutation } from "../../app/services/commentsApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrent } from "../../features/user/userSlice";
import { User } from "../user";
import { formatToClientDate } from "../../utils/formatToClientDate";
import { RiDeleteBinLine } from "react-icons/ri";
import { Typography } from "../typography";
import { ErrorMessage } from "../error";
import { MetaInfo } from "../meta-info";
import { FcDislike } from "react-icons/fc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { hasErrorField } from "../../utils/hasErrorFieid";

type Props = {
    avatarUrl: string;
    name: string;
    author: { _id: string };
    content: string;
    commentId?: string;
    likesCount?: number;
    commentsCount?: number;
    createdAt: Date;
    id?: string;
    cardFor: 'comment' | 'post' | 'current-post';
    likedByUser?: boolean;
}


export const Card: React.FC<Props> = ({
    avatarUrl = '',
    name = '',
    author,
    content = '',
    commentId = '',
    likesCount = 0,
    commentsCount = 0,
    createdAt,
    id = '',
    cardFor = 'post',
    likedByUser = false
}) => {
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();
    const [deletePost, deletePostStatus] = useDeletePostMutation();
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const currentUser = useAppSelector(selectCurrent);


    const refetchPosts = async () => {
        switch (cardFor) {
            case "post":
                await triggerGetAllPosts().unwrap()
                break
            case "current-post":
                await triggerGetAllPosts().unwrap()
                break
            case "comment":
                await triggerGetPostById(id).unwrap()
                break
            default:
                throw new Error("Invalid cardFor argument")
        }
    };

    const handleDelete = async () => {
        try {
            switch (cardFor) {
                case "post":
                    await deletePost(id).unwrap()
                    await refetchPosts()
                    break
                case "current-post":
                    await deletePost(id).unwrap()
                    navigate('/')
                    break
                case "comment":
                    await deleteComment(commentId).unwrap()
                    await refetchPosts()
                    break
                default:
                    throw new Error("Invalid cardFor argument")
            };

        } catch (err) {
            console.log(err)
            if (hasErrorField(err)) {
                setError(err.data.error)
            } else {
                setError(err as string)
            }
        }
    };

    const handleClick = async () => {
        try {
            likedByUser
                ? await unlikePost(id).unwrap()
                : await likePost({ postId: id }).unwrap()
            await triggerGetPostById(id).unwrap()
            await refetchPosts()
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error)
            } else {
                setError(err as string)
            }
        }
    };

    // Debugging output
    console.log('Current User ID:', currentUser?._id);
    console.log('Author ID:', author._id);

    return (
        <NextUiCard className='mb-5'>
            <CardHeader className='justify-between items-center bg-transparent'>
                <Link to={`/users/${author._id}`}>
                    <User
                        name={name}
                        className="text-small font-semibold leading-none text-default-600"
                        avatarUrl={avatarUrl}
                        description={createdAt && formatToClientDate(createdAt)}
                    />
                </Link>
                {author._id === currentUser?._id && (
                    <div className="cursor-pointer" onClick={handleDelete}>
                        {deletePostStatus.isLoading || deleteCommentStatus.isLoading ?
                            (<Spinner />) :
                            (<RiDeleteBinLine />)
                        }
                    </div>
                )}
            </CardHeader>
            <CardBody className="px-3 py-2 mb-5">
                <Typography
                    className={cardFor === "post" ? "line-clamp-3" : ""} // line-clamp-3 uniquement pour "post"
                >
                    {content}
                </Typography>
            </CardBody>
            {cardFor !== "comment" && (
                <CardFooter className="gap-3">
                    <div className="flex gap-5 items-center">
                        <div onClick={handleClick} >
                            <MetaInfo
                                count={likesCount}
                                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
                            />
                        </div>
                        <Link to={`/posts/${id}`}>
                            <MetaInfo count={commentsCount} Icon={FaRegComment} />
                        </Link>
                    </div>
                    <ErrorMessage error={error} />
                </CardFooter>
            )}
        </NextUiCard>
    )
}
