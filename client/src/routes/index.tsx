import { Routes, Route } from 'react-router';
import { TicketsPage, TicketPage, LoginPage } from '../pages';

export const RoutesContainer = () => {
    const routes = [
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/',
            element: <TicketPage />,
        },
        {
            path: '/tickets',
            element: <TicketsPage />,
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
