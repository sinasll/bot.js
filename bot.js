require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('🚨 Missing BOT_TOKEN in .env.');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// --- Bot Logic ---

bot.start((ctx) => {
  console.log(`📩 /start from ${ctx.from.first_name}`);
  // Professional Badini greeting for FundKurd
  ctx.reply("بەخێرهاتی بۆ دەستپێکردنی خزمەتگوزارییەکانمان و کردنەوەی پلاتفۆرمەکە، تکایە کلیک لەسەر دوگمەی "کردنەوە" بکە");
});

bot.on('message', (ctx) => {
  const text = ctx.message.text || 'non-text';
  console.log(`📨 Message from ${ctx.from.first_name}: ${text}`);
});

// --- Start Bot (Polling Mode) ---

bot.telegram.deleteWebhook()
  .then(() => {
    console.log("✅ Webhook deleted, switching to Polling.");
    return bot.launch();
  })
  .then(() => {
    console.log("🤖 FundKurd Bot is live and listening!");
  })
  .catch((err) => {
    console.error("❌ Failed to start the bot:", err);
  });

// --- Web Server (To keep Render awake) ---

app.get('/', (req, res) => {
  res.send('🚀 FundKurd Bot is running 24/7!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Health-check server listening on port ${PORT}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
