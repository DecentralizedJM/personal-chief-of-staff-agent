import axios from "axios";

export const sendTelegramMessage = async (text: string) => {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: CHAT_ID,
      text,
    });
  } catch (err) {
    console.error("🔥 Telegram Error:", err);
  }
};
