/** @format */

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/reactQueryClient";
import MainNavigator from "./navigation/MainNavigator";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigator />
    </QueryClientProvider>
  );
};

export default App;
