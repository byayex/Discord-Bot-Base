import { Client } from 'discord.js';

module.exports = (_: unknown, client: Client) => {
  console.log('StartUp -> ' + 'Bot - Account: ' + client.user?.tag + ' is now online!');
};