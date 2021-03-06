import {APIGatewayEvent, Context} from 'aws-lambda';
import {Product} from '../app/models/product';
import {Sanity} from '../app/models/sanity';

// const blocksToHtml = require('@sanity/block-content-to-html');



function createProduct(obj: any): Product {
  return new Product({
    id: obj.slug.current,
    name: obj.title,
    url: `${process.env.URL}/.netlify/functions/getProducts`,
    price: obj.defaultProductVariant.price,
    description: obj.blurb?.en,
    image: Sanity.getImage(obj?.defaultProductVariant, 300, 300)
    // body: blocksToHtml({blocks: x.body.en})});
  });
}

export async function handler(event: APIGatewayEvent, context: Context):
  Promise<{statusCode: number, headers: {'Content-Type': string}, body: string}> {

  const query = '*[_type=="product"] | order(title asc){slug, title, defaultProductVariant, blurb}';
  return Sanity.CLIENT.fetch(query).then(results => {

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
