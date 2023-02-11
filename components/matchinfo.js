import { fetchGamerInfo } from "../pages/api/gamerapi"
import { useEffect, useState } from "react"

export default function MatchInfo() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetchGamerInfo().then((data) => setGames(data))
  }, [])

  return (
    <>
      <div className='bg-gray-900 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 text-center lg:px-8'>
          <ul className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8'>
            {games.map((games) => (
              <div className='container '>
                <div className='row'>
                  <div className='col-12 col-md-6 col-lg-4'>
                    <div className='card'>
                      <div className='card-body'>
                        <h5 className='card-title'>{games.home_signup.name}</h5>
                        <h6 className='card-subtitle mb-2 text-muted'>{games.away_signup.name}</h6>
                        <p className='card-text'>{games.home_score}</p>
                        <p className='card-text'>{games.away_score}</p>
                        <p className='card-text'>{games.finished_at}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
