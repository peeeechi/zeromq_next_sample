'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const ws_endpoint = 'ws://10.211.91.16:5500/ws/1';
type Log = {
  topic: string;
  msg: {
    count: number;
    message: string;
    timestamp: string;
  };
};

const log_buf: Log[] = [];
export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    // WebSocket 接続を作成
    const socket = new WebSocket(ws_endpoint);

    // 接続が開いたときのイベント
    socket.addEventListener('open', (event) => {
      socket.send('Hello Server!');
    });

    // メッセージの待ち受け
    socket.addEventListener('message', (event) => {
      // console.log(event.data);
      const log = JSON.parse(event.data) as Log;
      log_buf.push(log);
      while (log_buf.length > 20) {
        log_buf.shift();
      }
      setLogs([...log_buf]);
    });
  }, []);
  return (
    <main>
      <Container>
        <Card>
          <CardContent>
            <Typography>Log View Page</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Topic name</TableCell>
                    <TableCell>TimeStamp</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {logs.map((row, i) => {
                    // console.log(row.topic, row.msg.timestamp, row.msg.message);
                    console.log(row);
                    return (
                      <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row.topic}</TableCell>
                        <TableCell>{row.msg.timestamp}</TableCell>
                        <TableCell>{row.msg.message}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
