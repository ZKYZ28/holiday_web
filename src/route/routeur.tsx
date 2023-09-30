import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.tsx';
import ListHolidayPage from '../pages/ListHoliday/ListHolidayPage.tsx';
import MyHolidayPage from '../pages/MyHoliday/MyHolidayPage.tsx';
import ContactPage from '../pages/Contact/ContactPage.tsx';
import ChatPage from '../pages/Chat/ChatPage.tsx';

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
      path: 'chats',
      element: <ChatPage />,
    },
  ],
  {}
);

export default router;
