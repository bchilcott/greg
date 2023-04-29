import type {
  Client,
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
} from 'discord.js';

export interface SlashCommand {
  data: Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
  run: (
    client: Client,
    interaction: CommandInteraction
  ) => Promise<InteractionResponse<boolean> | undefined>;
}
