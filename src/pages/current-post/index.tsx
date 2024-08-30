import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postApi";
import { Card } from "../../components/card";
import { GoBack } from "../../components/go-back";
import { CreateComment } from "../../components/create-comment";


export const CurrentPost = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params?.id ?? '')

  if (!data) {
    return <h2>The post doesn't exist</h2>
  }

  const { content, _id, author, comments, likes, likedByUser, createdAt } = data;

  console.log('Comments Data:', data.comments);
  return (
    <>
      <GoBack />
      <Card
        cardFor='current-post'
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        author={author}
        id={_id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map((comment) => (
            <Card
              cardFor="comment"
              key={comment._id}
              avatarUrl={comment.user.avatarUrl ?? ""}
              content={comment.content}
              name={comment.user.name ?? ""}
              author={{ _id: comment.user._id }}
              commentId={comment._id}
              id={_id}
              createdAt={comment.createdAt} 
            />
          ))
          : null}
      </div>

    </>
  )
}
