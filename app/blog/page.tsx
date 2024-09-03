import { Metadata } from 'next';
import { getAllPostsForHome } from '../../lib/api';
import Container from '../../components/container';
import MoreStories from '../../components/more-stories';

export const metadata: Metadata = {
  title: 'GabenismenTV',
};

export default async function Page() {
  const allPosts = await getAllPostsForHome();
  const morePosts = allPosts ?? [];

  return (
    <div className='mt-20'>
      <Container>
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </div>
  );
}
