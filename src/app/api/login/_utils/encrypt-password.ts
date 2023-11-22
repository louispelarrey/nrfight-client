const algorithm = {
  name: 'AES-CTR',
  counter: new Uint8Array(16), // this will be replaced with the IV for each operation
  length: 128, // block size (in bits) for CTR mode, can be 64, 128
};

const getKey = async (secret: string) => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    algorithm,
    false,
    ['encrypt', 'decrypt']
  );
};

export const encryptPassword = async (password: string): Promise<string> => {
  if (!process.env.SECRET_KEY) throw new Error('SECRET_KEY is not defined');

  const iv = crypto.getRandomValues(new Uint8Array(16));
  algorithm.counter = iv;

  const key = await getKey(process.env.SECRET_KEY);
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const encrypted = await crypto.subtle.encrypt(algorithm, key, data);

  return Buffer.from(iv).toString('hex') + ':' + Buffer.from(encrypted).toString('hex');
};

export const decryptPassword = async (encryptedPassword: string): Promise<string> => {
  if (!process.env.SECRET_KEY) throw new Error('SECRET_KEY is not defined');

  const [ivHex, encrypted] = encryptedPassword.split(':');
  algorithm.counter = Buffer.from(ivHex, 'hex');

  const key = await getKey(process.env.SECRET_KEY);
  const encryptedData = Buffer.from(encrypted, 'hex');
  const decrypted = await crypto.subtle.decrypt(algorithm, key, encryptedData);

  return new TextDecoder().decode(decrypted);
};
