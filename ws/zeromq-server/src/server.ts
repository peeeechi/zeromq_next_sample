//  Hello World server
//  Binds REP socket to tcp://*:5555
//  Expects "Hello" from client, replies with "World"

import * as zmq from "zeromq";

async function runServer() {
  const sock = new zmq.Reply();

  await sock.bind("tcp://*:5555");

  for await (const [msg] of sock) {
    console.log("Received " + ": [" + msg.toString() + "]");
    await sock.send("World");
    // Do some 'work'
  }
}

(async () => {
  await runServer();
})();
