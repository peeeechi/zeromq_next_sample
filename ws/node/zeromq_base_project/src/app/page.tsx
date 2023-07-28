// import Image from 'next/image';
// import styles from './page.module.css';

// import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <main>
      <Container>
        <Card>
          <CardContent>
            <Typography>Main Page</Typography>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
