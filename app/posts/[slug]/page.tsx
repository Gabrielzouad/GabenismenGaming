// app/post/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostAndMorePosts } from '../../../lib/api';
import Container from '../../../components/container';
import MoreStories from '../../../components/more-stories';
import PostBody from '../../../components/post-body';
import PostHeader from '../../../components/post-header';
import SectionSeparator from '../../../components/section-separator';

interface PostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const { slug } = params;
  const data = await getPostAndMorePosts(slug);
  return {
    title: data?.post?.title
      ? `${data.post.title} | GabenismenTV Blog post`
      : 'GabenismenTV Blog post',
    description: data?.post?.excerpt || '',
    openGraph: {
      images: [data?.post?.coverImage?.url || ''],
    },
  };
}

export default async function Post({ params }: PostProps) {
  const { slug } = params;
  const data = await getPostAndMorePosts(slug);

  const post = data?.post ?? null;
  const morePosts = data?.morePosts ?? [];

  if (!post) {
    return notFound(); // Renders a 404 page if the post is not found
  }

  return (
    <div>
      <Container>
        <article>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={post.content} />
          <SectionSeparator />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </article>
      </Container>
    </div>
  );
}
