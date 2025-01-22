import { NextResponse } from 'next/server';
import { getCoverImageUrl } from '../../../lib/api';

export async function POST(req) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    // Log the incoming data to understand its structure
    console.log('Received webhook data:', JSON.stringify(body, null, 2));

    // Validate the fields we are expecting from the Contentful webhook
    const title = body.fields.title?.nb;
    const slug = body.fields.slug?.nb;
    const content = body.fields.content?.nb?.content[0]?.content[0]?.value;
    const excerpt = body.fields.excerpt?.nb;
    const coverImage = body.fields.coverImage?.nb?.sys?.id; // This will be used for the image
    const date = body.fields.date?.nb;
    const author = body.fields.author?.nb?.sys?.id;

    // Check if essential data exists
    if (
      !title ||
      !slug ||
      !content ||
      !excerpt ||
      !coverImage ||
      !date ||
      !author
    ) {
      console.error('Missing required fields in the Contentful data');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Construct the blog URL using the slug
    const blogUrl = `https://gabenismen.no/posts/${slug}`;

    // Fetch the cover image URL from Contentful
    const coverImageUrl = await getCoverImageUrl(coverImage); // This function fetches the image URL based on the asset ID

    // Log the relevant data
    console.log('Title:', title);
    console.log('Slug:', slug);
    console.log('Content:', content);
    console.log('Excerpt:', excerpt);
    console.log('Cover Image ID:', coverImage);
    console.log('Cover Image URL:', coverImageUrl);
    console.log('Date:', date);
    console.log('Author ID:', author);
    console.log('Blog URL:', blogUrl);

    // Example: Sending a request to a Discord webhook (from the `content` value)
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (
      webhookUrl &&
      webhookUrl.startsWith('https://discord.com/api/webhooks')
    ) {
      const discordResponse = await fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify({
          content: `Nytt innlegg: **${title}**\nLes mer her: ${blogUrl}`,
          embeds: [
            {
              title: title,
              url: blogUrl,
              description: excerpt,
              image: {
                url: coverImageUrl,
              },
            },
          ],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!discordResponse.ok) {
        console.error('Failed to send to Discord:', discordResponse.statusText);
        return NextResponse.json(
          { error: 'Failed to send to Discord' },
          { status: 500 }
        );
      }
      console.log('Sent message to Discord successfully');
    }

    // Respond with the blog URL and cover image URL in the response
    return NextResponse.json({
      success: true,
      blogUrl: blogUrl,
      coverImageUrl: coverImageUrl,
    });
  } catch (error) {
    // Log any errors that occur
    console.error('Error handling the webhook:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
