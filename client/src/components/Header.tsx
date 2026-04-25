import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui';
import { logoutApi } from '@/entities';

export const Header: React.FC = () => {
    const navigate = useNavigate();

    const token = sessionStorage.getItem('isAuthorization');

    const onLogout = () => {
        logoutApi().then(() => {
            sessionStorage.removeItem('isAuthorization');
            navigate('/');
        });
    };

    return (
        <header className="w-full">
            {!token ? (
                <Link
                    to="/login"
                    className="text-foreground underline-offset-4 hover:underline px-6"
                >
                    Войти
                </Link>
            ) : (
                <Button variant="link" onClick={onLogout}>
                    Выйти
                </Button>
            )}
        </header>
    );
};
