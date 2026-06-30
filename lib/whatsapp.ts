// Número de WhatsApp de WNRGY (+502 4220-1061), en formato wa.me (sin signos).
export const WHATSAPP_PHONE = "50242201061";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola WNRGY, estoy interesado en una página web para mi negocio. Me gustaría recibir más información.";

/** Construye el link de WhatsApp con mensaje prellenado (URL-encoded). */
export function waLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
