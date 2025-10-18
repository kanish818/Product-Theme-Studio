// Utility functions

/**
 * Downloads data as a JSON file
 * Creates a temporary blob URL and triggers download
 */
export function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  // Clean up
  URL.revokeObjectURL(url);
  a.remove();
}

/**
 * Simple className utility (like classnames lib but lighter)
 * Filters out falsy values and joins the rest
 */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Download a plain text file (used for exporting CSS variables)
 */
export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}
