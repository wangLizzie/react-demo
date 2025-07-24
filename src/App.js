import './App.css';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';

function App() {
    const sendComment = (comment) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now(),
            text: comment,
          });
        }, 3000);
      });
  }
  const sendLike = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })
  }
  return (
    <div className="App">
      <section>
        <h1>乐观更新点赞数</h1>
        <p>
          LikeButton 组件使用 useOptimistic 和 startTransition 实现乐观更新，
          在用户点击按钮后，会立即显示增加的点赞数，
          同时发送请求更新服务器上的点赞数。
        </p>
        <LikeButton initialCount={0} sendLike={sendLike} />
      </section>
      <section>
        <h1>乐观更新评论</h1>
        <p>
          CommentSection 组件使用 useOptimistic 和 startTransition 实现乐观更新，
          在用户点击按钮后，会立即显示增加的评论，
          同时发送请求更新服务器上的评论。
        </p>
        <CommentSection initialComments={[]} sendComment={sendComment} />
      </section>
      <hr />
      <section>
        <h1>TODO: 使用 useDeferredValue 优化列表渲染</h1>
        <p>
          useDeferredValue 可以用于优化列表渲染，
          当列表数据量较大时，可以先渲染一部分数据，
          然后使用 useDeferredValue 优化列表渲染。
        </p>
      </section>
    </div>
  );
}

export default App;
