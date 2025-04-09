import { ExtendedClient } from '../../models/ExtendedClient';

module.exports = (_: unknown, client: ExtendedClient) => {
  console.log('StartUp -> ' + 'Bot - Account: ' + client.user?.tag + ' is now online!');
};