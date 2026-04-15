import { Routes, Route } from 'react-router';
import { ApplicationsPage, ApplicationPage, LoginPage } from '../pages';

export const RoutesContainer = () => {
    const routes = [
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/',
            element: <ApplicationPage />,
        },
        {
            path: '/applications',
            element: <ApplicationsPage />,
        },
    ];

    return (
        <Routes>
            {routes.map((route) => {
                return <Route path={route.path} element={route.element} />;
            })}
        </Routes>
    );
};
