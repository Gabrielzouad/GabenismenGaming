export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { sys, fields } = req.body;

      if (sys.type === 'Entry' && sys.environment.sys.id === 'master') {
        // Extract blog post info
        const blogTitle = fields.title['en-US'];
        const blogUrl = fields.slug
          ? `https://gabenismen.no/${fields.slug['en-US']}`
          : 'No URL available';

        // Discord webhook URL (replace with your own)
        const DISCORD_WEBHOOK_URL =
          'https://discord.com/api/webhooks/1331646610110681139/it1yRw0QOrUElx3rDoBrx-a0Vw6FDNl38Oxnw1Ewk23y8nl90oOvOymFfmRbEI0ddXWi';

        // Send the message to Discord
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📢 **Nytt blogg innlegg!**\n**${blogTitle}**\nLes den her: ${blogUrl}`,
          }),
        });

        res.status(200).json({ message: 'Notification sent to Discord!' });
      } else {
        res.status(400).json({ message: 'Invalid payload' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
