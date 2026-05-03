const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Import routes and middleware
const authRouter = require('../../routes/auth');
const ticketsRouter = require('../../routes/tickets');
const { errorHandler } = require('../../middleware/errorHandler');
const User = require('../../models/User');
const Ticket = require('../../models/Ticket');

let app;
let mongoServer;
let authToken;

const JWT_SECRET = 'test-jwt-secret-for-testing';

beforeAll(async () => {
    // Set test environment variables
    process.env.NODE_JWT_SECRET = JWT_SECRET;
    
    // Create in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Create Express app for testing
    app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    
    app.use('/api', authRouter);
    app.use('/api/tickets', ticketsRouter);
    app.use(errorHandler);

    // Create a test user and get auth token
    const hashedPassword = await require('bcrypt').hash('password1234', 10);
    await User.create({
        email: 'test@example.com',
        password: hashedPassword,
    });

    authToken = jwt.sign({ email: 'test@example.com' }, JWT_SECRET, { expiresIn: '30d' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Clear collections before each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
    
    // Recreate test user
    const hashedPassword = await require('bcrypt').hash('password1234', 10);
    await User.create({
        email: 'test@example.com',
        password: hashedPassword,
    });
});

describe('Auth API Integration Tests', () => {
    describe('POST /api/login', () => {
        it('should login successfully with valid credentials', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'password1234',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.headers['set-cookie']).toBeDefined();
            expect(response.headers['set-cookie'][0]).toContain('token');
        });

        it('should return 400 for missing email', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    password: 'password1234',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('Email');
        });

        it('should return 400 for invalid email format', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'invalid-email',
                    password: 'password1234',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should return 400 for missing password', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('Пароль');
        });

        it('should return error for non-existent user', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'password1234',
                });

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('не найден');
        });

        it('should return error for wrong password', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('Неверный пароль');
        });
    });

    describe('POST /api/logout', () => {
        it('should logout successfully with valid token', async () => {
            const response = await request(app)
                .post('/api/logout')
                .set('Cookie', [`token=${authToken}`]);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should redirect without valid token (non-API path behavior)', async () => {
            // Note: This test shows the current behavior where logout without auth redirects
            // In a real scenario, you might want to handle this differently
            const response = await request(app)
                .post('/api/logout');

            // The auth middleware redirects for non-API paths
            expect(response.status).toBe(302);
            expect(response.headers.location).toBe('/');
        });
    });
});

describe('Tickets API Integration Tests', () => {
    describe('POST /api/tickets', () => {
        it('should create a ticket successfully with valid data', async () => {
            const ticketData = {
                name: 'Test Ticket',
                phone: '+1234567890',
                description: 'Test description',
            };

            const response = await request(app)
                .post('/api/tickets')
                .send(ticketData);

            expect(response.status).toBe(201);
            expect(response.body.name).toBe(ticketData.name);
            expect(response.body.phone).toBe(ticketData.phone);
            expect(response.body.description).toBe(ticketData.description);
            expect(response.body._id).toBeDefined();
            expect(response.body.date).toBeDefined();
        });

        it('should create a ticket without description', async () => {
            const ticketData = {
                name: 'Test Ticket',
                phone: '+1234567890',
            };

            const response = await request(app)
                .post('/api/tickets')
                .send(ticketData);

            expect(response.status).toBe(201);
            expect(response.body.name).toBe(ticketData.name);
            expect(response.body.phone).toBe(ticketData.phone);
        });

        it('should return 400 for missing name', async () => {
            const ticketData = {
                phone: '+1234567890',
            };

            const response = await request(app)
                .post('/api/tickets')
                .send(ticketData);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('Имя');
        });

        it('should return 400 for name less than 2 characters', async () => {
            const ticketData = {
                name: 'A',
                phone: '+1234567890',
            };

            const response = await request(app)
                .post('/api/tickets')
                .send(ticketData);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should return 400 for missing phone', async () => {
            const ticketData = {
                name: 'Test Ticket',
            };

            const response = await request(app)
                .post('/api/tickets')
                .send(ticketData);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('Телефон');
        });

        it('should return 400 for invalid phone format', async () => {
            const ticketData = {
                name: 'Test Ticket',
                phone: 'invalid-phone',
            };

            const response = await request(app)
                .post('/api/tickets')
                .send(ticketData);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should return 400 for phone less than 5 characters', async () => {
            const ticketData = {
                name: 'Test Ticket',
                phone: '1234',
            };

            const response = await request(app)
                .post('/api/tickets')
                .send(ticketData);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/tickets', () => {
        it('should return all tickets with valid auth', async () => {
            // Create some test tickets
            await Ticket.create([
                { name: 'Ticket 1', phone: '+1234567890', description: 'Desc 1' },
                { name: 'Ticket 2', phone: '+0987654321', description: 'Desc 2' },
            ]);

            const response = await request(app)
                .get('/api/tickets')
                .set('Cookie', [`token=${authToken}`]);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
            expect(response.body[0].name).toBe('Ticket 2'); // Sorted by date desc
        });

        it('should return empty array when no tickets exist', async () => {
            const response = await request(app)
                .get('/api/tickets')
                .set('Cookie', [`token=${authToken}`]);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });

        it('should return 401 without authentication', async () => {
            const response = await request(app)
                .get('/api/tickets');

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('авторизован');
        });

        it('should return 401 with invalid token', async () => {
            const response = await request(app)
                .get('/api/tickets')
                .set('Cookie', ['token=invalid-token']);

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });
    });
});
