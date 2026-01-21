import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ARTISTS_DIR = path.join(process.cwd(), 'public', 'artists-umbrella');

export async function GET() {
  try {
    // Ensure directory exists
    try {
      await fs.access(ARTISTS_DIR);
    } catch {
      await fs.mkdir(ARTISTS_DIR, { recursive: true });
    }

    const files = await fs.readdir(ARTISTS_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const artists = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(ARTISTS_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const artist = JSON.parse(content);
        return {
          ...artist,
          id: file.replace('.json', '')
        };
      })
    );

    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error reading artists:', error);
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const artist = await request.json();
    
    // Generate filename from names
    const filename = `${artist.leaderFirst.toLowerCase()}-${artist.followerFirst.toLowerCase()}.json`;
    const filePath = path.join(ARTISTS_DIR, filename);
    
    // Auto-generate shortName
    artist.shortName = 
      artist.leaderFirst.charAt(0).toUpperCase() +
      artist.leaderLast.charAt(0).toUpperCase() +
      artist.followerFirst.charAt(0).toUpperCase() +
      artist.followerLast.charAt(0).toUpperCase();
    
    // Generate fullName
    artist.fullName = `${artist.leaderFirst} ${artist.leaderLast} & ${artist.followerFirst} ${artist.followerLast}`;
    
    await fs.writeFile(filePath, JSON.stringify(artist, null, 2));
    
    return NextResponse.json({ 
      ...artist, 
      id: filename.replace('.json', '') 
    });
  } catch (error) {
    console.error('Error creating artist:', error);
    return NextResponse.json({ error: 'Failed to create artist' }, { status: 500 });
  }
}