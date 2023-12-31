import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Adjust the path accordingly
import RootComponent from './components/RootComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <RootComponent />
      </div>
    </Provider>
  );
}

export default App;
