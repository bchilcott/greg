import { SlashCommandBuilder } from 'discord.js';

import type { SlashCommand } from '~/commands/types';
import api from '../../api';

const data = new SlashCommandBuilder()
  .setName('create')
  .setDescription('Create a mission')
  .setDMPermission(false)
  .addStringOption((option) =>
    option
      .setName('name')
      .setDescription('The name of the new mission')
      .setRequired(true)
  );

const Create: SlashCommand = {
  data: data,
  run: async (_client, interaction) => {
    const res = await api.mission.create.mutate({
      missionName:
        interaction.options.get('name')?.value?.toString() ??
        'Untitled Mission',
      userDiscordId: interaction.user.id,
      guildDiscordId: interaction.guildId ?? '',
    });

    if (res.error) {
      return await interaction.reply({
        content: res.error.message,
        ephemeral: true,
      });
    }

    const content = `Created mission \`${res.mission.name}\``;
    return await interaction.reply({
      content,
    });
  },
};

export default Create;
