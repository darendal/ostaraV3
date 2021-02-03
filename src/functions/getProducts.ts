import {APIGatewayEvent, Context} from 'aws-lambda';
import {Product} from '../app/models/product';

const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');
const blocksToHtml = require('@sanity/block-content-to-html');

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

function createProduct(obj: any): Product {
  const product = new Product({
    id: obj.slug.current,
    name: obj.title,
    url: `${process.env.URL}/.netlify/functions/getProducts`,
    price: obj.defaultProductVariant.price,
    description: obj.blurb?.en,
    // body: blocksToHtml({blocks: x.body.en})});
  });

  const image = obj.defaultProductVariant.images && obj.defaultProductVariant.images.length > 0
    ? obj.defaultProductVariant.images[0].asset._ref
    : null;

  if (image) {
    product.image = imageUrlBuilder(sanity).image(image).size(300, 300).fit('fillmax').url();
  }

  return product;
}

export async function handler(event: APIGatewayEvent, context: Context):
  Promise<{statusCode: number, headers: {'Content-Type': string}, body: string}> {

  const query = '*[_type=="product"] | order(title asc)';
  return sanity.fetch(query).then(results => {

    const products: Product[] = results.map(x => {
        return createProduct(x);
    });
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    };
  });
}
