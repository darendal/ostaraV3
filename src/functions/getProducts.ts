import {APIGatewayEvent, Context} from 'aws-lambda';

const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');
const blocksToHtml = require('@sanity/block-content-to-html');

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

export async function handler(event: APIGatewayEvent, context: Context):
  Promise<{statusCode: number, headers: {'Content-Type': string}, body: string}> {

  const query = '*[_type=="product"] | order(title asc)';

  return sanity.fetch(query).then(results => {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(results),
    };
  });
}
