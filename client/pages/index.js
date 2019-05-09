import React from 'react';
import styled from 'styled-components';

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
    <Layout title="Home">
      <Main>
        <Typography component="h2" variant="h4" className="page-header" color="textPrimary">
          dApps the Easy Way!
        </Typography>
        <Typography component="p" variant="h6" className="page-subheader" color="textSecondary">
          Application boilerplate built on top of{' '}
          <a href="https://www.arcblock.io/en/forge-sdk">forge (Ruby on Rails for Blockchain Space)</a> powered
          blockchain, with developer friendly{' '}
          <a href="https://docs.arcblock.io/forge/latest/sdk/javascript.html">javascript sdk</a>. Makes it super easy to
          start building distributed applications with tons of thousands of react/javascript libraries/components.
        </Typography>
        <Typography component="h3" variant="h5" className="page-subheader" color="textPrimary" gutterBottom>
          Quick Start
        </Typography>
        <div className="quickstart">
          <code>
            <pre>
              npm install -g @arcblock/forge-cli
              <br />
              forge init
              <br />
              forge start
              <br />
              forge create-project hello-forge
              <br />
              cd hello-forge
              <br />
              yarn start
            </pre>
          </code>
        </div>
        <Typography component="h3" variant="h5" className="page-subheader" color="textPrimary" gutterBottom>
          ABT Wallet Examples
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
                <Button component="a" href={x.link} size="small" color="primary">
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

  a {
    color: ${props => props.theme.colors.green};
    text-decoration: none;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-subheader {
    margin-bottom: 30px;
  }

  .demos {
    margin: 0 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .demo {
      width: 30%;
      height: 240px;
    }
  }

  .quickstart {
    margin-bottom: 50px;
  }

  pre {
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
      Courier New, monospace, serif;
    margin-bottom: 10px;
    border-radius: 10px;
    line-height: 1.5rem;
    padding: 25px;
    color: #ffffff;
    background-color: #222222;
    max-height: 600px;
  }
`;
