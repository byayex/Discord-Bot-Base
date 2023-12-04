import { Client } from 'discord.js';

module.exports = (_Discord: any, client: Client) => {
  console.log('StartUp -> ' + 'Bot - Account: ' + client.user?.tag);
};