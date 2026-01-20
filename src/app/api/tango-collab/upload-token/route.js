import { NextResponse } from 'next/server';
import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  SASProtocol
} from '@azure/storage-blob';

const ADMIN_PASSWORD = process.env.PRACTICE_VIDEOS_ADMIN_PASSWORD || 'admin2025';

// Generate a SAS token for uploading to Azure Blob Storage
export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER || 'tangolab-study';

    if (!accountName || !accountKey) {
      return NextResponse.json({ error: 'Azure Storage not configured' }, { status: 503 });
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    const expiresOn = new Date(new Date().valueOf() + 3600 * 1000);
    const permissions = ContainerSASPermissions.parse("rwl");

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName,
        permissions,
        startsOn: new Date(),
        expiresOn,
        protocol: SASProtocol.Https,
        version: '2024-11-04', // Pin to stable API version (SDK 12.30.0 defaults to 2026-02-06 which may not be supported)
      },
      sharedKeyCredential
    ).toString();

    return NextResponse.json({
      sasToken,
      accountName,
      containerName,
      expiresOn: expiresOn.toISOString()
    });

  } catch (error) {
    console.error('Error generating SAS token:', error);
    return NextResponse.json({ error: 'Failed to generate upload token' }, { status: 500 });
  }
}
