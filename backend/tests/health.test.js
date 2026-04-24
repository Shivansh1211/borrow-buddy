import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';

describe('Health Check', () => {
  // Wait for MongoDB to connect before running tests
  beforeAll(async () => {
    // We give it a short time for the async connectDB() to finish connecting
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should return 200 OK from /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
