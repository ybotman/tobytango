import { NextResponse } from 'next/server';
import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol
} from '@azure/storage-blob';

const ADMIN_PASSWORD = process.env.PRACTICE_VIDEOS_ADMIN_PASSWORD || 'admin2025';

// Generate a blob-specific SAS token for uploading to Azure Blob Storage
export async function POST(request) {
  try {
    const body = await request.json();
    const { password, fileName } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    if (!fileName) {
      return NextResponse.json({ error: 'fileName is required' }, { status: 400 });
    }

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER || 'tangolab-study';

    if (!accountName || !accountKey) {
      return NextResponse.json({ error: 'Azure Storage not configured' }, { status: 503 });
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    // Generate unique blob name
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const blobName = `tango-collab/${timestamp}-${sanitizedFileName}`;

    const expiresOn = new Date(new Date().valueOf() + 3600 * 1000);
    // Use blob-level permissions (create, write) instead of container-level
    const permissions = BlobSASPermissions.parse("cw");

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName,
        blobName,
        permissions,
        startsOn: new Date(),
        expiresOn,
        protocol: SASProtocol.Https,
      },
      sharedKeyCredential
    ).toString();

    const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

    return NextResponse.json({
      sasToken,
      blobUrl,
      accountName,
      containerName,
      blobName,
      expiresOn: expiresOn.toISOString()
    });

  } catch (error) {
    console.error('Error generating SAS token:', error);
    return NextResponse.json({ error: 'Failed to generate upload token' }, { status: 500 });
  }
}
