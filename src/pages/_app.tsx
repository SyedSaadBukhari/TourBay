import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import "../styles.scss";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Component {...pageProps} />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
