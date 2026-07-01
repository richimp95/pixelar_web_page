export const content = {
  nav: {
    brand: "WNRGY",
    links: [
      { label: "Inicio", href: "#inicio" },
      { label: "Servicios", href: "#servicios" },
      { label: "Planes", href: "#planes" },
      { label: "Proceso", href: "#proceso" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: "Cotizar por WhatsApp",
  },
  hero: {
    title: "Páginas web modernas para negocios que quieren crecer",
    subtitle:
      "En WNRGY creamos, renovamos y administramos páginas web profesionales para empresas en Guatemala. Si tu negocio no tiene sitio web o el que tienes ya no representa tu calidad, nosotros lo transformamos.",
    primaryCta: "Quiero mi página web",
    secondaryCta: "Ver planes",
    microcopy: "Diseño web • Administración mensual • SEO básico • Encontrable con IA",
  },
  problema: {
    title: "¿Tu página web está ayudando a tu negocio o lo está frenando?",
    text:
      "Muchos negocios pierden oportunidades porque no tienen presencia en internet o porque su página actual se ve antigua, carga lento, no funciona bien en celular o no transmite confianza.",
    items: [
      "No tienes página web.",
      "Tu sitio se ve viejo o poco profesional.",
      "Tu página no se adapta bien a celulares.",
      "Tus clientes no encuentran información clara.",
      "No sabes cómo actualizar o mantener tu página.",
      "Tu empresa no aparece correctamente en Google.",
    ],
  },
  solucion: {
    title: "En WNRGY convertimos tu presencia digital en una ventaja",
    text:
      "Diseñamos páginas web modernas, claras y funcionales para que tu negocio se vea profesional, genere confianza y facilite que tus clientes te contacten.",
    beneficios: [
      { title: "Imagen profesional", text: "Tu negocio se verá más confiable y preparado para competir." },
      { title: "Página adaptada a celular", text: "Creamos sitios responsivos que funcionan en computadora, tablet y smartphone." },
      { title: "Administración sin complicaciones", text: "Nosotros nos encargamos del mantenimiento técnico y las mejoras mensuales; tú conservas el control de tu dominio y hosting." },
    ],
  },
  servicios: {
    title: "Servicios de WNRGY",
    items: [
      { title: "Creación de páginas web", text: "Diseñamos páginas web desde cero para negocios que necesitan iniciar su presencia digital con una imagen profesional." },
      { title: "Renovación de páginas web", text: "Modernizamos sitios web antiguos, desordenados o poco atractivos para que representen mejor la calidad de tu empresa." },
      { title: "Administración web", text: "Nos encargamos del mantenimiento básico y las actualizaciones menores, y te ayudamos con la configuración técnica de tu dominio y hosting." },
      { title: "SEO e indexación en Google e IA", text: "Configuramos y optimizamos tu sitio para que Google y los buscadores con inteligencia artificial (como IA Overviews, ChatGPT o Copilot) puedan encontrarlo, indexarlo y mostrarlo correctamente." },
    ],
  },
  planes: {
    title: "Planes de mantenimiento mensual",
    subtitle:
      "Mantén tu sitio seguro, rápido y siempre actualizado. Precios pensados para startups y PYMEs en Guatemala.",
    items: [
      {
        name: "Básico",
        badge: "Para arrancar",
        audience: "PYMEs que inician su presencia digital",
        price: "Q200",
        period: "/ mes",
        highlighted: false,
        features: [
          { name: "Actualizaciones (plugins/core)", detail: "Mensual" },
          { name: "Backup en la nube", detail: "1 backup" },
          { name: "Monitoreo de seguridad", detail: "Básico" },
          { name: "Soporte y cambios pequeños", detail: "Incluido" },
        ],
        note: "Ideal para mantener tu sitio seguro y al día.",
        cta: "Quiero el Plan Básico",
      },
      {
        name: "Intermedio",
        badge: "Más popular",
        audience: "Negocios que publican contenido seguido",
        price: "Q500",
        period: "/ mes",
        highlighted: true,
        features: [
          { name: "Revisiones del sitio", detail: "Semanal" },
          { name: "Backups", detail: "Semanal" },
          { name: "Optimización de velocidad", detail: "Incluida" },
          { name: "Soporte (contenido/productos)", detail: "Incluido" },
          { name: "Reporte mensual", detail: "Incluido" },
        ],
        note: "El equilibrio entre soporte y precio para crecer.",
        cta: "Quiero el Plan Intermedio",
      },
      {
        name: "Premium",
        badge: "Máxima cobertura",
        audience: "Sitios con tráfico y ventas que no pueden caerse",
        price: "Q1,000",
        period: "/ mes",
        highlighted: false,
        features: [
          { name: "Actualizaciones", detail: "Inmediatas" },
          { name: "Backups", detail: "Diarios" },
          { name: "Firewall y resolución de caídas", detail: "Gestionado" },
          { name: "Soporte", detail: "Prioritario" },
          { name: "SEO básico y visibilidad en IA", detail: "Incluido" },
        ],
        note: "Tranquilidad total para tu operación digital.",
        cta: "Quiero el Plan Premium",
      },
    ],
    promo: {
      title: "Contrata 1 año y tu Landing Page va por nuestra cuenta",
      text: "Pagando cualquier plan de mantenimiento de forma anual, te regalamos el desarrollo de tu Landing Page.",
    },
    extraNote:
      "Los desarrollos más pesados o las funcionalidades complejas fuera del soporte incluido tienen un costo adicional según la magnitud y finalidad del cambio.",
    platformNote:
      "Los planes y desarrollos no incluyen costos de plataformas, dominio (URL), certificado SSL ni otros gastos personales del sitio; nosotros te asesoramos y configuramos, pero esos costos corren por cuenta del cliente.",
    startSprint: {
      name: "Start Your Page",
      badge: "Desarrollo a medida",
      audience: "¿Aún no tienes web? La construimos por fases, con pagos cómodos.",
      price: "Desde Q2,500",
      period: "/ sprint (desde 2 semanas)",
      features: [
        { name: "Sprints ágiles desde 2 semanas", detail: "Por fase" },
        { name: "Pagos por fase terminada", detail: "Cómodo" },
        { name: "Entrega del proyecto completo", detail: "Al final" },
        { name: "Pase a un plan de mantenimiento", detail: "Incluido" },
      ],
      note: "El costo y la cantidad de sprints (mínimo 1) dependen de la dificultad y los requerimientos técnicos del proyecto.",
      cta: "Quiero empezar mi página",
    },
  },
  proceso: {
    title: "Así trabajamos contigo",
    steps: [
      { n: 1, title: "Analizamos tu negocio", text: "Conocemos tu empresa, tus servicios, tus clientes y lo que quieres lograr con tu página web." },
      { n: 2, title: "Diseñamos tu propuesta", text: "Creamos una estructura visual y funcional pensada para que tu negocio se vea profesional y tus clientes encuentren lo que necesitan." },
      { n: 3, title: "Desarrollamos tu página", text: "Construimos el sitio web adaptado a celular, rápido, moderno y listo para representar tu marca." },
      { n: 4, title: "Publicamos y optimizamos", text: "Dejamos tu página lista para compartir con clientes y, según el plan, configuramos dominio, hosting e indexación en Google y buscadores con IA." },
      { n: 5, title: "Administramos y damos soporte", text: "Si eliges un plan mensual, nos encargamos del mantenimiento básico y actualizaciones necesarias." },
    ],
  },
  beneficios: {
    title: "¿Por qué elegir WNRGY?",
    items: [
      { title: "Diseño moderno", text: "Tu página se verá actual, limpia y profesional." },
      { title: "Enfoque en negocios", text: "No solo diseñamos bonito; pensamos en cómo ayudarte a generar confianza y contactos." },
      { title: "Adaptado a celulares", text: "Tu sitio funcionará correctamente en dispositivos móviles." },
      { title: "Planes flexibles", text: "Puedes empezar con una página básica o elegir administración completa." },
      { title: "Menos preocupaciones técnicas", text: "Te asesoramos con tu dominio y hosting, y nos encargamos del mantenimiento en los planes mensuales." },
      { title: "Presencia en Google e IA", text: "Con el plan Premium ayudamos a que Google y los buscadores con inteligencia artificial reconozcan e indexen tu sitio correctamente." },
    ],
  },
  renovacion: {
    title: "¿Ya tienes página web, pero se ve desactualizada?",
    text:
      "Una página vieja, lenta o poco clara puede hacer que tus clientes duden de tu negocio. En WNRGY renovamos tu sitio para que transmita profesionalismo, confianza y calidad.",
    antes: [
      "Diseño viejo.",
      "Difícil de navegar.",
      "No funciona bien en celular.",
      "Información desordenada.",
      "Poca confianza.",
    ],
    despues: [
      "Diseño moderno.",
      "Navegación clara.",
      "Adaptada a celular.",
      "Información organizada.",
      "Imagen profesional.",
    ],
    cta: "Quiero renovar mi página",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      { q: "¿WNRGY solo crea páginas web desde cero?", a: "No. También renovamos páginas web existentes para mejorar su diseño, estructura, velocidad, imagen y funcionalidad." },
      { q: "¿Qué plan me conviene si solo quiero una página web?", a: "El Plan Básico es ideal si solo necesitas la creación de tu página web y no requieres administración mensual." },
      { q: "¿Qué incluye la administración web?", a: "Incluye mantenimiento básico, revisión del funcionamiento del sitio y actualizaciones menores de contenido en los planes Intermedio y Premium." },
      { q: "¿El dominio, hosting y SSL están incluidos?", a: "No. Esos son costos de plataforma que corren por cuenta del cliente. Nosotros te asesoramos y nos encargamos de la configuración técnica como parte de la administración mensual." },
      { q: "¿Qué es la indexación en Google y en buscadores con IA?", a: "Es el proceso de configurar y enviar tu sitio para que Google y los motores con inteligencia artificial (como IA Overviews, ChatGPT o Copilot) puedan encontrarlo, analizarlo y mostrarlo en sus resultados o respuestas." },
      { q: "¿El SEO garantiza aparecer primero en Google o en IA?", a: "No se puede garantizar la primera posición, pero sí podemos optimizar la estructura básica de tu sitio para mejorar su visibilidad y facilitar que Google y los buscadores con IA lo indexen correctamente." },
      { q: "¿Puedo pedir cambios después de publicada la página?", a: "Sí. En los planes Intermedio y Premium se incluyen actualizaciones menores como parte de la administración mensual. Cambios grandes pueden cotizarse por separado." },
      { q: "¿Trabajan solo con empresas de Guatemala?", a: "WNRGY está basado en Guatemala, pero puede trabajar con negocios de diferentes ubicaciones si el proyecto se puede manejar de forma digital." },
    ],
  },
  ctaFinal: {
    title: "Haz que tu negocio se vea tan profesional como realmente es",
    text:
      "Tu página web puede ser la primera impresión que un cliente tenga de tu empresa. En WNRGY te ayudamos a crear una presencia digital moderna, clara y confiable.",
    primaryCta: "Cotizar por WhatsApp",
    secondaryCta: "Ver planes",
    microcopy: "Cuéntanos sobre tu negocio y te ayudamos a elegir el plan ideal.",
  },
  footer: {
    brand: "WNRGY",
    desc: "Creamos, renovamos y administramos páginas web para negocios que quieren crecer en internet.",
    links: [
      { label: "Inicio", href: "#inicio" },
      { label: "Servicios", href: "#servicios" },
      { label: "Planes", href: "#planes" },
      { label: "Contacto", href: "#contacto" },
    ],
    contacto: {
      telefono: "+502 4220-1061",
      whatsapp: "+502 4220-1061",
      correo: "wnrgy.gt@gmail.com",
      ubicacion: "Guatemala",
    },
    redes: ["Instagram", "Facebook", "LinkedIn"],
    legal: "© 2026 WNRGY. Todos los derechos reservados.",
  },
} as const;

export type Content = typeof content;
