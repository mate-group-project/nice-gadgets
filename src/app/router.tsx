import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },

            {
                path: 'catalog', element: <CatalogPage />
            }
        ]
    }
]);
