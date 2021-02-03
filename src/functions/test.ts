import { APIGatewayEvent, Context } from 'aws-lambda';

export async function handler(event: APIGatewayEvent, context: Context):
  Promise<{statusCode: number, headers: {'Content-Type': string}, body: string}> {

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify('test')
  };
}
