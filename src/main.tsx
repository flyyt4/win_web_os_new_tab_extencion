import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./index.css";
import App from "./App.tsx";
import ApisProvider from "./components/os/ApisProvider/ApisProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <NextThemesProvider>
        <ApisProvider>
          <App />
        </ApisProvider>
      </NextThemesProvider>
    </NextUIProvider>
  </StrictMode>
);
