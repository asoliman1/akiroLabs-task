import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("generates a token on button click", async () => {
    const { getByText } = render(<App />);
    const generateButton = screen.getByText(/learn react/i);

    fireEvent.click(generateButton);

    await waitFor(() => {
      const tokenOutput = screen.getByText(
        /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/
      );
      expect(tokenOutput).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});
