import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import './index.css'
import Home from './pages/Home/Home.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import Clothes from './pages/Clothes/Clothes.jsx'
import AppNavbar from './components/AppNavbar.jsx'
import AppFooter from "./components/AppFooter.jsx";
import ClotheDetails from './pages/ClotheDetails/ClotheDetails.jsx';
import ClotheSearch from './pages/ClotheSearch/ClotheSearch.jsx';
import ReservaPage from './pages/ReservaPage/ReservaPage.jsx';
import { loader as ClotheDetailsLoader } from './pages/ClotheDetails/ClotheDetails.jsx';

import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

function AppLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
      <AppFooter />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/clothes",
        element: <Clothes />,
      },
      {
        path: "/clotheDetails/:id",
        element: <ClotheDetails />,
        loader: ClotheDetailsLoader,
      },
      {
        path: "/clotheSearch/:query",
        element: <ClotheSearch />,
      },
      {
        path: "/reservaPage/:id",
        element: <ReservaPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
