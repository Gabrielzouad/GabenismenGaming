import Head from "next/head"
import MatchesIntro from "../components/matchesIntro"
import MatchInfo from "../components/matchinfo"

export default function Matches() {
  return (
    <>
      <Head>
        <title>Telialigaen Matches</title>
      </Head>
      <MatchesIntro />
      <MatchInfo />
    </>
  )
}
