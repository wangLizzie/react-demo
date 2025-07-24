 import { useState, useOptimistic, startTransition } from 'react'

 function LikeButton({ initialCount, sendLike }) {
    const [count, setCount] = useState(initialCount)
    const [error, setError] = useState(null)

    // 用乐观更新函数为 count 添加变化量
    const [optimisticCount, addOptimisticLike] = useOptimistic(
      count,
      (current, delta) => current + delta,
    )

    function handleLike() {
      // 乐观地增加点赞数
      addOptimisticLike(1)
      setError(null)

      // 实际发送请求
      startTransition(async () => {
          try {
              await sendLike()
              setCount((c) => c + 1)
          } catch (e) {
              setError('点赞失败，请稍后重试')
          }
      })
    }

    return (
      <div>
        <button onClick={handleLike}>👍 {optimisticCount}</button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    )
 }

 export default LikeButton;