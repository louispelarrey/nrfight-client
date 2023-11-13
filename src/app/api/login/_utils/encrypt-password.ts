import crypto from 'crypto';

const algorithm = 'aes-256-ctr'; // AES Counter Mode
const iv = crypto.randomBytes(16); // Initialization vector

export const encryptPassword = async (password: string): Promise<string> => {
  if(!process.env.SECRET_KEY) throw new Error('SECRET_KEY is not defined');

  const cipher = crypto.createCipheriv(algorithm, process.env.SECRET_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decryptPassword = async (encryptedPassword: string): Promise<string> => {
  if(!process.env.SECRET_KEY) throw new Error('SECRET_KEY is not defined');

  const [ivHex, encrypted] = encryptedPassword.split(':');
  const ivBuffer = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, process.env.SECRET_KEY, ivBuffer);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);
  return decrypted.toString();
};
