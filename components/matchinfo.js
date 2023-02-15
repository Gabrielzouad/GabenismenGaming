import { fetchGamerInfo } from "../pages/api/gamerapi"
import { useEffect, useState } from "react"

export default function MatchInfo() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetchGamerInfo().then((data) => setGames(data))
  }, [])
  const finishedDate = Date(games.finished_at)
  return (
    <>
      <div className='bg-gray-900 '>
        <div className='mx-auto max-w-7xl px-6 text-center lg:px-8'>
          <h2 className='text-2xl font-extrabold text-white sm:text-4xl py-8'>Resultater</h2>
          <ul className='mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8'>
            {games.map((games) => {
              if (games.finished_at !== null && (games.home_signup.name === "Gabenismen Gaming" || games.away_signup.name === "Gabenismen Gaming")) {
                return (
                  <div className='container text-white'>
                    <div className='row'>
                      <div className='card bg-gray-800'>
                        <div className='card-body'>
                          <div className='flex items-center gap-x-6 py-4 px-10 justify-between'>
                            <img className='h-16 w-16 rounded-full' src={games.home_signup.team.logo.url} alt={games.home_signup.name} />
                            <h5 className='card-title'>{games.home_signup.name}</h5>
                            <p className='card-text'>{games.home_score}</p>
                          </div>
                          <div className='flex items-center gap-x-6 py-4 px-10 justify-between'>
                            <img className='h-16 w-16 rounded-full' src={games.away_signup.team.logo.url} lt={games.away_signup.name} />
                            <h6 className='card-subtitle mb-2 text-muted'>{games.away_signup.name}</h6>
                            <p className='card-text'>{games.away_score}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </ul>
          <h2 className='text-2xl font-extrabold text-white sm:text-4xl py-8'>Kommende kamper</h2>
          <ul className='mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8'>
            {games.map((games) => {
              if (games.finished_at === null && (games.home_signup.name === "Gabenismen Gaming" || games.away_signup.name === "Gabenismen Gaming")) {
                return (
                  <div className='container text-white'>
                    <div className='row'>
                      <div className='card bg-gray-800'>
                        <div className='card-body'>
                          <div className='flex items-center gap-x-6 py-4 px-10 justify-between'>
                            <img className='h-16 w-16 rounded-full' src={games.home_signup.team.logo.url} lt={games.home_signup.name} />
                            <h5 className='card-title'>{games.home_signup.name}</h5>
                            <p className='card-text'>{games.home_score}</p>
                          </div>
                          <div className='flex items-center gap-x-6 py-4 px-10 justify-between'>
                            <img className='h-16 w-16 rounded-full' src={games.away_signup.team.logo.url} lt={games.away_signup.name} />
                            <h6 className='card-subtitle mb-2 text-muted'>{games.away_signup.name}</h6>
                            <p className='card-text'>{games.away_score}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
