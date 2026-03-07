require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express'); // Added Express

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('🚨 Missing BOT_TOKEN in .env.');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  console.log(`📩 /start from ${ctx.from.first_name}`);
  ctx.reply("👋 بخێرهاتی، بۆ دەستپێکرنا خزمەتگوزاریێن مە و ڤەکرنا پلاتفۆرمێ، هیڤییە دوگما ڤەکرن کلیک بکە!");
});

bot.on('message', (ctx) => {
  console.log(`📨 Message: ${ctx.message.text || 'non-text'}`);
});

console.log("🚀 FundKurd is starting in Polling mode...");

// Start the Telegram Bot
bot.telegram.deleteWebhook()
  .then(() => bot.launch())
  .then(() => console.log("🤖 Bot is live and listening for messages!"))
  .catch((err) => console.error("❌ Failed to start the bot:", err));

// --- NEW: Add a basic web server ---
const app = express();
app.get('/', (req, res) => res.send('FundKurd Bot is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web server listening on port ${PORT}`);
});
// -----------------------------------

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));