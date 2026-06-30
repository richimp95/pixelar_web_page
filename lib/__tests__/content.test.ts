import { describe, it, expect } from "vitest";
import { content } from "@/lib/content";

describe("content", () => {
  it("tiene 3 planes y exactamente uno destacado", () => {
    expect(content.planes.items).toHaveLength(3);
    expect(content.planes.items.filter((p) => p.highlighted)).toHaveLength(1);
  });
  it("tiene 8 preguntas frecuentes", () => {
    expect(content.faq.items).toHaveLength(8);
  });
  it("tiene 4 servicios, 6 problemas y 6 beneficios", () => {
    expect(content.servicios.items).toHaveLength(4);
    expect(content.problema.items).toHaveLength(6);
    expect(content.beneficios.items).toHaveLength(6);
  });
  it("tiene 5 pasos de proceso", () => {
    expect(content.proceso.steps).toHaveLength(5);
  });
});
