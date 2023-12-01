import { configureStore } from '@reduxjs/toolkit';

// Importa tus reducers aquí
// import counterReducer from './features/counter/counterSlice';
import loginReducer from './Slices/LoginSlice';

export const store = configureStore({
  reducer: {
    // Agrega tus reducers aquí
    // counter: counterReducer,
    login: loginReducer,
  },
});

export default store;