import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../query-client.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styles from './App.module.scss';
import TodoApp from '../components/TodoApp/index.tsx';

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className={styles.wrapper} data-testid='app'>
                <TodoApp />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
