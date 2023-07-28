# フロント周りの環境構築とZeroMQキャッチアップ

[フロント周りの環境構築とZeroMQキャッチアップ](https://docs.google.com/document/d/1Y58TiXAPhURkQ22kMl2SExgcL9iZkyRYsxnz23FYMMs/edit?usp=sharing) に記載されている内容を確認するためのSandbox

## セットアップ

```bash
docker compose build
docker compose up -d
```

### node.js

Node.js のコンテナの方は、事前に依存パッケージをインストールしておく(git clone 時のみ)
```bash
docker compose exec node gosu node:node bash
# コンテナ内で
cd zeromq_base_project
npm i # or npm install
```

## Demo
以下をそれぞれ別のShellで実行する

### ZeroMQ publisher(remote controllerの代わり)
ZeroMQ のPublisherプロセスを起動する

```bash
docker compose exec python gosu gyoukaku:gyoukaku bash
# コンテナ内で
python zeromq_sample/topic_pub.py
```
### FastAPI Server(remote controller server の代わり)
FastAPI Serverのプロセスを起動する

```bash
docker compose exec python gosu gyoukaku:gyoukaku bash
# コンテナ内で
python app/run.py 
```

### GUI
Next.js のプロセスを起動する

```bash
docker compose exec node gosu node:node bash
# コンテナ内で
cd zeromq_base_project
npm run dev
```

ここまでやったら http://localhost:3300 にアクセス