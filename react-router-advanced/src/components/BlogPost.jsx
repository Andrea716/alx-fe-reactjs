import React from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams(); // Get the dynamic part of the route

  // You can now use the `id` to fetch or display data related to this blog post

  return (
    <div>
      <h1>Blog Post {id}</h1>
      {/* Render blog post details here */}
    </div>
  );
}

export default BlogPost;
