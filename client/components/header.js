/* eslint no-return-assign:"off" */
import React, { useEffect } from 'react';
import qs from 'querystring';
import styled from 'styled-components';
import Link from 'next/link';
import useToggle from 'react-use/lib/useToggle';

import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

import Auth from './auth';
import UserAvatar from './avatar';
import useSession from '../hooks/session';

export default function Header() {
  const session = useSession();
  const [open, toggle] = useToggle(false);

  useEffect(() => {
    if (session.value && !session.value.user && window.location.search) {
      const params = qs.parse(window.location.search.slice(1));
      try {
        if (params.openLogin && JSON.parse(params.openLogin)) {
          toggle(true);
        }
      } catch (err) {
        // Do nothing
      }
    }
  }, [session]);

  return (
    <Nav>
      <div className="items">
        <Link href="/">
          <Typography variant="h6" color="inherit" noWrap className="brand">
            {process.env.appName}
          </Typography>
        </Link>
        {session.value && session.value.user && (
          <React.Fragment>
            <Button href="/profile" size="large">
              Profile
            </Button>
            <Button href="/payment" size="large">
              Payment
            </Button>
          </React.Fragment>
        )}
      </div>
      {session.loading && (
        <Button>
          <CircularProgress size={20} color="secondary" />
        </Button>
      )}
      {session.value && !session.value.user && (
        <Button color="primary" variant="outlined" onClick={toggle}>
          Login
        </Button>
      )}
      {session.value && session.value.user && (
        <Button href="/profile" className="avatar">
          <UserAvatar did={session.value.user.did} />
        </Button>
      )}
      {open && (
        <Dialog open maxWidth="sm" disableBackdropClick disableEscapeKeyDown onClose={toggle}>
          <Auth
            action="login"
            onClose={() => toggle()}
            onSuccess={() => (window.location.href = '/profile')}
            messages={{
              title: 'login',
              scan: 'Scan QR code with ABT Wallet',
              confirm: 'Confirm login on your ABT Wallet',
              success: 'You have successfully signed in!',
            }}
          />
        </Dialog>
      )}
    </Nav>
  );
}

const Nav = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  && {
    padding-left: 0;
    padding-right: 0;
  }

  .brand {
    margin-right: 60px;
    cursor: pointer;
  }

  .items {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;
