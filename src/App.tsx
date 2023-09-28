import React, {StrictMode, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import queryClient from "./api/Queries/QueryClient.ts";

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
