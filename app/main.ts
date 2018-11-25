import * as PouchDB from "pouchdb";
import Store from "reactive-state";
import { App } from "./app";
import SockJS from "sockjs-client";
import * as m from "mithril";
import { routes } from "./routes";

const db = new PouchDB.default("oy");
const sockets = new SockJS(`http://0.0.0.0:8081/api`);
const app = new App();

m.route(document.body, "/", routes);
// hot reload webpack
if (module["hot"]) {
  console.info("HMR enabled");
  /*
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
  })
  */
}
