import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import { Link, Route, Routes, useLocation, } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';

import JsonEditor from '../components/JsonEditor';
import PreviewL from './PreviewL';
import PreviewM from './PreviewM';
import PreviewS from './PreviewS';

import dataStructure from '../dataStructure.json';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref}  {...props} />;
});

export default function WebDialog() {
    const { pathname } = useLocation();
    const pathArray = pathname.split('/');
    const parentPath = (pathArray.length >= 2) ? pathArray[1] : null;
    const version = (pathArray.length >= 3) ? pathArray[2] : null;
    const childPath = (pathArray.length >= 4) ? pathArray[3] : null;

    const routes = [
        'editor',
        '',
        'preview_m',
        'preview_s',
    ];
    const pathname2 = routes.find(route => (route === childPath));

    const theme = useTheme();
    const isLandscape = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Dialog
            open={parentPath === 'web'}
            fullScreen
            TransitionComponent={Transition}
        >
            <Box sx={{
                display: isLandscape ? 'flex' : 'block',
                background: '#f5f5f5',
            }}>
                <Box sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    textAlign: 'center',
                    display: isLandscape ? 'block' : 'flex',
                    height: isLandscape ? '99vh' : 'max-content',
                    background: '#f5f5f5',
                }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/"
                        sx={{
                            width: 'max-content',
                            height: 'max-content',
                            my: isLandscape ? '10px' : '5px',
                        }}
                    >
                        戻る
                    </Button>
                    {isLandscape ?
                        <Typography variant="h5" sx={{ my: 2 }} >
                            {(version === "draft") ? "下書き" : version}
                        </Typography>
                        : null
                    }
                    <Tabs
                        value={pathname2 ? pathname2 : ""}
                        orientation={isLandscape ? 'vertical' : 'horizontal'}
                        variant="scrollable"
                        sx={{ width: isLandscape ? '120px' : 'auto', }}
                    >
                        {
                            (version === 'draft') ?
                                <Tab
                                    component={Link}
                                    label="編集"
                                    to={'/web/draft/editor'}
                                    value='editor'
                                />
                                : null
                        }
                        <Tab
                            component={Link}
                            label="プレビュー大"
                            to={'/web/' + version}
                            value=''
                        />
                        <Tab
                            component={Link}
                            label="プレビュー中"
                            to={'/web/' + version + '/preview_m'}
                            value='preview_m'
                        />
                        <Tab
                            component={Link}
                            label="プレビュー小"
                            to={'/web/' + version + '/preview_s'}
                            value='preview_s'
                        />
                    </Tabs>
                </Box>
                <Box sx={{ background: '#000', width: '100%', }}>
                    <Routes>
                        <Route path="/web/:version/editor" element={
                            <JsonEditor
                                dataStructure={dataStructure}
                                fileName="web-contents.json"
                            />
                        } />
                        <Route path="/web/:version/preview_m" element={
                            <PreviewM version={version} />
                        } />
                        <Route path="/web/:version/preview_s" element={
                            <PreviewS version={version} />
                        } />
                        <Route path="/web/:version/*" element={
                            <PreviewL version={version} />
                        } />
                        <Route path="*" element={null} />
                    </Routes>
                </Box>
            </Box>
        </Dialog >
    );
}
