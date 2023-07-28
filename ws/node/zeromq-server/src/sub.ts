//  Hello World server
//  Binds REP socket to tcp://*:5555
//  Expects "Hello" from client, replies with "World"

import * as zmq from "zeromq";
import Sub from "./subscriber";

function runServer() {
  const sub = new Sub("127.0.0.1", 5555, "test/message");

  sub.set_callback((msg) => {
    console.log(`res message: ${msg}`);
  });

  sub.connect();
  sub.connect();

  setTimeout(() => {
    sub.disconnect();
    sub.connect();
    sub.set_callback((msg) => {
      console.log(`res message: ${msg}`);
    });
    setTimeout(() => {
      sub.disconnect();
      process.exit(0);
    }, 1000);
  }, 5000);
}

runServer();
