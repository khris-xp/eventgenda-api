import fs from 'fs';

export function removeTmp(tempFilePath: string) {
  fs.unlink(tempFilePath, (err) => {
    if (err) {
      console.error('Error removing temp file:', err);
    }
  });
}