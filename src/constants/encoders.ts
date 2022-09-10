export const encoderIds = [
  'encoder01',
  'encoder01_long',
  'encoder01_new',
  'encoder02_long',
  'encoder03_long',
  'encoder03_arai_iphone',
  'encoder04_arai_mac',
] as const;

export type EncoderId = typeof encoderIds[number];
