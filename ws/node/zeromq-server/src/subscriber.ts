import * as zmq from "zeromq";

export default class ZeroMqSubscriber<T> {
  constructor(host: string, port: number, topic: string) {
    this._host = host;
    this._port = port;
    this._topic = topic;
    this._sock = null;
  }

  private _host: string;
  private _port: number;
  private _topic: string;
  private _callbacks: ((msg: T) => void)[] = [];
  private _sock: zmq.Socket | null;

  public connect = () => {
    if (this._sock != null) {
      console.error(
        `${this._host}:${this._port} - ${this._topic} is already connected`
      );
      return;
    }
    this._sock = zmq.socket("sub");
    this._sock.connect(`tcp://${this._host}:${this._port}`);
    this._sock.subscribe(this._topic);
    this._sock.on("message", (topic: string, message: T) => {
      for (let i = 0; i < this._callbacks.length; i++) {
        this._callbacks[i](message);
      }
    });
    console.log(`${this._host}:${this._port} - ${this._topic} is connected`);
  };

  public disconnect = () => {
    if (this._sock == null) {
      console.error(
        `${this._host}:${this._port} - ${this._topic} is already disconnected`
      );
      return;
    }
    this._sock.close();
    for (let i = 0; i < this._callbacks.length; i++) {
      this._callbacks.pop();
    }
    this._sock = null;
    console.log(`${this._host}:${this._port} - ${this._topic} is disconnected`);
  };

  public set_callback = (cb: (msg: T) => void) => {
    this._callbacks.push(cb);
  };
}

function runServer() {
  const sock = zmq.socket("sub");

  // await sock.bind("tcp://127.0.0.1:5555");
  sock.on("message", (topic, message) => {
    console.log(`res topic: ${topic}, message: ${message}`);
    console.log(sock.closed);
  });
}

runServer();
