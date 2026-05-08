import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/routes/AppRouter";
// import { Provider } from 'react-redux' // If/when you add Redux store

export default function App() {
  return (
    // <Provider store={store}>    // <-- uncomment if using Redux
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    // </Provider>
  );
}