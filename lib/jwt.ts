import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export function generateDownloadToken(orderId: string, productId: string) {
  return jwt.sign({ orderId, productId }, SECRET_KEY, { expiresIn: '24h' });
}

export function verifyDownloadToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY) as { orderId: string, productId: string };
  } catch (error) {
    return null;
  }
}
