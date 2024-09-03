// '../components/player.js'
export default function Players({ players }) {
  return (
    <>
      <div className='bg-gray-900 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 text-center lg:px-8'>
          <div className='mx-auto max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Våre Spillere
            </h2>
            <p className='mt-4 text-lg leading-8 text-gray-400'>
              Venner og familie står sterkest sammen
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8'
          >
            {players && players.length > 0 ? (
              players.map((player) => (
                <li
                  key={player.name}
                  className='rounded-2xl bg-gray-800 py-10 px-8'
                >
                  <img
                    className='mx-auto h-48 w-48 rounded-full md:h-56 md:w-56'
                    src={player.playerImage.url}
                    alt={player.name}
                  />
                  <h3 className='mt-6 text-base font-semibold leading-7 tracking-tight text-white'>
                    {player.name}
                  </h3>
                  <p className='text-sm leading-6 text-gray-400'>
                    {player.role}
                  </p>
                  <ul role='list' className='mt-6 flex justify-center gap-x-6'>
                    {player.gamerLink && (
                      <li>
                        <a
                          href={player.gamerLink}
                          className='text-gray-400 hover:text-gray-300'
                        >
                          <span className='sr-only'>Gamer Profile</span>
                          {/* SVG or Icon for Gamer Profile */}
                        </a>
                      </li>
                    )}
                    {player.steamLink && (
                      <li>
                        <a
                          href={player.steamLink}
                          className='text-gray-400 hover:text-gray-300'
                        >
                          <span className='sr-only'>Steam Profile</span>
                          {/* SVG or Icon for Steam Profile */}
                        </a>
                      </li>
                    )}
                  </ul>
                </li>
              ))
            ) : (
              <p className='text-white'>No players found.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
