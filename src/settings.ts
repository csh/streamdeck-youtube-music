import { JsonObject } from "@elgato/streamdeck";

export interface YouTubeMusicSettings extends JsonObject {
    host: string;
    port: number;
}