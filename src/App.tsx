import React, { Suspense, useReducer } from "react";
import { store } from "./store/index";
import { Provider } from "react-redux";
import RouterIndex from "./routers/index";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { Theme, themeReducer, initState } from "./pages/Context";
function App() {
  const [state, dispatch]: any = useReducer(themeReducer, {
    theme: "sun",
  });
  // console.log(state, dispatch);
  return (
    <Provider store={store}>
      <Theme.Provider value={{ state, dispatch }}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <RouterIndex />
        </Suspense>
        <Footer />
      </Theme.Provider>
    </Provider>
  );
}
export default App;
