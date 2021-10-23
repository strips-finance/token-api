import { Guild } from "discord.js";
const Discord = require("discord.js");
const axios = require("axios");
const bot = new Discord.Client();

export async function priceBot() {
  bot.login(process.env.BOT_TOKEN);
  bot.on("ready", () => {
    setInterval(async () => {
      const status = await getPrice();
      const change = (Math.round(status.usd_24h_change * 100) / 100).toFixed(2);
      bot.user.setActivity(`STRP/USDC ${change}%`, { type: "WATCHING" });
      bot.guilds.cache
        .find((guild: Guild) => guild.id === process.env.GUILD_ID)
        .me.setNickname(
          `STRP ${status.usd_24h_change < 0 ? "📉" : "📈"} $${status.usd}`
        );
    }, 10000);
  });
  return {
    statusCode: 200,
  };
}

async function getPrice() {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=strips-finance&vs_currencies=usd&include_24hr_change=true"
  );
  let { usd, usd_24h_change } = res.data["strips-finance"];
  usd = Number(usd);
  usd_24h_change = Number(usd_24h_change);
  return { usd, usd_24h_change };
}
