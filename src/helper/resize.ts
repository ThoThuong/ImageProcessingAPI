import sharp from 'sharp';
import path from 'path';

class Resize {
  private folder: string;

  constructor(folder: string) {
    this.folder = folder;
  }

  async save(
    width: number,
    height: number,
    filename: string,
    buffer?: Buffer
  ): Promise<string> {
    const filepath = this.filepath(filename);
    await sharp(buffer)
      .resize(width, height, {
        fit: sharp.fit.inside,
        withoutEnlargement: false,
      })
      .toFile(filepath);

    return filepath;
  }

  filepath(filename: string): string {

    return path.resolve(`${this.folder}/${filename}`);
  }

  resizeExistImage = (
    pathToGetImageToResize: string,
    height: number,
    width: number
  ): Promise<Buffer> => {
    return sharp(path.resolve(`${pathToGetImageToResize}`))
      .resize({
        height: height,
        width: width,
      })
      .toBuffer();
  };

}

export default Resize;
