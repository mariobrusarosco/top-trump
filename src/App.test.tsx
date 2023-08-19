import App from "./App";
import { render } from "@testing-library/react";

describe("Button", () => {
  describe("when rendering", () => {
    it("renders the text", () => {
      const { getByText } = render(<App />);

      expect(getByText("count is 0")).toBeInTheDocument();
    });
  });
});
