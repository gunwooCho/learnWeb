import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const SidebarStyled = styled.div`
  margin-bottom: 15;
`;

const Sidebar: React.FC = () => (
  <div>
    <SidebarStyled>
      <Link
        href="/views/home"
        as="/"
        style={{
          fontSize: 22,
          textDecoration: 'none',
          textTransform: 'uppercase',
        }}
      >
        EXAMPLE APP
      </Link>
    </SidebarStyled>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <li>
        <Link href="/views/home" as="/">
          Home
        </Link>
      </li>
      <li>
        <Link href="/views/about" as="/about">
          About
        </Link>
      </li>
      <li>
        <Link href="/views/blog" as="/blog" prefetch={false}>
          Blog
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
