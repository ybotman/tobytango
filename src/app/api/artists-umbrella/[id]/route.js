import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ARTISTS_DIR = path.join(process.cwd(), 'public', 'artists-umbrella');

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const filePath = path.join(ARTISTS_DIR, `${id}.json`);
    
    const content = await fs.readFile(filePath, 'utf-8');
    const artist = JSON.parse(content);
    
    return NextResponse.json({ ...artist, id });
  } catch (error) {
    return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const artist = await request.json();
    const filePath = path.join(ARTISTS_DIR, `${id}.json`);
    
    // Auto-generate shortName
    artist.shortName = 
      artist.leaderFirst.charAt(0).toUpperCase() +
      artist.leaderLast.charAt(0).toUpperCase() +
      artist.followerFirst.charAt(0).toUpperCase() +
      artist.followerLast.charAt(0).toUpperCase();
    
    // Generate fullName
    artist.fullName = `${artist.leaderFirst} ${artist.leaderLast} & ${artist.followerFirst} ${artist.followerLast}`;
    
    await fs.writeFile(filePath, JSON.stringify(artist, null, 2));
    
    return NextResponse.json({ ...artist, id });
  } catch (error) {
    console.error('Error updating artist:', error);
    return NextResponse.json({ error: 'Failed to update artist' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const filePath = path.join(ARTISTS_DIR, `${id}.json`);
    
    await fs.unlink(filePath);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting artist:', error);
    return NextResponse.json({ error: 'Failed to delete artist' }, { status: 500 });
  }
}