import { RouteObject, redirect } from "react-router-dom";
import { RouteNames } from "@/models/router";
import Exercise1 from "@/pages/Exercise1";
import Exercise2 from "@/pages/Exercise2";
import { getPriceSteps } from "@/services/priceData";
import ErrorPage from "@/pages/ErrorPage";
import Layout from "@/layouts/Layout";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RouteNames.exercise1,
        element: <Exercise1 />,
        errorElement: <ErrorPage />,
      },
      {
        path: RouteNames.exercise2,
        element: <Exercise2 />,
        loader: async () => {
          return getPriceSteps();
        },
      },
    ],
  },
];

export default routes;
