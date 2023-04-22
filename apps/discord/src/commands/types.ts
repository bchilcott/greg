import type {
  ChatInputApplicationCommandData,
  Client,
  CommandInteraction,
  Message,
} from 'discord.js';

export interface SlashCommand extends ChatInputApplicationCommandData {
  run: (
    client: Client,
    interaction: CommandInteraction
  ) => Promise<Message<boolean> | undefined>;
}
