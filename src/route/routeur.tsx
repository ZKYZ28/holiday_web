import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.tsx';
import ListHolidayPage from '../pages/ListHoliday/ListHolidayPage.tsx';
import MyHolidayPage from '../pages/MyHoliday/MyHolidayPage.tsx';
import ContactPage from '../pages/Contact/ContactPage.tsx';
import Login from '../pages/Login/Login.tsx';
import Register from '../pages/Register/Register.tsx';
import ChatPage from '../pages/Chat/ChatPage.tsx';
import EncodeHoliday from "../pages/EncodeHoliday/EncodeHoliday.tsx";

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <span>NOT FOUND, FUCK YOU : So it's a 404 error here ;)</span>,
    },
    {
      path: '',
      element: <HomePage />,
    },
    {
      path: 'holidays',
      element: <Outlet />,
      children: [
        {
          path: '',
          element: <ListHolidayPage />,
        },
        {
          path: ':id',
          element: <MyHolidayPage />,
        },
        {
          path: 'create',
          element: <EncodeHoliday />,
        },
      ],
    },
    {
      path: 'myholiday',
      element: <MyHolidayPage />,
    },
    {
      path: 'contact',
      element: <ContactPage />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'chats',
      element: <ChatPage />,
    },
  ],
  {}
);

export default router;
