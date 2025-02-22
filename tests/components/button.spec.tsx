import { test, expect } from "@playwright/experimental-ct-react";
import Button from "../../src/components/Button";

test("renders button with correct label", async ({ mount }) => {
    const component = await mount(<Button label="Click me" onClick={() => {}} />);
    await expect(component).toContainText("Click me");
});
