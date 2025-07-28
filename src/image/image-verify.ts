import { fromBuffer } from 'file-type';
import sharp from 'sharp';

export const verifyImageType = async (buffer: Uint8Array) => {
  try {
    const type = await fromBuffer(buffer);
    return type?.mime.startsWith('image/') ?? false;
  } catch {
    return false;
  }
};

export const verifyDecodableImage = async (buffer: Uint8Array) => {
  try {
    await sharp(buffer).metadata();
    return true;
  } catch {
    return false;
  }
};