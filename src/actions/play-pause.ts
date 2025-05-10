import streamDeck, { Action, action, JsonObject, KeyDownEvent, SingletonAction, Target, WillAppearEvent } from "@elgato/streamdeck";

@action({ UUID: "com.smrkn.youtube-music-desktop.play-pause" })
export class PlayPauseAction extends SingletonAction {
    private isPaused: boolean = false;

    override async onKeyDown(ev: KeyDownEvent): Promise<void> {
        streamDeck.logger.trace("is in multi action: " + ev.payload.isInMultiAction);

        if (this.isPaused) {
            await fetch("http://localhost:26538/api/v1/play", {
                method: "POST",
            }).then(res => {
                streamDeck.logger.info("Playing song");

                ev.action.setTitle("Playing", {
                    state: 1,
                    target: Target.HardwareAndSoftware
                });

                this.isPaused = false;
            }).catch(_ => {
                streamDeck.logger.error("Failed to play song");
                ev.action.showAlert();
            });
        } else {
            await fetch("http://localhost:26538/api/v1/pause", {
                method: "POST",
            }).then(_ => {
                streamDeck.logger.info("Paused song");

                ev.action.setTitle("Paused", {
                    state: 0,
                    target: Target.HardwareAndSoftware
                });

                this.isPaused = true;
            }).catch(_ => {
                streamDeck.logger.error("Failed to pause song");
                ev.action.showAlert();
            });
        }
    }

    override async onWillAppear(ev: WillAppearEvent<JsonObject>): Promise<void> {
        await fetch("http://localhost:26538/api/v1/song").then(response => {
            if (response.ok) {
                streamDeck.logger.trace("Received song data");
                response.json().then(data => {
                    this.isPaused = data.isPaused;
                    ev.action.setTitle(this.isPaused ? "Paused" : "Playing");
                });
            } else {
                streamDeck.logger.error("Failed to fetch song data");
                ev.action.showAlert();
            }
        });
    }
}