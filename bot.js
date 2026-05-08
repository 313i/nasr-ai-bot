import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  bot.sendChatAction(chatId, "typing");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "أنت NASR AI مساعد ذكي، تجاوب بشكل واضح ومختصر وباللهجة العربية عند الحاجة."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content ||
      "صار خطأ، حاول مرة ثانية ⚠️";

    bot.sendMessage(chatId, answer);

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "⚠️ مشكلة بالاتصال، حاول لاحقاً");
  }
});
