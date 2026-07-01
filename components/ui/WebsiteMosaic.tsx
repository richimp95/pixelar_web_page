/**
 * Mosaico decorativo dentro del "device scroll": bloques abstractos con
 * gradientes de distintas familias de color (violeta, teal, coral, ámbar,
 * azul) representando la variedad de sitios que se pueden construir. Son
 * formas abstractas (barras/pills), no capturas ni datos falsos.
 */
const tiles = [
  { className: "col-span-2 row-span-2 from-indigo-500 via-violet-500 to-fuchsia-500" },
  { className: "col-span-2 from-teal-400 via-emerald-500 to-teal-600" },
  { className: "from-rose-400 via-pink-500 to-rose-600" },
  { className: "from-amber-400 via-orange-500 to-amber-600" },
  { className: "col-span-2 from-sky-400 via-blue-500 to-cyan-500" },
] as const;

export function WebsiteMosaic() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0a1320] p-3 sm:p-4">
      {/* Barra de navegador */}
      <div className="mb-3 flex items-center gap-1.5 sm:mb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      </div>

      <div className="grid flex-1 grid-cols-4 grid-rows-2 gap-3">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br p-4 ${tile.className}`}
          >
            <div className="h-2 w-10 rounded-full bg-white/70" />
            <div className="mt-3 h-3 w-2/3 rounded-full bg-white/50" />
            <div className="mt-2 h-2 w-1/3 rounded-full bg-white/30" />
            <div className="absolute bottom-4 left-4 h-6 w-16 rounded-full bg-white/80" />
          </div>
        ))}
      </div>
    </div>
  );
}
