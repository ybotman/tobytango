import { NextResponse } from 'next/server';
import { readJsonFromBlob, writeJsonToBlob } from '@/lib/azure-json-storage';

const BLOB_NAME = 'tango-collab.json';

// Viewer password for accessing videos
const VIEWER_PASSWORD = (process.env.PRACTICE_VIDEOS_PASSWORD || 'viewer2025').trim();

// Admin password for adding/editing videos
const ADMIN_PASSWORD = (process.env.PRACTICE_VIDEOS_ADMIN_PASSWORD || 'admin2025').trim();

// Initialize data structure if needed
function initializeData(data) {
  if (!data.videos) data.videos = [];
  if (!data.folders) data.folders = [];
  return data;
}

// GET - retrieve videos and folders (requires viewer password)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');

  if (password !== VIEWER_PASSWORD && password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Password required' }, { status: 401 });
  }

  const data = initializeData(await readJsonFromBlob(BLOB_NAME));
  return NextResponse.json(data);
}

// POST - add video, create folder, rename folder, or move video
export async function POST(request) {
  try {
    const body = await request.json();
    const { password, action } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const data = initializeData(await readJsonFromBlob(BLOB_NAME));

    // Handle different actions
    switch (action) {
      case 'validateAdmin': {
        // Just validates that admin password is correct (returns 200 if we got here)
        return NextResponse.json({ success: true, valid: true });
      }

      case 'createFolder': {
        const { name } = body;
        if (!name) {
          return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
        }
        const newFolder = {
          id: Date.now().toString(),
          name,
          createdAt: new Date().toISOString()
        };
        data.folders.push(newFolder);
        await writeJsonToBlob(BLOB_NAME, data);
        return NextResponse.json({ success: true, folder: newFolder });
      }

      case 'renameFolder': {
        const { folderId, name } = body;
        if (!folderId || !name) {
          return NextResponse.json({ error: 'Folder ID and name are required' }, { status: 400 });
        }
        const folder = data.folders.find(f => f.id === folderId);
        if (!folder) {
          return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
        }
        folder.name = name;
        await writeJsonToBlob(BLOB_NAME, data);
        return NextResponse.json({ success: true, folder });
      }

      case 'moveVideo': {
        const { videoId, folderId } = body;
        if (!videoId) {
          return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
        }
        const video = data.videos.find(v => v.id === videoId);
        if (!video) {
          return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }
        // folderId can be null to move to root
        video.folderId = folderId || null;
        await writeJsonToBlob(BLOB_NAME, data);
        return NextResponse.json({ success: true, video });
      }

      case 'updateTags': {
        const { videoId, tags } = body;
        if (!videoId) {
          return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
        }
        const video = data.videos.find(v => v.id === videoId);
        if (!video) {
          return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }
        video.tags = tags || [];
        await writeJsonToBlob(BLOB_NAME, data);
        return NextResponse.json({ success: true, video });
      }

      case 'editVideo': {
        const { videoId, title, description, tags, artists, startTime, youtubeUrl, thumbnailUrl } = body;
        if (!videoId) {
          return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
        }
        const video = data.videos.find(v => v.id === videoId);
        if (!video) {
          return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }
        if (title !== undefined) video.title = title;
        if (description !== undefined) video.description = description;
        if (tags !== undefined) video.tags = tags;
        if (artists !== undefined) video.artists = artists;
        if (startTime !== undefined) video.startTime = parseInt(startTime);
        if (youtubeUrl !== undefined) video.youtubeUrl = youtubeUrl;
        if (thumbnailUrl !== undefined) video.thumbnailUrl = thumbnailUrl;
        await writeJsonToBlob(BLOB_NAME, data);
        return NextResponse.json({ success: true, video });
      }

      case 'toggleQueued': {
        const { videoId, queued } = body;
        if (!videoId) {
          return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
        }
        const video = data.videos.find(v => v.id === videoId);
        if (!video) {
          return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }
        video.queued = !!queued;
        await writeJsonToBlob(BLOB_NAME, data);
        return NextResponse.json({ success: true, video });
      }

      case 'updateThumbnail': {
        const { videoId, thumbnailUrl } = body;
        if (!videoId) {
          return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
        }
        const video = data.videos.find(v => v.id === videoId);
        if (!video) {
          return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }
        video.thumbnailUrl = thumbnailUrl || null;
        await writeJsonToBlob(BLOB_NAME, data);
        return NextResponse.json({ success: true, video });
      }

      default: {
        // Default: add video
        const { title, youtubeUrl, videoUrl, description, type, startTime, folderId, thumbnailUrl } = body;

        if (!title) {
          return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        if (!youtubeUrl && !videoUrl) {
          return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
        }

        const { tags, artists } = body;
        const newVideo = {
          id: Date.now().toString(),
          title,
          youtubeUrl: youtubeUrl || null,
          videoUrl: videoUrl || null,
          thumbnailUrl: thumbnailUrl || null,
          type: type || (youtubeUrl ? 'youtube' : 'azure'),
          description: description || '',
          startTime: startTime !== undefined ? parseInt(startTime) : 0,
          folderId: folderId || null,
          tags: tags || [],
          artists: artists || [],
          addedAt: new Date().toISOString()
        };

        data.videos.push(newVideo);
        await writeJsonToBlob(BLOB_NAME, data);

        return NextResponse.json({ success: true, video: newVideo });
      }
    }
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - remove a video or folder (requires admin password)
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  const videoId = searchParams.get('id');
  const folderId = searchParams.get('folderId');

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const data = initializeData(await readJsonFromBlob(BLOB_NAME));

  // Delete folder
  if (folderId) {
    const hasVideos = data.videos.some(v => v.folderId === folderId);
    if (hasVideos) {
      return NextResponse.json({ error: 'Cannot delete folder with videos. Move or delete videos first.' }, { status: 400 });
    }
    data.folders = data.folders.filter(f => f.id !== folderId);
    await writeJsonToBlob(BLOB_NAME, data);
    return NextResponse.json({ success: true });
  }

  // Delete video
  if (videoId) {
    data.videos = data.videos.filter(v => v.id !== videoId);
    await writeJsonToBlob(BLOB_NAME, data);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Video ID or Folder ID required' }, { status: 400 });
}
