export async function fetchGamerInfo() {
  const res = await fetch(`https://www.gamer.no/api/paradise/v2/division/10922/matchups`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 20|RwUdJUBiWgLIcX8zlm8e0rlAdZS4Dgml1hHW5jPd`,
    },
  })
  const data = await res.json()
  return data
}
