import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

export const ejsFileLoader = () => {
  const mainDir = path.resolve();
  const fileLoader = (file: string) => fs.readFileSync(path.join(mainDir, 'src', 'templates', file));
  ejs.fileLoader = fileLoader;
};
