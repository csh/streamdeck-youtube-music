import streamDeck, {
  action,
  KeyDownEvent,
  SingletonAction,
} from "@elgato/streamdeck";
import { YouTubeMusicSettings } from "../settings";

@action({ UUID: "com.smrkn.youtube-music-desktop.next" })
export class NextAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    let { host, port } =
      await streamDeck.settings.getGlobalSettings<YouTubeMusicSettings>();

    await fetch(`http://${host}:${port}/api/v1/next`, {
      method: "POST",
    }).catch((_) => {
      streamDeck.logger.error("Failed to change song");
      ev.action.showAlert();
    });
  }
}
