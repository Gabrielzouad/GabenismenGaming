import Container from './container';

export default function Footer() {
  return (
    <footer className='bg-accent-1 border-t border-accent-2 bottom-0 '>
      <Container>
        <div className='py-20 flex flex-col lg:flex-row items-center b-0'>
          <h3 className='text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2 dark:text-black'>
            Gabenismen Gaming AS
          </h3>
          <div className='flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2'>
            <a
              href='https://twitter.com/de_gabenismen'
              className='mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0'
            >
              Følg oss
            </a>
            <a
              href='https://www.gamer.no/klubber/gabenismen-gaming/138210'
              className='mx-3 font-bold hover:underline dark:text-black'
            >
              Se våre Stats
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
