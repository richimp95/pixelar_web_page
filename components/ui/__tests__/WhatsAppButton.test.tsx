import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

describe("WhatsAppButton", () => {
  it("renderiza un link externo a wa.me", () => {
    render(<WhatsAppButton>Cotizar</WhatsAppButton>);
    const link = screen.getByRole("link", { name: "Cotizar" });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    expect(link).toHaveAttribute("target", "_blank");
  });
});
