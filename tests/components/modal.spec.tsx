import { test, expect } from "@playwright/experimental-ct-react";
import Modal from "../../src/components/Modal";

test("renders modal with title and button", async ({ mount }) => {
    const component = await mount(<Modal title="Test Modal" onClose={() => {}} />);
    await expect(component).toContainText("Test Modal");
    await expect(component.locator("button")).toContainText("Close");
});
