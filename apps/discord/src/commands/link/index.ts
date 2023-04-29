import { SlashCommandBuilder } from 'discord.js';

import type { SlashCommand } from '~/commands/types';
import api from '../../api';

const data = new SlashCommandBuilder()
  .setName('link')
  .setDescription('Link your Discord server with the GREG app')
  .setDMPermission(false);

export const Link: SlashCommand = {
  data: data,
  run: async (_client, interaction) => {
    if (
      interaction.guildId === null ||
      !interaction.member ||
      !interaction.member.user
    )
      return;

    const res = await api.guild.create.mutate({
      guildDiscordId: interaction.guildId,
      userDiscordId: interaction.member?.user.id,
    });

    if (res.error) {
      if (res.error.code === 409) {
        return await interaction.reply({
          ephemeral: true,
          content: 'Your server is already linked!',
        });
      }

      if (res.error.code === 404) {
        return await interaction.reply({
          ephemeral: true,
          content: `You're not a registered user - sign up at ${process.env.NEXTAUTH_URL}`,
        });
      }

      return await interaction.reply({
        ephemeral: true,
        content: 'An unknown error occurred.',
      });
    }

    return await interaction.reply({
      ephemeral: false,
      content: 'Your server has been linked!',
    });
  },
};

export default Link;
