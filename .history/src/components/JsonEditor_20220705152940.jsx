import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDrag, useDrop } from 'react-dnd';

import FileUploader from './FileUploader';
import actions from '../actions';

export default function JsonEditor({ dataStructure, fileName }) {
    const dispatch = useDispatch();
    const oneTimeId = useSelector(state => state?.auth?.oneTimeId);
    const loading = useSelector(state => state.loading);
    React.useEffect(() => {
        if (!oneTimeId) {
            return;
        }
        dispatch(actions?.json.get(fileName));
    }, [dispatch, fileName, oneTimeId]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const files = useSelector(state => state?.json?.files);
    const categories = files[fileName] ? { ...files[fileName] } : {};
    return (
        <Box sx={{ background: '#eee', }}>
            <Container>
                <Typography align="center" >
                    <Button
                        disabled={loading}
                        variant="contained"
                        sx={{ my: 6, fontSize: '18px' }}
                        onClick={() => dispatch(actions?.json?.openDialog(fileName, "一般設定", 0))}
                    >
                        一般設定
                    </Button>
                </Typography>
                <Typography>
                    ドラッグ＆ドロップすることで、順序を入れ替えることができます。
                </Typography>
                <List sx={{ minHeight: '90vh', }}>
                    {Object.keys(categories)?.map((category, index) => {
                        const items = categories[category] ? [...categories[category]] : [];
                        return (
                            <Category
                                key={category}
                                fileName={fileName}
                                category={category}
                                items={items}
                            />
                        );
                    })}
                </List>
                <Box sx={{
                    position: 'sticky',
                    bottom: '10px',
                    width: '100%',
                    textAlign: 'right',
                    pointerEvents: 'none',
                }}>
                    <Fab
                        disabled={loading}
                        color="primary"
                        aria-label="add"
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                            dispatch(actions?.json?.openMenu());
                        }}
                        sx={{ pointerEvents: 'auto', }}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
                <MyDialog
                    dataStructure={dataStructure}
                />
                <MyMenu
                    dataStructure={dataStructure}
                    fileName={fileName}
                    anchorEl={anchorEl}
                />
            </Container>
        </Box>
    );
}
const Category = ({ fileName, category, items, }) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const ref = React.useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'KIMURA',
        drop(ballItem) {
            if (!ref.current) {
                return;
            }
            dispatch(actions?.json.move(
                ballItem.fileName,  //ballJsonFileName
                ballItem.category,  //ballCategory
                ballItem.index,     //ballIndex
                fileName,           //catchJsonFileName
                category,           //catchCategory
                0,                  //catchIndex
            ));
            ballItem.index = 0;
            setOpen(true);
            console.log(handlerId);
        },
    });
    drop(ref);
    if (category === "一般設定") {
        return null;
    }
    return (
        <Card sx={{ px: 2, py: 2, my: 4, }}>
            <ListItemButton onClick={() => setOpen(!open)} ref={ref}>
                {open ?
                    <ExpandLess sx={{ fontSize: '30px' }} /> :
                    <ExpandMore sx={{ fontSize: '30px' }} />
                }
                <Typography variant="h5">
                    {category}
                </Typography>
            </ListItemButton>
            <Collapse in={open}>
                <Grid container spacing={2}>
                    {items?.map((item, index) =>
                        <MyCard
                            key={category + '/' + items.uuid}
                            fileName={fileName}
                            category={category}
                            index={index}
                            item={item}
                        />
                    )}
                </Grid>
            </Collapse >
        </Card>
    );
}

const MyCard = ({ fileName, category, index, item }) => {
    const dispatch = useDispatch();
    const ref = React.useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'KIMURA',
        drop(ballItem) {
            if (!ref.current) {
                return;
            }
            dispatch(actions?.json.move(
                ballItem.fileName,  //ballJsonFileName
                ballItem.category,  //ballCategory
                ballItem.index,     //ballIndex
                fileName,           //catchJsonFileName
                category,           //catchCategory
                index,              //catchIndex
            ));
            ballItem.index = index;
            console.log(handlerId);
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'KIMURA',
        item: () => ({
            ...item,
            fileName,
            category,
            index,
        }),
    });
    drag(drop(ref));
    return (
        <Grid item xs={6} md={4} lg={3} >
            <Card
                ref={ref}
                sx={{
                    mt: 2,
                    opacity: isDragging ? 0 : 1,
                    cursor: 'grab',
                }}
            >
                <CardActionArea
                    onClick={() => dispatch(actions?.json.openDialog(fileName, category, index))}
                >
                    <CardMedia
                        component="img"
                        height="100"
                        image={item.image1}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography variant="h6" >
                        {item.title}
                    </Typography>
                    <Typography  >
                        {item.subTitle}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            maxHeight: '70px',
                            overflow: 'hidden',
                        }}
                    >
                        {item.text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => dispatch(actions?.json.openDialog(fileName, category, index))}
                        size="small"
                        color="primary"
                    >
                        編集
                    </Button>
                    <Button
                        color="error"
                        onClick={() => dispatch(actions?.json.delete(fileName, category, index))}
                    >
                        削除
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

