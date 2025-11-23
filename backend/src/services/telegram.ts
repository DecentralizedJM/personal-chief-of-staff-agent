import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
  polling: false,
});

export const sendTelegramMessage = async (text: string) => {
  await bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, text);
};
