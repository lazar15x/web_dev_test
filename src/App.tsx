import Header from './components/header/Header';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main>
          <Home />
        </main>
        <footer style={{ backgroundColor: '#4F4F4F', height: '32px' }}></footer>
      </Provider>
    </>
  );
}

export default App;
