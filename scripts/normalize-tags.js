const https = require('https');

const PASSWORD = '4Tango-Neuvo!';

// Normalize: first letter uppercase, rest lowercase
function normalize(str) {
  const trimmed = str.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

// Fetch videos
https.get('https://www.tobytango.com/api/tango-collab?password=' + encodeURIComponent(PASSWORD), (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', async () => {
    const json = JSON.parse(data);
    const videos = json.videos || [];

    console.log('Found', videos.length, 'videos');

    // Find videos with tags or artists that need normalizing
    const videosToUpdate = [];
    for (const video of videos) {
      const oldTags = video.tags || [];
      const oldArtists = video.artists || [];

      const newTags = [...new Set(oldTags.map(normalize).filter(t => t))];
      const newArtists = [...new Set(oldArtists.map(normalize).filter(a => a))];

      const tagsChanged = JSON.stringify(oldTags.sort()) !== JSON.stringify(newTags.sort());
      const artistsChanged = JSON.stringify(oldArtists.sort()) !== JSON.stringify(newArtists.sort());

      if (tagsChanged || artistsChanged) {
        videosToUpdate.push({
          id: video.id,
          title: video.title,
          oldTags, newTags, tagsChanged,
          oldArtists, newArtists, artistsChanged
        });
      }
    }

    console.log('Videos needing updates:', videosToUpdate.length);
    videosToUpdate.forEach(v => {
      if (v.tagsChanged) console.log(' - Tags:', v.title, ':', v.oldTags.join(','), '->', v.newTags.join(','));
      if (v.artistsChanged) console.log(' - Artists:', v.title, ':', v.oldArtists.join(','), '->', v.newArtists.join(','));
    });

    // Update each video
    for (const v of videosToUpdate) {
      const postData = JSON.stringify({
        password: PASSWORD,
        action: 'editVideo',
        videoId: v.id,
        tags: v.newTags,
        artists: v.newArtists
      });

      await new Promise((resolve, reject) => {
        const req = https.request({
          hostname: 'www.tobytango.com',
          path: '/api/tango-collab',
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
        }, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            console.log('Updated:', v.title, res.statusCode);
            resolve();
          });
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
      });
    }

    console.log('Done!');
  });
});
