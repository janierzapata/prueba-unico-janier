import './App.css'
import { AppRouter } from './routes/AppRouter'
import { Provider } from 'react-redux';
import store from './redux/store';
import { useReducer } from 'react';


const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};


function App() {

  const [user, dispatch] = useReducer(store, {}, init);


  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
