import * as dotenv from 'dotenv';
dotenv.config();
import { verify } from 'jsonwebtoken';
import { Context } from './context';

export const APP_SECRET = process.env.APP_SECRET as string;
interface Token {
  userId: string;
}

// Grabs the current user's ID
export function getUserId(context: Context): string | undefined {
  console.log('in fx getUserId');
  const authHeader = context.req.get('Authorization');
  console.log('authHeader is: ', authHeader);
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const verifiedToken = verify(token, 'secret') as Token;
    return verifiedToken && verifiedToken.userId;
  }
}
