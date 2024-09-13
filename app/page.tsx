import React from 'react';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import { getAllPostsForHome } from '../lib/api';
import Intro from '../components/Intro';
import MatchCountdown from '../components/MatchCountdown';

export default async function HomePage() {
  // Fetch data server-side directly in the component
  const preview = false; // Set this according to your logic
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <div className='min-h-screen'>
        <Container>
          <Intro />
          <MatchCountdown />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </div>
    </>
  );
}
