import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Layout from '../components/layout';

const demos = [
  {
    title: 'Login',
    subtitle: 'Example 1',
    description:
      'Use ABT Wallet to login to an application built on top of a forge powered blockchain, and persist user info in the session',
    link: '/profile',
  },
  {
    title: 'Checkin',
    subtitle: 'Example 2',
    description: 'Help user to get some free tokens on the blockchain to test our application',
    link: '/profile',
  },
  {
    title: 'Payment',
    subtitle: 'Example 3',
    description: 'Allow user to pay for an secret document with crypto token, and records payment info in database.',
    link: '/payment',
  },
];

export default function IndexPage() {
  return (
    <Layout>
      <Main>
        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
          {process.env.appName}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
          Application boilerplate built on top of <a href="https://www.arcblock.io/en/forge-sdk">forge</a> powered
          blockchain, with developer friendly{' '}
          <a href="https://docs.arcblock.io/forge/latest/sdk/javascript.html">forge javascript sdk</a>. Makes it super
          easy to start building distributed applications with tons of thousands of react/javascript
          libraries/components
        </Typography>
        <div className="demos">
          {demos.map(x => (
            <Card key={x.title} className="demo">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {x.subtitle}
                </Typography>
                <Typography component="h2" variant="h5" gutterBottom>
                  {x.title}
                </Typography>
                <Typography component="p" variant="subtitle1" gutterBottom>
                  {x.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component="a" to={x.link} size="small" color="primary">
                  Tyr Now
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Main>
    </Layout>
  );
}

const Main = styled.main`
  margin: 80px 0 0;

  .demos {
    margin: 50px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .demo {
      width: 360px;
      height: 240px;
    }
  }
`;
