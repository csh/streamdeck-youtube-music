import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { PlayPauseAction } from "./actions/play-pause";
import { NextAction } from "./actions/next";
import { PreviousAction } from "./actions/previous";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);

// Register the increment action.
streamDeck.actions.registerAction(new PlayPauseAction());
streamDeck.actions.registerAction(new PreviousAction());
streamDeck.actions.registerAction(new NextAction());

// Finally, connect to the Stream Deck.
streamDeck.connect();
