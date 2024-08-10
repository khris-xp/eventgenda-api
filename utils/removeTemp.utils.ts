import fs from 'fs';

export function removeTmp(tempFilePath: string) {
  fs.unlink(tempFilePath, (err) => {
    if (err instanceof Error) {
      return err;
    }
  });
}
