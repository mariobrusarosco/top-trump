import App from "./App";
import { render } from "@testing-library/react";


console.warn("-Example One - Global Variable:", global.EXAMPLE_ONE);
console.warn("-Example two - Global Variable:", global.EXAMPLE_TWO)

console.log(process.env)


describe("Button", () => {
  describe("when rendering", () => {
    it("renders the text", () => {
      const { getByText } = render(<App />);

      expect(getByText("count is 0")).toBeInTheDocument();
    });
  });
});
