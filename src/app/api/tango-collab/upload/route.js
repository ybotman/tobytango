import { NextResponse } from 'next/server';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

const ADMIN_PASSWORD = process.env.PRACTICE_VIDEOS_ADMIN_PASSWORD || 'admin2025';

// Server-side upload to Azure Blob Storage (avoids SAS token issues)
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const password = formData.get('password');

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER || 'tangolab-study';

    if (!accountName || !accountKey) {
      return NextResponse.json({ error: 'Azure Storage not configured' }, { status: 503 });
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Generate unique blob name
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const blobName = `tango-collab/${timestamp}-${sanitizedFileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Convert file to buffer and upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: {
        blobContentType: file.type || 'video/mp4'
      }
    });

    const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

    return NextResponse.json({
      success: true,
      videoUrl: blobUrl
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file: ' + error.message }, { status: 500 });
  }
}

// Route segment config for large file uploads
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds timeout for large uploads
