import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductPage from "./ProductPage";

describe("ProductPage", () => {
  test("WHEN a user goes to the Products page, THEN the pagination control will be displayed", async () => {
    render(<ProductPage />);
    await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    expect(previousPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
  });

  test("WHEN a user navigates to the first page of the Products page, THEN the previous/back button of the pagination control will be disabled", async () => {
    render(<ProductPage />);
    await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousPageButton).toBeDisabled();
  });

  test("WHEN the user navigates to the second page of the Products page, THEN the previous/back button of the pagination control will be enabled", async () => {
    render(<ProductPage />);
    await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).not.toBeDisabled();

    userEvent.click(nextPageButton);

    expect(previousPageButton).not.toBeDisabled();
  });

  test("WHEN the user navigates to the last page of the Products page, THEN next button of the pagination control will be disabled", async () => {
    render(<ProductPage />);
    await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    userEvent.click(nextPageButton);
    while (!nextPageButton.disabled) {
      userEvent.click(nextPageButton);
    }
    expect(nextPageButton).toBeDisabled();
  });

  test("WHEN a user goes to the Products page, THEN the current page will be highlighted in the pagination control", async () => {
    render(<ProductPage />);
    await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));
    const pageDisplay = screen.queryByText(/page/i);
    expect(pageDisplay.textContent).toBe("Page 1 of 2");
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    userEvent.click(nextPageButton);
    expect(pageDisplay.textContent).toBe("Page 2 of 2");
  });
});
