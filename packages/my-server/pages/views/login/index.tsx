import Page from 'my-react/src/pages/LoginPage';
import { NextPage } from 'next';

const LoginPage: NextPage = Page;

LoginPage.getInitialProps = (ctx) => {
  const { pathname } = ctx;

  return { pathname };
};

export default LoginPage;
