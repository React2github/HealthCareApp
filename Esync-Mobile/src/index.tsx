import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./hooks/auth";
import * as serviceWorker from "./serviceWorker";

import { QueryClient, QueryClientProvider,  } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

console.log(process.env.REACT_APP_API_URL)

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
    ,
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
