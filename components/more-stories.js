import PostPreview from "../components/post-preview"

export default function MoreStories({ posts }) {
  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 pb-32 text-white'>
        {posts.map((post) => (
          <PostPreview key={post.slug} title={post.title} coverImage={post.coverImage} date={post.date} author={post.author} slug={post.slug} />
        ))}
      </div>
    </section>
  )
}
