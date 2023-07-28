from setup_app import app
from handlers import hello
from typing import Union, List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, WebSocketException
import json
import threading
import asyncio
import zmq
import zmq.asyncio

connect_to = "tcp://localhost:5555"
# topics = [
#     'sports.general',
#     'sports.football',
#     'sports.basketball',
#     'stocks.general',
#     'stocks.GOOG',
#     'stocks.AAPL',
#     'weather',
# ]
topics = None #全てのtopicが対象
# ctx = zmq.Context()
ctx = zmq.asyncio.Context()
s = ctx.socket(zmq.SUB)
s.connect(connect_to)

# manage subscriptions
if not topics:
    print("Receiving messages on ALL topics...")
    s.setsockopt(zmq.SUBSCRIBE, b'')
else:
    print("Receiving messages on topics: %s ..." % topics)
    for t in topics:
        s.setsockopt(zmq.SUBSCRIBE, t.encode('utf-8'))

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        print('connect')
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        print('disconnect')
        self.active_connections.remove(websocket)
    def length(self) -> int:
        return len(self.active_connections)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        print('broadcast')
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

# ルーティングを設定する
app.add_api_route('/hello', hello.hello, methods=['post'])

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            topic, msg = await s.recv_multipart()
            res = {
                'topic': topic.decode('utf-8'),
                'msg': json.loads(msg.decode('utf-8')),
            }

            # if manager.length() > 0:
            #     manager.broadcast(json.dumps(res, indent=2, ensure_ascii=False))

            # data = await websocket.receive_text()
            # await manager.send_personal_message(f"You wrote: {data}", websocket)
            # await manager.broadcast(f"Client #{client_id} says: {data}")

            await manager.broadcast(json.dumps(res, indent=2, ensure_ascii=False))
            # await manager.broadcast(json.dumps({"message": "hello"}, indent=2, ensure_ascii=False))
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        # await manager.broadcast(f"Client #{client_id} left the chat")
    except:
        manager.disconnect(websocket)




def sub_zeromq():
    connect_to = "tcp://localhost:5555"
    # topics = [
    #     'sports.general',
    #     'sports.football',
    #     'sports.basketball',
    #     'stocks.general',
    #     'stocks.GOOG',
    #     'stocks.AAPL',
    #     'weather',
    # ]
    topics = None #全てのtopicが対象
    ctx = zmq.Context()
    s = ctx.socket(zmq.SUB)
    s.connect(connect_to)

    # manage subscriptions
    if not topics:
        print("Receiving messages on ALL topics...")
        s.setsockopt(zmq.SUBSCRIBE, b'')
    else:
        print("Receiving messages on topics: %s ..." % topics)
        for t in topics:
            s.setsockopt(zmq.SUBSCRIBE, t.encode('utf-8'))
    print
    try:
        while True:
            topic, msg = s.recv_multipart()
            res = {
                'topic': topic.decode('utf-8'),
                'msg': msg.decode('utf-8'),
            }
            # print(json.dumps(res, indent=2, ensure_ascii=False))
            print("websocket num: ", manager.length())
            if manager.length() > 0:
                manager.broadcast(json.dumps(res, indent=2, ensure_ascii=False))
    except KeyboardInterrupt:
        pass
    print("Done.")


# thread = threading.Thread(target=sub_zeromq)
# thread.start()

