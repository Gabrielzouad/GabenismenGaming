const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`;
const PLAYERS_GRAPHQL_FIELDS = `
name
slug
role
playerImage {
  url
}
playerDescription 
gamerLink
steamLink
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractPostEntries(entries);
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

export async function getAllPlayers() {
  try {
    const entries = await fetchGraphQL(
      `query {
        playerCollection(order: role_DESC) {
          items {
            ${PLAYERS_GRAPHQL_FIELDS}
          }
        }
      }`
    );

    if (entries.errors) {
      throw new Error('Error fetching player data');
    }

    return entries?.data?.playerCollection?.items;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
}

// Helper function to fetch the cover image URL from Contentful
export async function getCoverImageUrl(coverImageId) {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = 'master';
  const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/assets/${coverImageId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${contentfulAccessToken}`,
      },
    });

    if (!response.ok) {
      console.error(
        'Error fetching asset:',
        response.status,
        response.statusText
      );
      return null;
    }

    const data = await response.json();
    console.log('Asset data from Contentful:', data); // Log the response data for inspection

    // Ensure that the 'file' and 'url' properties exist before trying to access them
    if (data.fields && data.fields.file && data.fields.file.url) {
      return `https:${data.fields.file.url}`; // Return the full URL of the cover image
    } else {
      console.error(
        'Cover image data is missing required fields:',
        data.fields
      );
      return null;
    }
  } catch (error) {
    console.error('Error fetching cover image URL from Contentful:', error);
    return null;
  }
}
