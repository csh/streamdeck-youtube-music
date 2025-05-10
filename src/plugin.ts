import streamDeck from "@elgato/streamdeck";

import { PlayPauseAction } from "./actions/play-pause.action";
import { PreviousAction } from "./actions/previous.action";
import { PauseAction } from "./actions/pause.action";
import { NextAction } from "./actions/next.action";
import { PlayAction } from "./actions/play.action";

import { YouTubeMusicSettings } from "./settings";

// Register the increment action.
streamDeck.actions.registerAction(new PlayPauseAction());
streamDeck.actions.registerAction(new PauseAction());
streamDeck.actions.registerAction(new PlayAction());

streamDeck.actions.registerAction(new PreviousAction());
streamDeck.actions.registerAction(new NextAction());

streamDeck.settings.getGlobalSettings<YouTubeMusicSettings>().then(settings => {
    // If the settings are not set, we can set them to default values.
    if (!settings) {
        streamDeck.settings.setGlobalSettings<YouTubeMusicSettings>({
            host: "127.0.0.1",
            port: 26538
        });
    }
});

// Finally, connect to the Stream Deck.
streamDeck.connect();
