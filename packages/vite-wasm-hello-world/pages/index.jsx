import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Home from './home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
], {
  basename: import.meta.env.BASE_URL,
});

const Pages = () => <RouterProvider router={router} />;

export default Pages;
