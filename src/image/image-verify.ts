import { fromBuffer } from 'file-type';
import sharp from 'sharp';

/**
 * Verifies whether the given buffer is of an image MIME type.
 *
 * @param buffer Uint8Array - The image file buffer
 * @returns boolean - Returns true if the buffer is an image type, otherwise false
 *
 * Example:
 * const buffer = fs.readFileSync('image.jpg');
 * const isImage = await verifyImageType(buffer); // true
 */
export const verifyImageType = async (buffer: Uint8Array) => {
  try {
    const type = await fromBuffer(buffer);
    return type?.mime.startsWith('image/') ?? false;
  } catch {
    return false;
  }
};

/**
 * Checks if the image buffer is decodable using the Sharp library.
 * This can help detect corrupted or unsupported image formats.
 *
 * @param buffer Uint8Array - The image file buffer
 * @returns boolean - Returns true if the image is decodable, otherwise false
 *
 * Example:
 * const buffer = fs.readFileSync('image.jpg');
 * const isDecodable = await verifyDecodableImage(buffer); // true
 */
export const verifyDecodableImage = async (buffer: Uint8Array) => {
  try {
    await sharp(buffer).metadata();
    return true;
  } catch {
    return false;
  }
};
