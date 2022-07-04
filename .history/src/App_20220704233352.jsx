import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import { Link, Route, Routes, useLocation, } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

import actions from './actions';
import Login from './components/Login';
import WebDialog from './pages/WebDialog';
import Versions from './pages/Versions';
import DeveloperLinks from './pages/DeveloperLinks';
import HowToLogin from './pages/HowToLogin';

export default function App() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const loading = useSelector(state => state.loading);
  const isLandscape = useMediaQuery(theme.breakpoints.up('md'));
  const verifiedFlag = useSelector(state => state.auth.verifiedFlag);
  const { pathname } = useLocation();
  const routes = ['billing', 'developer', 'howtologin'];
  const childPath = routes.find(route => (route === pathname.split('/')[1]));
  if (verifiedFlag !== true) {
    return (
      <>
        {
          loading ?
            <LinearProgress sx={{
              position: 'absolute',
              width: '100vw',
              top: 0,
            }} />
            : null
        }
        <Login />
      </>
    );
  }
  return (
    <Box sx={{
      display: isLandscape ? 'flex' : 'block',
    }}>
      <Box sx={{
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '0 5px 0 0',
        zIndex: 11,
        position: 'absolute',
        bottom: '-1px',
        left: 0,
        p: '7px',
      }} >
        <Button
          variant="outlined"
          onClick={() => dispatch(actions.auth.logout())}
        >
          ログアウト
        </Button>
      </Box>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          height: isLandscape ? '100vh' : 'max-content',
          textAlign: 'center',
          display: isLandscape ? 'block' : 'flex',
          background: '#f5f5f5',
        }}
      >
        <Tabs
          value={childPath ? childPath : '/'}
          orientation={isLandscape ? 'vertical' : 'horizontal'}
          variant="scrollable"
          sx={{
            width: isLandscape ? '120px' : 'auto',
            background: '#f5f5f5',
          }}
        >
          <Tab
            component={Link}
            label="ホームページ"
            to="/"
            value="/"
          />
          <Tab
            component={Link}
            label="ログイン方法"
            to="howtologin"
            value="howtologin"
          />
          <Tab
            component={Link}
            label="システム保守"
            to="developer"
            value="developer"
          />
        </Tabs>
      </Box>
      <Box sx={{
        width: '100%',
      }}>
        <Routes>
          <Route path="/howtologin/*" element={<HowToLogin />} />
          <Route path="/developer/*" element={<DeveloperLinks />} />
          <Route path="*" element={<Versions />} />
        </Routes>
      </Box>
      <WebDialog />
      {
        loading ?
          <LinearProgress sx={{
            zIndex: 9999,
            position: 'absolute',
            width: '100vw',
            top: 0,
          }} />
          : null
      }
    </Box>
  );
}
