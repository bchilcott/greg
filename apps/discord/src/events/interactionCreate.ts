import type { Client, CommandInteraction, Interaction } from 'discord.js';

import Commands from '../commands';

export default function handleInteractionCreate(client: Client) {
  client.on('interactionCreate', (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      handleSlashCommand(client, interaction);
    }
  });
}

function handleSlashCommand(client: Client, interaction: CommandInteraction) {
  const slashCommand = Commands.find(
    (c) => c.data.toJSON().name === interaction.commandName
  );
  if (!slashCommand) {
    interaction
      .reply({ content: 'No such command', ephemeral: true })
      .catch(console.error);
    return;
  }

  slashCommand.run(client, interaction).catch(console.error);
}
