import * as React from 'react';
import { useSelector } from "react-redux";

export default function Preview({ version }) {
    const oneTimeId = useSelector(state => state.auth.oneTimeId);
    return (
        <iframe
            title="preview small"
            src={
                "https://rentalserver-homepage.s3.ap-northeast-1.amazonaws.com/index.html?version="
                + version + "&oneTimeId=" + oneTimeId
            }
            style={{
                margin: 0,
                border: 0,
                height: '99vh',
                width: '100%',
                background: '#fff',
            }}
        />
    );
}