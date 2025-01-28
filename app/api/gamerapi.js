export async function fetchTeamMatches() {
  const token = '20|RwUdJUBiWgLIcX8zlm8e0rlAdZS4Dgml1hHW5jPd'; // Your Bearer token
  const url = '/api/matches'; // Internal endpoint

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch matches: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    // Check if data has a `data` property and return it
    if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error('Unexpected data format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching team matches:', error);
    return null;
  }
}
