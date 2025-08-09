const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');

const app = express();
app.use(express.json());

let qrCodeImage = null; // Aquí guardamos el QR en base64

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', async qr => {
    try {
        qrCodeImage = await QRCode.toDataURL(qr); // Genera imagen base64
        console.log('QR generado y listo para mostrar en navegador');
    } catch (err) {
        console.error('Error generando QR:', err);
    }
});

client.on('ready', () => {
    console.log('✅ Cliente de WhatsApp listo');
    qrCodeImage = null; // Limpia el QR una vez conectado
});

client.initialize();

// Endpoint para mostrar QR en navegador
app.get('/qr', (req, res) => {
    if (!qrCodeImage) {
        return res.send('<h2>No hay QR disponible (cliente ya conectado o en proceso)</h2>');
    }
    res.send(`
        <html>
        <body style="text-align:center;">
            <h1>Escanea el QR con tu WhatsApp</h1>
            <img src="${qrCodeImage}" />
        </body>
        </html>
    `);
});

app.listen(3000, () => console.log('🚀 Servidor en http://localhost:3000/qr'));
