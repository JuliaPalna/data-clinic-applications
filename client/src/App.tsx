import { useEffect } from 'react';
import { Header } from './components';
import { RoutesContainer } from './routes';
import { logoutApi } from './entities';

function App() {
    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('isAuthorization');

        console.log(!sessionAuth);

        if (!sessionAuth) {
            logoutApi();
        }
    }, []);

    return (
        <div className="px-10 pt-10">
            <Header />

            <main>
                <RoutesContainer />
            </main>
        </div>
    );
}

export default App;
