import React from "react";
import Home from "../pages/index";
import { screen, render } from "@testing-library/react";

describe("home page tests", () => {
    it("hello world on the screen", async() => {
        render(<Home />);
        const textElement = screen.getByText(/hello world/i)
        expect(textElement).toBeInTheDocument()
    });
    
    it("no errors from landing page", async() => {
        render(<Home />);
        screen.debug()
    })
})