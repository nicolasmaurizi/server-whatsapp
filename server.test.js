const request = require('supertest');
const app = require('./server');

// Mock de whatsapp-web.js para no abrir Chrome en los tests
jest.mock('whatsapp-web.js', () => {
    return {
        Client: jest.fn().mockImplementation(() => ({
            on: jest.fn(),
            initialize: jest.fn(),
            sendMessage: jest.fn().mockResolvedValue(true)
        })),
        LocalAuth: jest.fn()
    };
});

describe('API WhatsApp', () => {
    test('POST /send - sin parámetros debe devolver 400', async () => {
        const res = await request(app)
            .post('/send')
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('POST /send - con parámetros válidos debe devolver 200', async () => {
        const res = await request(app)
            .post('/send')
            .send({ number: '5491123456789', message: 'Hola' });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('Mensaje enviado');
    });

    test('GET /qr - sin QR generado debe mostrar mensaje', async () => {
        const res = await request(app).get('/qr');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('No hay QR disponible');
    });
});