const MyMenu = ({ dataStructure, fileName, anchorEl }) => {
    const dispatch = useDispatch();
    const open = useSelector(state => state?.json?.openMenu);
    //const categories = ["ページ", "商品"];
    const categories = Object.keys(dataStructure);
    return (
        <Menu
            open={open ? true : false}
            anchorEl={anchorEl}
            onClose={() => dispatch(actions?.json?.closeMenu())}
        >
            {categories.map(category => {
                if (category === "一般設定") {
                    return null;
                }
                return (
                    <MenuItem
                        key={category}
                        onClick={() => dispatch(actions?.json?.openDialog(fileName, category, null))}
                    >
                        {category}
                    </MenuItem>
                );
            })}
        </Menu>
    );
}

const MyDialog = ({ dataStructure }) => {
    const dispatch = useDispatch();
    const open = useSelector(state => state?.json?.openDialog);
    const fileName = useSelector(state => state?.json?.select?.fileName);
    const category = useSelector(state => state?.json?.select?.category);
    const index = useSelector(state => state?.json?.select?.index);
    const files = useSelector(state => state?.json?.files);
    const categories = files[fileName] ? { ...files[fileName] } : {};
    const items = categories[category] ? [...categories[category]] : [];
    const item = items[index] ? { ...items[index] } : {};
    const properties = dataStructure[category] ? [...dataStructure[category]] : [];
    return (
        <Dialog
            open={open ? true : false}
            onClose={() => dispatch(actions?.json.post())}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    {properties.map((property, index) =>
                        <Grid
                            item
                            key={String(property.key) + String(index)}
                            xs={property.width ? property.width : 12}
                        >
                            <MyInput
                                item={item}
                                property={property}
                            />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(actions?.json.post())} >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const MyInput = ({ item, property }) => {
    const dispatch = useDispatch();
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
        if (ready) {
            return;
        }
        setReady(true);
        if (item[property.key] || item[property.key] === 0) {
            return;
        }
        if (!property.defaultValue && property.defaultValue !== 0) {
            return;
        }
        console.log('データ初期化');
        dispatch(actions?.json.edit(property.key, property.defaultValue));
    }, [dispatch, item, property, ready]);
    if (property.type === "TEXT_FIELD") {
        return (
            <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                autoFocus={property.autoFocus ? true : false}
                label={property.label}
                multiline={property.multiline ? true : false}
                rows={property.rows ? property.rows : 1}
                value={item[property.key]}
                onChange={(event) => dispatch(actions?.json.edit(property.key, event.target.value))}
            />
        );
    }
    else if (property.type === "IMAGE_UPLOADER") {
        return (
            <FileUploader
                label={property.label}
                url={item[property.key]}
                onChange={newUrl => dispatch(actions?.json.edit(property.key, newUrl))}
            />
        );
    }
    else if (property.type === "HEADLINE") {
        return (
            <Typography variant="h5" sx={{ pt: 3 }}>
                {property.label}
            </Typography>
        );
    }
    else if (property.type === "DIVIDER") {
        return (
            <Divider sx={{ pt: 7, pb: 1, }} />
        );
    }
    else if (property.type === "SLIDER") {
        return (
            <>
                <Typography>
                    {property.label}
                </Typography>
                <Slider
                    value={item[property.key] ? item[property.key] : 0}
                    valueLabelDisplay="auto"
                    marks={property.marks ? property.marks : []}
                    step={property.step}
                    min={property.min}
                    max={property.max}
                    onChange={(event, newValue) => dispatch(actions?.json.edit(property.key, newValue))}
                />
            </>
        );
    }
    else if (property.type === "SWITCH") {
        console.log(item[property.key]);
        return (
            <FormControlLabel
                control={
                    <Switch
                        key={property.key}
                        value={item[property.key] ? true : false}
                        onChange={(event, newValue) => {
                            console.log(newValue);
                            dispatch(actions?.json.edit(property.key, newValue))
                        }}
                    />
                }
                label={property.label}
            />
        );
    }
    return null;
}