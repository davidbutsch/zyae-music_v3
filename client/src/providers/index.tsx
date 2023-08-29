import { BrowserRouter } from "react-router-dom";
import React from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return <BrowserRouter basename="/music">{children}</BrowserRouter>;
};
