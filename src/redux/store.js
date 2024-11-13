
// configureStore: Esto incluye la configuración de middleware como redux-thunk para 
//                 manejar acciones asíncronas y la integración con la extensión 
//                 Redux DevTools para facilitar la depuración.

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './sliders/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
