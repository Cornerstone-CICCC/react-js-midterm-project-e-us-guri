import { createUploadthing } from 'uploadthing/express';
import { UploadThingError } from 'uploadthing/server';
import { verifyToken } from '../middleware/auth.js';

const f = createUploadthing();

async function requireAdmin(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UploadThingError('Unauthorized');
  }
  try {
    const user = await verifyToken(authHeader.split(' ')[1]);
    if (user.userRole !== 'admin') throw new UploadThingError('Forbidden');
    return user;
  } catch {
    throw new UploadThingError('Unauthorized');
  }
}

export const uploadRouter = {
  productImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = await requireAdmin(req);
      return { userId: user.userId, userEmail: user.userEmail };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log(`UT upload complete by ${metadata.userEmail}: ${file.ufsUrl}`);
      return { url: file.ufsUrl };
    }),
};
