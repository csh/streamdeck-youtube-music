import streamDeck, {
  action,
  KeyAction,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { YouTubeMusicSettings } from "../settings";

type IsPlayingResponseFragment = {
  isPaused: boolean;
};

@action({ UUID: "com.smrkn.youtube-music-desktop.play-pause" })
export class PlayPauseAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    let { host, port } =
      await streamDeck.settings.getGlobalSettings<YouTubeMusicSettings>();

    try {
      await fetch(`http://${host}:${port}/api/v1/toggle-play`, {
        method: "POST",
      });

      let isPaused = await this.getIsPaused();
      await ev.action.setState(isPaused ? 1 : 0);
    } catch (error) {
      streamDeck.logger.error("Failed to toggle play/pause state", error);
      ev.action.showAlert();
    }
  }

  override async onWillAppear(ev: WillAppearEvent): Promise<void> {
    try {
      if (ev.action as KeyAction) {
        let action = ev.action as KeyAction;
        let isPaused = await this.getIsPaused();
        await action.setState(isPaused ? 1 : 0);
      }
    } catch (error) {
      streamDeck.logger.error(
        "Failed to set play/pause state on key appearance",
        error
      );
      ev.action.showAlert();
    }
  }

  private async getIsPaused(): Promise<boolean> {
    let { host, port } =
      await streamDeck.settings.getGlobalSettings<YouTubeMusicSettings>();
    let res = await fetch(`http://${host}:${port}/api/v1/song`);
    if (res.ok) {
      let { isPaused } = (await res.json()) as IsPlayingResponseFragment;
      return isPaused;
    } else {
      return false;
    }
  }
}
