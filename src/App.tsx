import {StrictMode,} from 'react'
import {QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import queryClient from "./api/Queries/QueryClient.ts";
import router from "./route/routeur.tsx";

function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    );
}

export default App
