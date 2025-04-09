import { Client, Collection } from "discord.js";
import { DatabaseManager } from "../utils/Database/DatabaseManager";
import { Command } from "./Command";

export interface ExtendedClient extends Client {
    commands: Collection<string, Command>;
    connection: DatabaseManager;
}