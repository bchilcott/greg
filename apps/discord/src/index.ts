// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';

import Commands from './commands';
import handleInteractionCreate from './events/interactionCreate';

const TOKEN = process.env.BOT_TOKEN as string;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on('ready', async () => {
  if (!client.user || !client.application) {
    return;
  }

  const rest = new REST().setToken(TOKEN);

  await rest.put(
    Routes.applicationCommands(process.env.BOT_CLIENTID as string),
    { body: Commands }
  );

  console.log(`Registered ${Commands.length} slash commands`);
});

handleInteractionCreate(client);

// Log in to Discord with your client's token
client
  .login(TOKEN)
  .then(() => console.log('Connected to Discord'))
  .catch(console.error);
