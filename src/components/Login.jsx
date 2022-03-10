import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import actions from '../actions';

const Character = ({ character }) => {
    if (!character) {
        character = ' ';
    }
    return (
        <Box sx={{
            display: 'inline-block',
            background: '#fff',
            borderRadius: '5px',
            width: '40px',
            height: '55px',
            verticalAlign: 'top',
            m: '5px',
        }}>
            <Typography sx={{ fontSize: '40px' }}>
                {character}
            </Typography>
        </Box>
    );
}

export default function Login() {
    const dispatch = useDispatch();
    const keyboardRef = React.useRef();
    const inputRef = React.useRef();
    const [timerId, setTimerId] = React.useState(null);
    const authCode = useSelector(state => state.auth.authCode);
    const verifiedFlag = useSelector(state => state.auth.verifiedFlag);
    React.useEffect(() => {
        if (authCode.length >= 6) {
            dispatch(actions.auth.login());
        }
        if (authCode.length === 0) {
            keyboardRef.current.clearInput();
        }
    }, [dispatch, authCode]);
    React.useEffect(() => () => {
        clearTimeout(timerId);
    }, [timerId]);
    return (
        <Box
            sx={{
                background: '#eee',
                minHeight: '100vh',
                textAlign: 'center',
            }}
            onClick={() => {
                if (!inputRef) return;
                inputRef.current.focus();
                inputRef.current.selectionStart = 100;
                inputRef.current.selectionEnd = 100;
            }}
        >
            <Typography variant="h5" sx={{ pt: '40px', }}>
                ワンタイムパスワード
            </Typography>
            <Box sx={{ my: '20px' }}>
                <Character character={authCode.charAt(0)} />
                <Character character={authCode.charAt(1)} />
                <Character character={authCode.charAt(2)} />
                <span style={{ fontSize: '40px' }}>
                    -
                </span>
                <Character character={authCode.charAt(3)} />
                <Character character={authCode.charAt(4)} />
                <Character character={authCode.charAt(5)} />
            </Box>
            {
                (verifiedFlag === false) ?
                    <Typography color="error">
                        ログイン失敗
                    </Typography>
                    : null
            }
            {
                // 端末がタッチ（タップ）に対応しているか確認する
                (window.ontouchstart !== undefined && 0 < navigator.maxTouchPoints) ?
                    null// タッチ対応端末
                    :
                    // タッチ非対応端末
                    <TextField
                        autoComplete="off"
                        inputRef={inputRef}
                        autoFocus
                        value={authCode}
                        sx={{ opacity: 0, }}
                        onChange={(event) => dispatch(actions.auth.setAuthCode(event.target.value))}
                    />
            }
            <Box sx={{
                position: 'absolute',
                width: '100vw',
                bottom: '120px',
            }}    >
                <Box sx={{
                    width: '50%',
                    mx: 'auto',
                    maxWidth: '300px',
                    transform: "scale(2.0)",
                }} >
                    <Keyboard
                        keyboardRef={r => (keyboardRef.current = r)}
                        onKeyPress={async (button) => {
                            if (button === '{clear}') {
                                await dispatch(actions.auth.setAuthCode(''));
                            }
                            else if (button === '{bksp}') {
                                await dispatch(actions.auth.setAuthCode(authCode.slice(0, -1)));
                            }
                            else {
                                await dispatch(actions.auth.setAuthCode(authCode + button));
                            }
                            if (!inputRef) return;
                            const t = setTimeout(() => {
                                inputRef.current.focus();
                                inputRef.current.selectionStart = 100;
                                inputRef.current.selectionEnd = 100;
                            }, 100);
                            setTimerId(t);
                        }}
                        layout={{
                            default: [
                                "{clear} {bksp}",
                                "1 2 3",
                                "4 5 6",
                                "7 8 9",
                                " 0 ",
                            ],
                        }}
                        display={{
                            "{clear}": "Clear",
                            "{bksp}": "Backspace",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}