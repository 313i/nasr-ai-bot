const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

// رد بسيط (ذكاء اصطناعي وهمي كبداية)
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  bot.sendMessage(chatId, "🤖 استلمت رسالتك: " + text);
});

// تشغيل السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Bot is running on port " + port);
});
