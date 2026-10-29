import { opening } from '@/src/data'

export default function Home() {
  return (
    <main className="paper-grid min-h-screen">
      <header className="border-b border-[var(--line)] bg-[var(--panel)]/95">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-4 md:px-8">
          <div className="flex items-baseline gap-3">
            <span className="display text-3xl font-semibold tracking-tight">Primer Peldaño</span>
            <span className="hidden text-sm text-[var(--ink-soft)] sm:inline">Tu trabajo también cuenta.</span>
          </div>
          <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em]">Prototipo - datos inventados</span>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-12">
        <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] shadow-[0_24px_80px_rgba(16,45,63,.08)]">
          <div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr]">
            <div className="p-7 md:p-10">
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[.2em] text-[var(--teal)]">Semana 12 · compromiso antes que evidencia</p>
              <h1 className="display max-w-xl text-5xl font-semibold leading-[.95] tracking-[-.03em] md:text-7xl">Haz visible lo que ya sabes hacer.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">Una sola vacante. Criterios publicados. Evidencia que tú controlas. Ningún puntaje sobre tu valor.</p>
            </div>
            <div className="flex items-end bg-[var(--ink)] p-7 text-white md:p-10">
              <div>
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[.2em] text-[#92d8cf]">Límite del sistema</p>
                <p className="display text-3xl leading-tight">La empresa decide si acepta la evidencia. El sistema solo organiza lo que puede verse y corregirse.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.6rem] border border-[var(--red)] bg-[var(--red-soft)] p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--red)]">Compromiso del empleador · simulación</p>
            <h2 className="display mt-2 text-3xl font-semibold">Antes de pedirte tiempo, la empresa debe aceptar la evidencia.</h2>
            <p className="mt-2 leading-7 text-[var(--ink-soft)]">Esta demostración usa un compromiso inventado. Sin un acuerdo real, fechado y verificable, un piloto con personas se detiene.</p>
          </div>
          <span className="mt-5 inline-flex shrink-0 rounded-full bg-[var(--red)] px-4 py-2 text-sm font-extrabold text-white md:mt-0">Demo, no compromiso real</span>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
          <aside className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--panel)] p-6 md:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--teal)]">Vacante inventada · {opening.id}</p>
            <h2 className="display mt-3 text-4xl font-semibold">{opening.title}</h2>
            <p className="mt-2 text-[var(--ink-soft)]">{opening.location}<br />{opening.schedule}</p>
            <div className="mt-7 border-t border-[var(--line)] pt-6">
              <h3 className="font-extrabold">Criterios publicados</h3>
              <ol className="mt-4 space-y-3">
                {opening.criteria.map((criterion, index) => (
                  <li className="flex gap-3 rounded-2xl border border-[var(--line)] bg-white p-4" key={criterion.id}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-xs font-black text-white">{index + 1}</span>
                    <span><strong className="block">{criterion.label}</strong><small className="mt-1 block leading-5 text-[var(--ink-soft)]">{criterion.description}</small></span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <section className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--panel)] p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--teal)]">El siguiente paso</p><h2 className="display mt-2 text-4xl font-semibold">Mapea evidencia, no personas.</h2></div>
              <span className="rounded-xl border border-[var(--amber)] bg-[var(--amber-soft)] px-4 py-3 text-sm font-extrabold">Sin puntaje global</span>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['01', 'Sustentado', 'La evidencia visible cubre el criterio.'],
                ['02', 'Parcial', 'Hay una señal, pero falta una parte.'],
                ['03', 'Sin evidencia', 'El vacío permanece visible y corregible.'],
              ].map(([number, label, copy]) => (
                <article className="rounded-2xl border border-[var(--line)] bg-white p-5" key={label}>
                  <span className="text-xs font-black tracking-[.18em] text-[var(--teal)]">{number}</span>
                  <h3 className="display mt-10 text-2xl font-semibold">{label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{copy}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 rounded-2xl bg-[var(--teal-soft)] p-5 leading-7"><strong>Tú tienes el control.</strong> En el siguiente incremento podrás editar un ejemplo inventado, revisar la procedencia y guardar una copia local.</p>
          </section>
        </section>
      </div>
    </main>
  )
}
