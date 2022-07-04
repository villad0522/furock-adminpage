import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { Link, } from "react-router-dom";
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PushDialog from '../components/PushDialog';
import actions from '../actions';

const MyCard = ({ publish, version, comment, dateString, operator, }) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);
    return (
        <Card sx={{
            my: 2,
            ml: 2,
            color: '#777',
            position: 'relative',
            minHeight: '60px',
        }}>
            <CardActionArea
                sx={{ p: 1, }}
                component={Link}
                to={"/web/ver" + version + "/preview_s"}
            >
                {publish ?
                    <Typography sx={{ fontSize: 'small' }} >
                        【公開中】
                    </Typography>
                    : null
                }
                <Typography align="center">
                    バージョン {version}
                </Typography>
                <Typography sx={{ fontSize: 'small' }} align="center">
                    {comment}
                </Typography>
                <Typography sx={{ fontSize: 'small' }} align="right">
                    {dateString}
                </Typography>
                <Typography sx={{ fontSize: 'small' }} align="right">
                    {operator}
                </Typography>
            </CardActionArea>
            <Button
                disabled={loading}
                size="small"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                }}
                onClick={() => dispatch(actions?.versions?.pull(version))}
            >
                <ChevronLeftIcon />取得
            </Button>
        </Card>
    );
};

export default function Versions() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);
    const oneTimeId = useSelector(state => state?.auth?.oneTimeId);
    const versionDatas = useSelector(state => state?.versions?.versionDatas);
    const pull = useSelector(state => state?.versions?.pull);
    React.useEffect(() => {
        if (!oneTimeId) {
            return;
        }
        dispatch(actions?.versions?.getVersionDatas());
    }, [dispatch, oneTimeId]);
    return (
        <Box sx={{
            background: '#eee',
            height: '100vh',
            overflowY: 'scroll',
        }}>
            <Container sx={{ pt: '20px', }}>
                <Typography variant="h5" >
                    レンタルサーバー 管理ページ
                </Typography>
            </Container>
            <Container maxWidth="sm">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                        }}>
                            <Paper sx={{
                                position: 'sticky',
                                top: '10px',
                                height: '75vh',
                                mt: 2,
                                p: 2,
                                textAlign: 'center',
                                color: '#777',
                                opacity: (loading && pull) ? 0.1 : 1,
                            }}>
                                <Typography variant="h5" sx={{ mt: '20vh' }}>
                                    下書き
                                </Typography>
                                <Button
                                    disabled={loading}
                                    variant="contained"
                                    sx={{ mt: '7vh', width: 'max-content', }}
                                    component={Link}
                                    to="/web/draft/editor"
                                >
                                    <Typography variant="h5" >
                                        編集する
                                    </Typography>
                                </Button>
                            </Paper>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Paper
                            elevation={0}
                            sx={{ my: 2, ml: 2, pt: 1, background: 'rgba(255,255,255,0.5)', }}
                        >
                            <Typography sx={{ color: '#999', textAlign: 'center', }}>
                                新しいバージョン
                            </Typography>
                            <Button
                                disabled={loading}
                                sx={{ ml: 1, mb: 1, background: '#fff', }}
                                onClick={() => dispatch(actions?.versions?.openPushDialog())}
                            >
                                <ChevronRightIcon />公開
                            </Button>
                        </Paper>
                        {[...versionDatas].reverse().map((versionData, i) =>
                            <MyCard
                                key={i}
                                publish={i === 0}
                                version={versionDatas.length - 1 - i}
                                comment={versionData.comment}
                                dateString={versionData.dateString}
                                operator={versionData.operator}
                            />
                        )}
                    </Box>
                </Box>
            </Container >
            <Box p={6} />
            <PushDialog />
        </Box >
    );
}