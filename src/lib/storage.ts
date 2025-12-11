/**
 * Vercel Blob Storage Client
 * Provides utilities for working with Vercel Blob storage
 */

// Helper function to get public URL for an image stored in Vercel Blob
export function getImageUrl(path: string): string {
    // Use NEXT_PUBLIC_ prefixed variable so it's available on client-side
    const blobUrlPrefix = process.env.NEXT_PUBLIC_BLOB_URL_PREFIX;

    // During build or if not configured, return empty string
    if (!blobUrlPrefix) {
        return '';
    }

    // Ensure path doesn't start with slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    return `${blobUrlPrefix}/${cleanPath}`;
}

// Helper to check if blob storage is available
export function isBlobAvailable(): boolean {
    return !!process.env.NEXT_PUBLIC_BLOB_URL_PREFIX;
}
