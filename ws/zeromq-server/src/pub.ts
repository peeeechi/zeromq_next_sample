//  Hello World server
//  Binds REP socket to tcp://*:5555
//  Expects "Hello" from client, replies with "World"

import * as zmq from "zeromq";

const port = 5555;

function runServer() {
  const sock = zmq.socket("pub");

  sock.bindSync(`tcp://*:${port}`);
  console.log(`Publisher bound to port ${port}`);
  setInterval(() => {
    sock.send(["test/message", JSON.stringify({ message: "hello from pub" })]);
  }, 500);
}

runServer();
