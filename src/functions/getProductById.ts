import {APIGatewayEvent, Context} from 'aws-lambda';
import {Sanity} from '../app/models/sanity';
import {Product} from '../app/models/product';

function createProduct(obj: any): Product {
  return new Product({
    id: obj.slug.current,
    name: obj.title,
    url: `${process.env.URL}/.netlify/functions/getProductById?id=${obj.slug.current}`,
    price: obj.defaultProductVariant.price,
    description: obj.blurb?.en,
    image: Sanity.getImage(obj.defaultProductVariant, 300, 300)
    // body: blocksToHtml({blocks: x.body.en})});
  });
}

export async function handler(event: APIGatewayEvent, context: Context):
  Promise<{statusCode: number, headers: {'Content-Type': string}, body: string}> {

  const id: string = event.queryStringParameters.id;

  // If ID is not provided, return error message
  if (!id) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify('Malformed Request: Missing parameter id')
    };
  }

  const query = `*[_type=="product" && slug.current=="${id}"]`;
  return Sanity.CLIENT.fetch(query).then(results => {

    const products: Product[] = results.map(x => {
      return createProduct(x);
    });
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products[0]),
    };
  });
}
