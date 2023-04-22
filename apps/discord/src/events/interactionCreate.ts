import type { Client, CommandInteraction, Interaction } from 'discord.js';

import Commands from '../commands';

export default function handleInteractionCreate(client: Client) {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
}

async function handleSlashCommand(
  client: Client,
  interaction: CommandInteraction
): Promise<void> {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction
      .reply({ content: 'test', ephemeral: true })
      .catch(console.error);
    return;
  }

  await interaction.deferReply();

  slashCommand.run(client, interaction).catch(console.error);
}
