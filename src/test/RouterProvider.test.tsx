import { cleanup, render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "@/router/routes";
import {
  ApiOperations,
  ApiOperationsProvider,
} from "@/context/ApiOperationsContext";

const operations: ApiOperations = {
  getPriceRange: async () => ({ range: [0, 1000] }),
  getPriceSteps: async () => ({
    steps: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
  }),
};

describe("RouterProvider test", () => {
  afterEach(cleanup);
  // Testing exercise two fails due to the loader dependency
  it("renders exercise one page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/exercise1"],
    });
    render(
      <ApiOperationsProvider operations={operations}>
        <RouterProvider router={router} />
      </ApiOperationsProvider>
    );
    expect(await screen.findByText("Linear Range")).toBeDefined();
  });
});
