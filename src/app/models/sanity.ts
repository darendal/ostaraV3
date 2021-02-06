const client = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

const sanity = client({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

export class Sanity {
  public static readonly CLIENT: any = sanity;
  public static readonly IMAGE_BUILDER: any = imageUrlBuilder;

  static getImage(imgPath: any, width: number, height: number): string {

    const image = imgPath.images && imgPath.images.length > 0
      ? imgPath.images[0].asset._ref
      : null;

    if (image) {
      return Sanity.IMAGE_BUILDER(Sanity.CLIENT)
        .image(image)
        .size(width, height)
        .fit('fillmax')
        .bg('ffff')
        .url();
    } else {
      return `https://via.placeholder.com/${width}x${height}`;
    }
  }
}
