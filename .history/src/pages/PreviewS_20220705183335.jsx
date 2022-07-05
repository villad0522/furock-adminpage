import * as React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";

export default function Preview({ version }) {
    const oneTimeId = useSelector(state => state.auth.oneTimeId);
    return (
        <Box
            sx={{
                mx: 'auto',
                maxWidth: '100%',
                width: '428px',
            }}
        >
            <iframe
                title="preview small"
                src={
                    "https://rentalserver-app.s3.ap-northeast-1.amazonaws.com/index.html?media=mobile&version="
                    + version + "&oneTimeId=" + oneTimeId + "&timestamp=" + (new Date().getTime())
                    //キャッシュ対策でタイムスタンプを入れる
                }
                style={{
                    margin: 0,
                    border: 0,
                    height: '99vh',
                    width: '100%',
                    background: '#fff',
                }}
            />
        </Box>
    );
}