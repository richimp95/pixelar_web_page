// Placeholder: reemplazar por el número real de Pixelar antes de publicar.
export const WHATSAPP_PHONE = "502XXXXXXXX";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Pixelar, estoy interesado en una página web para mi negocio. Me gustaría recibir más información.";

/** Construye el link de WhatsApp con mensaje prellenado (URL-encoded). */
export function waLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
