import Link from 'next/link';
import React from 'react';

import { IPost } from '../types';

interface Props {
  post: IPost;
}

const excerpt = (content: string[]): string => {
  if (Array.isArray(content) && content.length > 0) {
    const e = content[0];
    return `${e.substr(0, 125)}...`;
  }
  return 'No preview available...';
};

export const PostPreview: React.FC<Props> = ({ post }) => (
  <div style={{ marginBottom: 25 }}>
    <h2 style={{ fontSize: 16, textTransform: 'uppercase' }}>{post.title}</h2>
    <p>{excerpt(post.content)}</p>
    <Link
      href={{
        pathname: '/views/blog/[slug]',
        query: { slug: post.slug },
      }}
      as={`/blog/${post.slug}`}
      style={{
        display: 'inline-flex',
        background: 'black',
        color: 'white',
        padding: '5px 10px',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontSize: 12,
      }}
    >
      View
    </Link>
  </div>
);

export default PostPreview;
