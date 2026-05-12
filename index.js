const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;

// مهم: polling فقط بدون Express
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  bot.sendMessage(chatId, "🤖 وصلت رسالتك: " + text);
});

console.log("Bot is running...");
