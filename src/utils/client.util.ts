import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { Client } from '../models';

config();

const SECRET: Secret = String(process.env.JWT_SECRET);
const SALT: number = Number(process.env.JWT_SECRET);

async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT);
}

async function comparePasswords(current: string, hash: string) {
  return await bcrypt.compare(current, hash);
}

async function createToken(client: Client | null) {
  return jwt.sign({ client: client }, SECRET, {
    expiresIn: '2h',
  });
}

async function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}

export { hashPassword, comparePasswords, createToken, verifyToken };
