import streamDeck, {
  action,
  KeyDownEvent,
  SingletonAction,
} from "@elgato/streamdeck";
import { YouTubeMusicSettings } from "../settings";

@action({ UUID: "com.smrkn.youtube-music-desktop.play" })
export class PlayAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    let { host, port } =
      await streamDeck.settings.getGlobalSettings<YouTubeMusicSettings>();

    await fetch(`http://${host}:${port}/api/v1/play`, {
      method: "POST",
    }).catch((_) => {
      streamDeck.logger.error("Failed to start playback");
      ev.action.showAlert();
    });
  }
}
