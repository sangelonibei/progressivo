
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { CounterDC } from "./CounterDC";
import { CounterDTA } from "./CounterDTA";

const router = createBrowserRouter([
  {
    path: "/dta",
    element: <CounterDTA />,
  },
  {
    path: "/dc",
    element: <CounterDC />,
  },
]);

function App() {
  
return  <RouterProvider router={router} />
  
}

export default App;
