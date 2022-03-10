import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function Billing() {
    return (
        <Box sx={{ height: '100vh', overflowY: 'scroll', background: '#fff', }}>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ pt: '40px', textAlign: 'left', }}>
                    サーバー代
                </Typography>
                <Box p={3} />
                <Button
                    variant="contained"
                    target="_blank"
                    href="https://console.aws.amazon.com/billing/home?region=ap-northeast-1#/bills"
                >
                    <Typography variant="h5">
                        請求書を見る
                    </Typography>
                </Button>
                <Typography sx={{ mt: 3 }}>
                    <Link target="_blank" href="https://console.aws.amazon.com/billing/home?#/paymentmethods">
                        お支払い方法を変更する
                    </Link>
                </Typography>
                <Typography sx={{ mt: 3 }}>
                    <Link target="_blank" href="https://console.aws.amazon.com/billing/home?region=ap-northeast-1#/tax-settings">
                        納税登録
                    </Link>
                </Typography>
                <Typography sx={{ mt: 3, color: '#aaa' }}>
                    <Link
                        sx={{ color: 'red', textDecorationColor: 'red' }}
                        target="_blank"
                        href="https://console.aws.amazon.com/billing/home?#/account"
                    >
                        サーバーを解約
                    </Link>
                    <br />
                    ※リンク先のページ下部に解約のボタンがあります。
                    <br />
                    ※この管理プログラム自体も削除され、二度と復旧できません。
                </Typography>
                <Box p={10} />
            </Container>
        </Box>
    );
}