import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problema } from "@/components/sections/Problema";
import { Solucion } from "@/components/sections/Solucion";
import { Servicios } from "@/components/sections/Servicios";
import { Planes } from "@/components/sections/Planes";
import { Proceso } from "@/components/sections/Proceso";
import { Beneficios } from "@/components/sections/Beneficios";
import { Renovacion } from "@/components/sections/Renovacion";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Solucion />
        <Servicios />
        <Planes />
        <Proceso />
        <Beneficios />
        <Renovacion />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
