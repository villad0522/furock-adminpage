import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';


export default function App() {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Tabs
        orientation={"horizontal"}
        variant="fullWidth"
        value={location.pathname}
      >
        <Tab component={Link} label="編集" to="/" value="/" />
        <Tab component={Link} label="プレビュー" to="/preview" value="/preview" />
      </Tabs>
    </AppBar>
  );
}
