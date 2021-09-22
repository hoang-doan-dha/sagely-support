import './App.css';
import { Provider } from 'react-redux';
import configureStore from './store';
import AppRouting from './App-routing';


const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouting/>
      </Provider>
    </div>
  );
}

export default App;
