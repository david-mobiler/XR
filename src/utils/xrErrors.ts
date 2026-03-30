/**
 * Short, readable copy for common WebXR session failures (permissions, unsupported features).
 */
export function formatSessionError(error: unknown): string {
  if (!(error instanceof Error)) {
    return typeof error === 'string' ? error : 'Could not start AR. Try again.';
  }

  const msg = error.message.toLowerCase();

  if (msg.includes('not supported') || msg.includes('immersive-ar')) {
    return 'This device or browser cannot start AR here.';
  }
  if (msg.includes('permission') || msg.includes('denied')) {
    return 'Camera or AR permission was denied. Allow access in site settings and try again.';
  }
  if (msg.includes('secure') || msg.includes('https')) {
    return 'Open this app over HTTPS or localhost.';
  }

  return error.message.length > 120 ? `${error.message.slice(0, 117)}…` : error.message;
}
