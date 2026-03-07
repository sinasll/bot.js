require('dotenv').config();
<<<<<<< HEAD
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
=======

const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Optional: error catching
bot.catch((err, ctx) => {
  console.error('🚨 Bot error:', err);
});

// /start command
bot.start((ctx) => {
  console.log(`📩 /start by ${ctx.from.username || ctx.from.first_name}`);
  ctx.replyWithPhoto(
    { source: './PipCore.png' },
    {
      caption:
        'Welcome to the *PipCore*\\!\n\n' +
        'The first trading journal mini app on *Telegram*\\.\n\n' +
        '*You belong to us*\\,\n\n' +
        'Track\\, analyze\\, and improve your trading with *PipCore*\\, the essential tool for refining your strategy and making informed decisions\\.\n\n' +
        '*PipCore* — _a place you can call the home of your trades_',
      parse_mode: 'MarkdownV2'
    }
  );
});

// Log all messages (optional)
bot.on('message', (ctx) => {
  console.log(`📨 Message from ${ctx.from.username || ctx.from.first_name}: ${ctx.message.text}`);
});

// Webhook route
app.use(bot.webhookCallback('/webhook'));

// Raw body logging (optional debug)
app.post('/webhook', express.json(), (req, res, next) => {
  console.log('✅ Webhook received:', req.body);
  next();
});

// Set webhook once
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/webhook`)
  .then(() => {
    console.log('✅ Webhook set to:', `${process.env.WEBHOOK_URL}/webhook`);
  })
  .catch((err) => {
    console.error('❌ Failed to set webhook:', err);
  });

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 PipCore Bot is up and running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Express server listening on port ${PORT}`);
});
>>>>>>> f8cd662097a996a08f00eedc2f9279f8e14337df
