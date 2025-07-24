import { useState, useOptimistic, startTransition } from 'react'

function CommentSection({ initialComments, sendComment }) {
  const [comments, setComments] = useState(initialComments)

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newComment) => [
      { ...newComment, optimistic: true },
      ...currentComments,
    ],
  )

  async function handleAddComment(text) {
    const tempComment = {
      id: Date.now(),
      text,
      optimistic: true,
    }

    // 乐观更新评论内容
    addOptimisticComment(tempComment)

    // 实际发送请求
    startTransition(async () => {
      try {
        const savedComment = await sendComment(text)
        // 更新评论内容
        setComments((prev) => [
          { ...savedComment },
          ...prev.filter((c) => c.id !== tempComment.id),
        ])
      } catch (e) {
        // 如果发送失败，则删除乐观更新后的评论内容
        setComments((prev) =>
          prev.filter((c) => c.id !== tempComment.id)
        )
        alert('评论发送失败，请重试')
      }
    })
  }

  return (
    <div>
      <form
        action={async (formData) => {
          handleAddComment(formData.get('text'))
        }}
      >
        <input name="text" placeholder="写点什么..." />
        <button type="submit">添加</button>
      </form>
      <ul>
        {optimisticComments.map((comment) => (
          <li
            key={comment.id}
            className={comment.optimistic ? 'text-gray-500' : ''}
          >
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentSection