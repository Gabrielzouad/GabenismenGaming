import Link from 'next/link';
import Avatar from './avatar';
import DateComponent from './date';
import CoverImage from './cover-image';

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div className='mb-8 md:mb-16'>
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className='md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28'>
        <div>
          <h3 className='mb-4 text-4xl lg:text-6xl leading-tight text-white'>
            <Link href={`/posts/${slug}`} className='hover:underline'>
              {title}
            </Link>
          </h3>
          <div className='mb-4 md:mb-0 text-lg text-white'>
            <DateComponent dateString={date} />
          </div>
        </div>
        <div>
          <p className='text-lg leading-relaxed mb-4 text-white'></p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}
