import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import googleStoreImage from '../img/140848.jpg';
import appImage from '../img/140849.jpg';
import qrImage from '../img/qr20220704235731787.png';

export default function HowToLogin() {
    return (
        <Box sx={{ height: '100vh', overflowY: 'scroll', background: '#fff', }}>
            <Container sx={{ minHeight: '100vh', pt: '40px', }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    管理画面へのログイン方法
                </Typography>
                <Divider />
                <Typography sx={{ mt: 3 }}>
                    1. 手持ちのスマートフォンに、アプリ「Google Authenticator」をインストールしてください。
                </Typography>
                <img
                    alt=""
                    src={googleStoreImage}
                    style={{
                        width: '300px',
                        maxWidth: '100%',
                        marginLeft: '20px',
                        marginTop: '10px',
                    }}
                />
                <img
                    alt=""
                    src={appImage}
                    style={{
                        width: '300px',
                        maxWidth: '100%',
                        marginLeft: '20px',
                        marginTop: '10px',
                    }}
                />
                <Divider sx={{ mt: 3 }} />
                <Typography sx={{ mt: 3 }}>
                    2. アプリを開き、QRコードをスキャンしてFUROCK管理画面を登録してください。
                </Typography>
                <img
                    alt=""
                    src={qrImage}
                    style={{
                        width: '250px',
                        maxWidth: '100%',
                    }}
                />
                <Divider sx={{ mt: 3 }} />
                <Typography sx={{ mt: 3 }}>
                    3. 管理画面へログインできるようになります。
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://rentalserver-staffpage.s3.ap-northeast-1.amazonaws.com/index.html">
                        https://rentalserver-staffpage.s3.ap-northeast-1.amazonaws.com/index.html
                    </Link>
                </Typography>
                <Divider />
                <Box p={10} />
            </Container>
        </Box>
    );
}