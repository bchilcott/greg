import { ApplicationCommandType } from 'discord.js';

import type { SlashCommand } from '~/commands/types';

export const Ping: SlashCommand = {
  name: 'ping',
  description: 'Returns a greeting',
  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {
    const content = 'Pong!';

    try {
      return interaction.followUp({
        ephemeral: false,
        content,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default Ping;
