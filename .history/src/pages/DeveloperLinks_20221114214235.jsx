import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

export default function DeveloperLinks() {
    return (
        <Box sx={{ height: '100vh', overflowY: 'scroll', background: '#fff', }}>
            <Container sx={{ minHeight: '100vh', pt: '40px', }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    システム保守
                </Typography>
                <Divider />
                <Typography sx={{ my: 3, color: '#aaa' }}>
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
                <Divider />
                <Typography variant="h5" sx={{ mt: 3 }}>
                    GitHub
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://github.com/villad0522/furock-homepage">
                        ホームページのソースコード
                    </Link>
                    <br />
                    <Link target="_blank" href="https://github.com/villad0522/furock-adminpage">
                        管理ページのソースコード
                    </Link>
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ mt: 3 }}>
                    S3
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://s3.console.aws.amazon.com/s3/buckets/rentalserver-app?region=ap-northeast-1&tab=objects">
                        フロントエンド用バケット
                    </Link>　rentalserver-app
                    <br />
                    <Link target="_blank" href="https://s3.console.aws.amazon.com/s3/buckets/rentalserver-staffpage?region=ap-northeast-1&tab=objects">
                        管理ページ用バケット
                    </Link>　rentalserver-staffpage
                    <br />
                    <Link target="_blank" href="https://s3.console.aws.amazon.com/s3/buckets/rentalserver-image?region=ap-northeast-1&tab=objects">
                        画像用バケット
                    </Link>　rentalserver-image
                    <br />
                    <Link target="_blank" href="https://s3.console.aws.amazon.com/s3/buckets/rentalserver-json?region=ap-northeast-1&tab=objects">
                        JSON用バケット
                    </Link>　rentalserver-json
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ mt: 3 }}>
                    IAMユーザー
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://console.aws.amazon.com/iam/home#/users/GitHubActions">
                        GitHubActionsからS3へアップロードする用（AmazonS3FullAccess）
                    </Link>
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ mt: 3 }}>
                    IAMロール
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://us-east-1.console.aws.amazon.com/iamv2/home#/roles/details/rentalserver-role-rr0tsn92?section=permissions">
                        Lambda関数実行用
                    </Link>
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ mt: 3 }}>
                    Lambda
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://ap-northeast-1.console.aws.amazon.com/lambda/home?region=ap-northeast-1#/functions/rentalserver?fullscreen=true&newFunction=true&tab=code">
                        バックエンドプログラム
                    </Link>
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ mt: 3 }}>
                    CloudWatch
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://ap-northeast-1.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Frentalserver">
                        ログ
                    </Link>
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ mt: 3 }}>
                    DynamoDB
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://ap-northeast-1.console.aws.amazon.com/dynamodbv2/home?region=ap-northeast-1#item-explorer?initialTagKey=&table=rentalserver-authenticator">
                        管理者一覧
                    </Link>　rentalserver-authenticator
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ mt: 3 }}>
                    API Gateway
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <Link target="_blank" href="https://ap-northeast-1.console.aws.amazon.com/apigateway/home?region=ap-northeast-1#/apis/epn63s2g5a/resources/c9nckyuhre">
                        REST API
                    </Link>
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    https://epn63s2g5a.execute-api.ap-northeast-1.amazonaws.com/production
                    <span style={{ color: 'red' }}>/auth</span>
                </Typography>
                <Divider />
                <Box p={10} />
            </Container>
        </Box>
    );
}