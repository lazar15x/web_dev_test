import Header from './components/header/Header';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
      </Provider>
    </>
  );
}

export default App;
