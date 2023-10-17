import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.tsx';
import Login from '../pages/Login/Login.tsx';
import Register from '../pages/Register/Register.tsx';
import ListHolidayPage from '../pages/ListHoliday/ListHolidayPage.tsx';
import MyHolidayPage from '../pages/MyHoliday/MyHolidayPage.tsx';
import EncodeActivity from '../pages/EncodeActivity/EncodeActivity.tsx';
import EncodeHoliday from '../pages/EncodeHoliday/EncodeHoliday.tsx';
import ChatPage from '../pages/Chat/ChatPage.tsx';
import ContactPage from '../pages/Contact/ContactPage.tsx';
import Warden from '../components/common/Warden.tsx';
import EncodeParticipant from '../pages/EncodeParticipant/EncodeParticipant.tsx';
import { useAuth } from '../provider/AuthProvider.tsx';

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: '',
      element: <HomePage />,
    },
    {
      path: '*',
      element: <span>404</span>,
    },
    {
      path: 'contact',
      element: <ContactPage />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: 'holidays',
      element: (
        <Warden>
          <Outlet />
        </Warden>
      ),
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
          element: <EncodeActivity />,
        },
        {
          path: 'create',
          element: <EncodeHoliday />,
        },
        {
          path: 'participant/:id',
          element: <EncodeParticipant />,
        },
      ],
    },
    {
      path: 'myholiday',
      element: (
        <Warden>
          <MyHolidayPage />
        </Warden>
      ),
    },
    {
      path: 'chats',
      element: (
        <Warden>
          <ChatPage />
        </Warden>
      ),
    },
    {
      path: 'logout',
      element: (
        <Warden>
          <div>Logout</div>
        </Warden>
      ),
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
