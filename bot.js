require('dotenv').config(); // Load environment variables from .env

const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

// Health-check endpoint so that Render can detect an open port
app.get('/', (req, res) => {
  res.send('PipCore Bot is up and running!');
});

// Initialize the Telegraf bot using the BOT_TOKEN from the environment variables
const bot = new Telegraf(process.env.BOT_TOKEN);

// Command handler for /start that sends a photo with a caption
bot.start((ctx) => {
  console.log(`New user: ${ctx.from.username || ctx.from.first_name}`);
  ctx.replyWithPhoto(
    { source: './PipCore.png' },
    {
      caption:
        'Welcome to the *PipCore*\n\n' +
        'first trading journal mini app on *Telegram*\\!\n\n' +
        '*you belong to us*\\,\n\n' +
        'track\\, analyze\\, and improve your trading with *PipCore*\\, the essential tool for refining your strategy and making informed decisions\\.\n\n' +
        '*PipCore* — _a place you can call the home of your trades_',
      parse_mode: 'MarkdownV2'
    }
  );
});

// Log all incoming messages for debugging
bot.on('message', (ctx) => {
  console.log(`Received message: ${ctx.message.text}`);
});

// Set up the Express server to handle webhook callbacks on the /webhook endpoint
app.use(bot.webhookCallback('/webhook'));

// Set the webhook URL using the WEBHOOK_URL from .env
bot.telegram.setWebhook(process.env.WEBHOOK_URL)
  .then(() => {
    console.log('Webhook was set successfully.');
  })
  .catch((err) => {
    console.error('Error setting webhook:', err);
  });

// Listen on the port provided by Render, or fallback to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log('PipCore Bot is running...');
