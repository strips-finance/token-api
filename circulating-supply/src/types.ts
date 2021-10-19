import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export type HttpEventRequest<T = null> = Omit<APIGatewayProxyEvent, 'pathParameters'> & {
    pathParameters: T
}

export type HttpResponse = Promise<APIGatewayProxyResult>;

export type HttpResponseBody = {
    city: string;
    temperature: number;
    textWeather: string[];
}