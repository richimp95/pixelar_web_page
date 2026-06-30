import { describe, it, expect } from "vitest";
import { WHATSAPP_PHONE, DEFAULT_WHATSAPP_MESSAGE, waLink } from "@/lib/whatsapp";

describe("waLink", () => {
  it("usa el número y el mensaje por defecto", () => {
    expect(waLink()).toBe(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`
    );
  });

  it("codifica un mensaje personalizado", () => {
    const msg = "Hola, quiero el Plan Pro & más info";
    expect(waLink(msg)).toBe(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`
    );
  });
});
