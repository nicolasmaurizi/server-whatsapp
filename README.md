🚀 Proyecto rápido: Enviar y recibir mensajes de WhatsApp desde Node.js

Estos días estuve probando whatsapp-web.js integrado con Express para crear una API sencilla que permite:

✅ Mostrar el código QR de conexión en el navegador.
✅ Enviar mensajes de WhatsApp vía POST desde cualquier cliente.
✅ Responder mensajes de forma programática.

🔍 ¿Por qué hacerlo?

Integración con sistemas internos.

Automatización de notificaciones a clientes.

Respuesta automática a ciertos comandos.

📄 Documentación básica del proyecto

Endpoint para ver QR: GET /qr

Endpoint para enviar mensaje:

POST /send
{
  "number": "Country code + area code + phone number",
  "message": "Hola desde Node.js 🚀"
}

Cliente autenticado con LocalAuth para no tener que escanear cada vez.

⚠️ Nota importante: No usar para spam masivo, WhatsApp puede bloquear cuentas por automatización abusiva.

💬 Creo que este tipo de integraciones pueden ser un gran paso para soluciones de atención al cliente, seguimiento de pedidos y bots de soporte.
