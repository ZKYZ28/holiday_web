import { RouterProvider, Outlet, createHashRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.tsx';
import LoginPage from '../pages/Login/LoginPage.tsx';
import RegisterPage from '../pages/Register/RegisterPage.tsx';
import ListHolidayPage from '../pages/ListHoliday/ListHolidayPage.tsx';
import MyHolidayPage from '../pages/MyHoliday/MyHolidayPage.tsx';
import EncodeActivityPage from '../pages/EncodeActivity/EncodeActivityPage.tsx';
import EncodeHolidayPage from '../pages/EncodeHoliday/EncodeHolidayPage.tsx';
import ChatPage from '../pages/Chat/ChatPage.tsx';
import ContactPage from '../pages/Contact/ContactPage.tsx';
import Warden from '../components/common/Warden.tsx';
import EncodeParticipantHolidayPage from '../pages/EncodeParticipantHoliday/EncodeParticipantHolidayPage.tsx';
import { useAuth } from '../provider/AuthProvider.tsx';
import EncodeParticipantActivityPage from '../pages/EncodeParticipantActivity/EncodeParticipantActivityPage.tsx';
import EditHolidayPage from '../pages/EditHoliday/EditHolidayPage.tsx';
import EditActivityPage from '../pages/EditActivity/EditActivityPage.tsx';

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
          path: ':id/activity',
          element: <EncodeActivityPage />,
        },
        {
          path: ':id/activity/:id',
          element: <EditActivityPage />,
        },
        {
          path: 'holiday',
          element: <EncodeHolidayPage />,
        },
        {
          path: 'holiday/:id',
          element: <EditHolidayPage />,
        },
        {
          path: 'participant/:id',
          element: <EncodeParticipantHolidayPage />,
        },
      ],
    },
    {
      path: 'activity/participants/:id',
      element: <EncodeParticipantActivityPage />,
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
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'contact',
      element: <ContactPage />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createHashRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
