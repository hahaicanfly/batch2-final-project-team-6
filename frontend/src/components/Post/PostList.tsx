import { Header } from '../../components'

export const PostList = () => {
  const postList = [
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
  ]

  return (
    <>
      <Header />
      <div className="post-list">
        <div className="container">
          {
            postList.map((post, index) => (
              <div className="box post" key={index}>
                <div className="post-info">
                  <h2 className="linear-text">
                    {post.title}{index}
                  </h2>
                  <span>
                    {post.description}
                  </span>
                </div>
                <div className="post-btn">
                  <button className="btn btn-border">
                    閱讀
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}