const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const TelegramBot = require('node-telegram-bot-api');

// Config
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'; // Send /start to bot to get this
const ALLOWED_WHATSAPP_NUMBERS = ['1234567890@c.us']; // Numbers to forward

// Initialize Telegram Bot
const telegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Initialize WhatsApp Client
const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

// WhatsApp QR Code Generation
whatsappClient.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

// WhatsApp Authentication Ready
whatsappClient.on('ready', () => {
  console.log('WhatsApp client is ready!');
});

// Handle WhatsApp Messages
whatsappClient.on('message', async msg => {
  if (msg.fromMe) return; // Ignore self messages
  if (!ALLOWED_WHATSAPP_NUMBERS.includes(msg.from)) return; // Filter contacts

  try {
    const contact = await msg.getContact();
    const messageText = `📱 *WhatsApp* from ${contact.name || contact.number}:\n${msg.body}`;
    
    // Send to Telegram
    telegramBot.sendMessage(TELEGRAM_CHAT_ID, messageText, {
      parse_mode: 'Markdown'
    });
    
    console.log(`Forwarded message from ${contact.number}`);
  } catch (error) {
    console.error('Forwarding error:', error);
  }
});

// Start services
whatsappClient.initialize();
console.log('Bridge running. Scan QR code above');
