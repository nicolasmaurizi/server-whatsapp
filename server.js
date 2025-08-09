const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
app.use(express.json());

// Inicializa el cliente de WhatsApp con autenticación local (evita reescanear QR)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Cambiar a false para ver el navegador
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

// Evento: cuando se escanea el código QR
client.on('qr', qr => {
    console.log('Escanea este QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Evento: cliente listo
client.on('ready', () => {
    console.log('✅ Cliente de WhatsApp listo');
});

// Evento: cuando recibes un mensaje
client.on('message', msg => {
    console.log(`📩 Mensaje de ${msg.from}: ${msg.body}`);
    if (msg.body.toLowerCase() === 'ping') {
        msg.reply('pong 🏓');
    }
});

// Inicia el cliente
client.initialize();

// Endpoint para enviar un mensaje
app.post('/send', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ error: 'Faltan parámetros: number, message' });
    }

    try {
        // WhatsApp requiere el formato internacional sin "+" y con @c.us
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
        await client.sendMessage(chatId, message);
        res.json({ status: 'Mensaje enviado' });
    } catch (err) {
        console.error('❌ Error enviando mensaje:', err);
        res.status(500).json({ error: 'No se pudo enviar el mensaje' });
    }
});

// Levanta el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor Express en http://localhost:${PORT}`));
