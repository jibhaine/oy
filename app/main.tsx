import Store from "reactive-state";
import { App } from "./app";
import * as io from "socket.io-client";
import { merge, fromEvent, Observable } from "rxjs";

import "./main.scss";
import routes from "./routes";
import { render } from "inferno";

const sockets = io.connect(`http://localhost:3000/api`);

// init
render(<App />, document.body);
// instead of addEventListener :
const close$: Observable<Event> = fromEvent(sockets, "close");
const open$: Observable<Event> = fromEvent(sockets, "open");
const error$: Observable<Event> = fromEvent(sockets, "error");
const data$: Observable<Event> = fromEvent(sockets, "data");
const socket$ = merge(close$, open$, error$, data$);

// document events
const keyDown$: Observable<Event> = fromEvent(document, "keydown");
const keyUp$: Observable<Event> = fromEvent(document, "keyup");
const keyPress$: Observable<Event> = fromEvent(document, "keypress");
const keyboard$ = merge(keyDown$, keyUp$, keyPress$);

const gamepadConnected$: Observable<Event> = fromEvent(
  window,
  "gamepadconnected",
);
const gamepadDisconnected$: Observable<Event> = fromEvent(
  document,
  "gamepaddisconnected",
);
const gamepad$ = merge(gamepadConnected$, gamepadDisconnected$);

// mouse events
const mouseMove$: Observable<Event> = fromEvent(document, "mousemove");
const mouseEnter$: Observable<Event> = fromEvent(document, "mouseenter");
const mouseLeave$: Observable<Event> = fromEvent(document, "mouseleave");
const mouse$ = merge(mouseMove$, mouseEnter$, mouseLeave$);

// window events
const beforeUnload$: Observable<Event> = fromEvent(document, "beforeunload");
const resize$: Observable<Event> = fromEvent(document, "resize");
const scroll$: Observable<Event> = fromEvent(document, "scroll");
const window$ = merge(beforeUnload$, resize$, scroll$);

// log all the events !
merge(socket$, mouse$, window$, gamepad$, keyboard$).subscribe(event => {
  console.log(`[EVT:${event.type}]`, event);
});

// hot reload webpack
if (module["hot"]) {
  console.info("HMR enabled");
  module["hot"].accept(function() {
    console.log("Accepting the updated module!");
  });
}
