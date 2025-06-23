const TelegramBot = require('node-telegram-bot-api');
const token = 7928471820:AAFlMwvByyxhMw8ei1_aI36Fm3xV-eXIB_k;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  console.log(`Your Chat ID: ${msg.chat.id}`);
  bot.sendMessage(msg.chat.id, `Your Chat ID is: ${msg.chat.id}`);
});
