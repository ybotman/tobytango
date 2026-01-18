import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/tango-collab.json');

// Admin password for adding/editing videos
const ADMIN_PASSWORD = process.env.PRACTICE_VIDEOS_ADMIN_PASSWORD || 'admin2025';

function readVideosFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { videos: [] };
  }
}

function writeVideosFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET - retrieve videos (public - no password required)
export async function GET() {
  const data = readVideosFile();
  return NextResponse.json(data);
}

// POST - add a new video (requires admin password)
export async function POST(request) {
  const body = await request.json();
  const { password, title, youtubeUrl, videoUrl, description, type } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  if (!youtubeUrl && !videoUrl) {
    return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
  }

  const data = readVideosFile();
  const newVideo = {
    id: Date.now().toString(),
    title,
    youtubeUrl: youtubeUrl || null,
    videoUrl: videoUrl || null,
    type: type || (youtubeUrl ? 'youtube' : 'azure'),
    description: description || '',
    addedAt: new Date().toISOString()
  };

  data.videos.push(newVideo);
  writeVideosFile(data);

  return NextResponse.json({ success: true, video: newVideo });
}

// DELETE - remove a video (requires admin password)
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  const videoId = searchParams.get('id');

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
  }

  const data = readVideosFile();
  data.videos = data.videos.filter(v => v.id !== videoId);
  writeVideosFile(data);

  return NextResponse.json({ success: true });
}
