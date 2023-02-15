import { NextPage, NextPageContext } from 'next';
import React from 'react';

interface Props {
  query: { name?: string };
}

const Home: NextPage<Props> = ({ query }) => {
  const greetName = query?.name || 'World';

  return (
    <div>
      <div>Hello, {greetName}!</div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const query = {
    name: ctx.query.name || null,
  };
  return { props: { query } };
}

export default Home;
