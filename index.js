const TelegramBot = require("node-telegram-bot-api");

// ✅ BOT TOKEN from Railway / ENV
const token = "8585445516:AAGXnyMye4Kt2zm3ItU0kGCzOKPSfSEdAFA";


if (!token) {
  console.error("❌ BOT_TOKEN missing in environment variables");
  process.exit(1);
}

// Create bot
const bot = new TelegramBot(token, { polling: true });

console.log("🤖 Bot is running...");

// Channel link
const CHANNEL_URL = "https://t.me/Pankajbhardwaj_education";

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeText = `
<b>Welcome to Pankajbhardwaj_education! 📊🇮🇳</b>

Daily market insights, charts, and educational trading setups.
Tap the buttons below 👇
`;

  bot.sendMessage(chatId, welcomeText, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📢 Join Official Channel",
            url: CHANNEL_URL,
          },
        ],
        [
          {
            text: "I Joined 👍",
            callback_data: "joined",
          },
        ],
      ],
    },
  });

  bot.sendMessage(
    chatId,
    `⚠️ <b>Disclaimer:</b>
We do NOT provide investment advice.
All market analysis is ONLY for educational purposes.`,
    { parse_mode: "HTML" }
  );
});

// Button handler
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "joined") {
    bot.sendMessage(chatId, "✅ Thank you for joining! You will now receive updates.");
  }

  bot.answerCallbackQuery(query.id);
});
