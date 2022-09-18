import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import AppLayout from "./screens/AppLayout";
import { authRoutes, protectedRoutes } from "./screens/routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to={"/home"} />} />
            {protectedRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            {authRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
