import { createHashRouter } from "react-router";
import App from '../view/App';
import Insert from "../view/insert";
import Update from "../view/update";
import Delete from "../view/delete";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/insert",
        element: <Insert />,
    },
    {
        path: "/update",
        element: <Update />,
    },
    {
        path: "/delete",
        element: <Delete />,
    },
])