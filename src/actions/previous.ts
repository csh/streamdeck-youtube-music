import streamDeck, { action, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";

@action({ UUID: "com.smrkn.youtube-music-desktop.previous" })
export class PreviousAction extends SingletonAction {
    override async onKeyDown(ev: KeyDownEvent): Promise<void> {
        await fetch("http://localhost:26538/api/v1/previous", {
            method: "POST",
        }).catch(_ => {
            streamDeck.logger.error("Failed to change song");
            ev.action.showAlert();
        });
    }
}