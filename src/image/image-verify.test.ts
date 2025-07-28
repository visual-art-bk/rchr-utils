import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { verifyImageType, verifyDecodableImage } from './image-verify';

// --- ESM 호환용 __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- 테스트 이미지 상수 ---
const TEMP_IMAGE_PATH = resolve(__dirname, 'temp-test.jpg');
const BASE64_IMAGE_1x1_PNG =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADElEQVR42mP8z/C/HwAFgwJ/l4lmqQAAAABJRU5ErkJggg==';

let imageBuffer: Buffer;

beforeAll(() => {
  imageBuffer = Buffer.from(BASE64_IMAGE_1x1_PNG, 'base64');
  fs.writeFileSync(TEMP_IMAGE_PATH, imageBuffer);
});

afterAll(() => {
  fs.unlinkSync(TEMP_IMAGE_PATH);
});

describe('Image verification utilities', () => {
  it('should verify image MIME type', async () => {
    const result = await verifyImageType(imageBuffer);
    expect(result).toBe(true);
  });

  it('should verify image decodability', async () => {
    const result = await verifyDecodableImage(imageBuffer);
    expect(result).toBe(true);
  });
});
