const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  console.log(`Your Chat ID: ${msg.chat.id}`);
  bot.sendMessage(msg.chat.id, `Your Chat ID is: ${msg.chat.id}`);
});
