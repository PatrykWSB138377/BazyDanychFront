import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import AdminPanel from './components/AdminPanel/AdminPanel';
import TableView from './components/TableView/TableView';
import EditView from './components/EditView/EditView';
import AddView from './components/AddView/AddView';
import CookieChecker from './components/CookieChecker/CookieChecker';

export const BASE_FRONT_URL = "http://localhost:3000"
export const BASE_BACKEND_URL = "http://localhost:3001"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminPanel />,
  },
  {
    path: "/view/:table",
    element: <TableView />,
  },
  {
    path: "/add/:table",
    element: <AddView />,
  },
  {
    path: "/view/:table/edit/:id",
    element: <EditView />,
  },


]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className={"main-wrapper"}>
    <CookieChecker>
      <RouterProvider router={router} />
    </CookieChecker>  
      </div>
  </React.StrictMode>
);