import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExtendedClient } from "./ExtendedClient";

export interface Command {
  data: SlashCommandBuilder;
  execute: (client: ExtendedClient, interaction: ChatInputCommandInteraction) => Promise<void>;
}