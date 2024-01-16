import { Client } from "discord.js";
import DatabaseManager from "../utils/DatabaseManager";

export interface ExtendedClient extends Client {
    commands: any;
    connection: DatabaseManager;
}