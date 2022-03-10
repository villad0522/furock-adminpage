import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import actions from '../actions';

export default function PushDialog() {
    const dispatch = useDispatch();
    const open = useSelector(state => state?.versions?.pushDialog);
    const operator = useSelector(state => state?.versions?.operator);
    const comment = useSelector(state => state?.versions?.comment);
    return (
        <Dialog
            open={open ? true : false}
            onClose={() => dispatch(actions?.versions?.closePushDialog())}
        >
            <DialogTitle>下書きを公開</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="確認者氏名"
                    fullWidth
                    variant="outlined"
                    value={operator}
                    onChange={(event) => dispatch(actions?.versions?.setOperator(event.target.value))}
                />
                <TextField
                    margin="dense"
                    label="コメント"
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    value={comment}
                    onChange={(event) => dispatch(actions?.versions?.setComment(event.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(actions?.versions?.closePushDialog())} >
                    キャンセル
                </Button>
                <Button onClick={() => dispatch(actions?.versions?.push())} >
                    公開
                </Button>
            </DialogActions>
        </Dialog>
    );
}
