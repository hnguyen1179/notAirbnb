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
  const authHeader = context.authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const verifiedToken = verify(token, 'secret') as Token;
    return verifiedToken && verifiedToken.userId;
  }
}
