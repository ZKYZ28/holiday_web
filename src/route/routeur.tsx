import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.tsx';
import ListHolidayPage from '../pages/ListHoliday/ListHolidayPage.tsx';
import MyHolidayPage from '../pages/MyHoliday/MyHolidayPage.tsx';
import ContactPage from '../pages/Contact/ContactPage.tsx';
import LoginPage from '../pages/Login/LoginPage.tsx';
import RegisterPage from '../pages/Register/RegisterPage.tsx';
import ChatPage from '../pages/Chat/ChatPage.tsx';
import EncodeHolidayPage from '../pages/EncodeHoliday/EncodeHolidayPage.tsx';
import EncodeActivityPage from '../pages/EncodeActivity/EncodeActivityPage.tsx';
import EncodeParticipantHolidayPage from '../pages/EncodeParticipantHoliday/EncodeParticipantHolidayPage.tsx';

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <span>404</span>,
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
          path: 'activity/:id',
          element: <EncodeActivityPage />,
        },
        {
          path: 'create',
          element: <EncodeHolidayPage />,
        },
        {
          path: 'participant/:id',
          element: <EncodeParticipantHolidayPage />,
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
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'chats',
      element: <ChatPage />,
    },
  ],
  {}
);

export default router;
