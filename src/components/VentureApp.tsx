'use client'

import { useMemo, useRef, useState } from 'react'
import { evidenceExamples, opening } from '@/src/data'
import { analyzeEvidence, buildPortableRecord, validateDraft } from '@/src/logic'
import type { AnalysisResult, EvidenceDraft, MatchStatus } from '@/src/types'

type GateMode = 'demo' | 'blocked'

const statusMeta: Record<MatchStatus, { label: string; icon: string; card: string; badge: string }> = {
  sustentado: { label: 'Sustentado', icon: '✓', card: 'border-[#8ccbc0] bg-[#eef9f5]', badge: 'bg-[#147c75] text-white' },
  parcial: { label: 'Parcial', icon: '◐', card: 'border-[#dfb46d] bg-[#fff9ed]', badge: 'bg-[#b9691d] text-white' },
  faltante: { label: 'Sin evidencia', icon: '—', card: 'border-[#dfa8a3] bg-[#fff5f3]', badge: 'bg-[#a33d3d] text-white' },
}

const fieldLabels = {
  task: '¿Qué necesitaba resolverse?',
  action: '¿Qué hiciste tú?',
  result: '¿Qué cambió o quedó listo?',
} as const

const sourceLabels = { task: 'necesidad', action: 'acción', result: 'resultado' } as const

export default function VentureApp({ supabaseConfigured }: { supabaseConfigured: boolean }) {
  const [gateMode, setGateMode] = useState<GateMode>('demo')
  const [selectedId, setSelectedId] = useState(evidenceExamples[0].exampleId)
  const selected = useMemo(() => evidenceExamples.find((item) => item.exampleId === selectedId) ?? evidenceExamples[0], [selectedId])
  const [draft, setDraft] = useState<EvidenceDraft>(selected)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [message, setMessage] = useState('')
  const [correctionRequested, setCorrectionRequested] = useState(false)
  const resultRef = useRef<HTMLElement>(null)

  const chooseExample = (id: string) => {
    const next = evidenceExamples.find((item) => item.exampleId === id) ?? evidenceExamples[0]
    setSelectedId(id)
    setDraft(next)
    setResult(null)
    setMessage('')
    setCorrectionRequested(false)
  }

  const update = (field: 'task' | 'action' | 'result', value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
    setResult(null)
    setMessage('Los resultados se actualizarán cuando vuelvas a mapear la evidencia.')
  }

  const runAnalysis = () => {
    const errors = validateDraft(draft)
    if (errors.length > 0) {
      setMessage(errors.join(' '))
      return
    }
    setResult(analyzeEvidence(draft, opening))
    setMessage('Mapa actualizado con reglas determinísticas y evidencia visible.')
    window.setTimeout(() => resultRef.current?.focus(), 0)
  }

  const downloadRecord = () => {
    if (!result) return
    const record = buildPortableRecord(draft, opening, result, correctionRequested)
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `primer-peldano-${draft.exampleId}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const showDemo = gateMode === 'demo'

  return (
    <main className="paper-grid min-h-screen">
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3" href="#contenido">Saltar al contenido</a>
      <header className="border-b border-[var(--line)] bg-[var(--panel)]/95">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-5 px-5 py-4 md:px-8">
          <a className="flex items-baseline gap-3" href="#inicio" aria-label="Primer Peldaño, inicio">
            <span className="display text-3xl font-semibold tracking-tight">Primer Peldaño</span>
            <span className="hidden text-sm text-[var(--ink-soft)] sm:inline">Tu trabajo también cuenta.</span>
          </a>
          <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[.13em] sm:text-xs">Prototipo - datos inventados</span>
        </div>
      </header>

      <div id="contenido" className="mx-auto max-w-[1220px] px-5 py-7 md:px-8 md:py-10">
        <section id="inicio" className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] shadow-[0_24px_80px_rgba(16,45,63,.08)]">
          <div className="grid lg:grid-cols-[.94fr_1.06fr]">
            <div className="p-7 md:p-11">
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[.2em] text-[var(--teal)]">Un compromiso · una vacante · evidencia corregible</p>
              <h1 className="display max-w-xl text-5xl font-semibold leading-[.93] tracking-[-.04em] md:text-7xl">Haz visible lo que ya sabes hacer.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">Relaciona trabajo que ya realizaste con criterios que la empresa aceptó mirar. Sin otro curso. Sin otra audición. Sin puntaje sobre tu valor.</p>
            </div>
            <div className="flex items-end bg-[var(--ink)] p-7 text-white md:p-11">
              <div>
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[.2em] text-[#92d8cf]">Lo que el sistema no hace</p>
                <p className="display text-3xl leading-tight md:text-4xl">No verifica tu historia, no decide una contratación y no completa lo que falta.</p>
                <p className="mt-5 max-w-xl leading-7 text-[#c7d3d9]">Ordena lo declarado, muestra su procedencia y conserva la incertidumbre para una revisión humana.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`mt-6 rounded-[1.6rem] border p-6 md:p-8 ${showDemo ? 'border-[var(--amber)] bg-[var(--amber-soft)]' : 'border-[var(--red)] bg-[var(--red-soft)]'}`} aria-labelledby="gate-title">
          <div className="grid items-center gap-7 lg:grid-cols-[1fr_auto]">
            <div>
              <p className={`text-xs font-extrabold uppercase tracking-[.18em] ${showDemo ? 'text-[var(--amber)]' : 'text-[var(--red)]'}`}>Puerta obligatoria · antes de pedir evidencia</p>
              <h2 id="gate-title" className="display mt-2 text-3xl font-semibold md:text-4xl">{showDemo ? 'Este recorrido usa un compromiso simulado.' : 'Sin compromiso, el proceso se detiene aquí.'}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-[var(--ink-soft)]">{showDemo ? opening.commitment.language : 'No pedimos trabajo, documentos ni datos a una persona hasta que un empleador publique los criterios y acepte evidencia nombrada para una vacante real.'}</p>
            </div>
            <div className="flex min-w-[250px] flex-col gap-2 rounded-2xl border border-black/10 bg-white/70 p-2" role="group" aria-label="Estado del compromiso">
              <button className={`rounded-xl px-4 py-3 text-left text-sm font-extrabold ${showDemo ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink)] hover:bg-white'}`} type="button" onClick={() => setGateMode('demo')}>Ver demo simulada</button>
              <button className={`rounded-xl px-4 py-3 text-left text-sm font-extrabold ${!showDemo ? 'bg-[var(--red)] text-white' : 'text-[var(--ink)] hover:bg-white'}`} type="button" onClick={() => setGateMode('blocked')}>Ver bloqueo real</button>
            </div>
          </div>
          <dl className="mt-6 grid gap-3 border-t border-black/10 pt-5 sm:grid-cols-3">
            <div><dt className="text-[10px] font-black uppercase tracking-[.16em] text-[var(--ink-soft)]">Emisor</dt><dd className="mt-1 font-bold">{showDemo ? opening.commitment.issuedBy : 'No documentado'}</dd></div>
            <div><dt className="text-[10px] font-black uppercase tracking-[.16em] text-[var(--ink-soft)]">Reemplaza</dt><dd className="mt-1 font-bold">{showDemo ? opening.commitment.replaces : 'No documentado'}</dd></div>
            <div><dt className="text-[10px] font-black uppercase tracking-[.16em] text-[var(--ink-soft)]">Estado</dt><dd className="mt-1 font-bold">{showDemo ? 'Inventado para demostrar el flujo' : 'Bloqueado para uso con personas'}</dd></div>
          </dl>
        </section>

        {!showDemo ? (
          <section className="mt-6 rounded-[1.6rem] border border-dashed border-[var(--line)] bg-[var(--panel)] p-10 text-center md:p-16">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--red-soft)] text-3xl text-[var(--red)]" aria-hidden="true">×</span>
            <h2 className="display mt-5 text-4xl font-semibold">No hay nada que llenar.</h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-[var(--ink-soft)]">Detenerse protege el tiempo de la persona. El siguiente paso pertenece al empleador: verificar la vacante, publicar criterios y firmar qué evidencia aceptará.</p>
            <button className="mt-6 rounded-xl bg-[var(--ink)] px-5 py-3 font-extrabold text-white" type="button" onClick={() => setGateMode('demo')}>Volver a la demostración</button>
          </section>
        ) : (
          <>
            <section className="mt-6 grid gap-6 lg:grid-cols-[.68fr_1.32fr]" aria-label="Espacio de evidencia">
              <aside className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--panel)] p-6 md:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--teal)]">Vacante inventada · {opening.id}</p>
                <h2 className="display mt-3 text-4xl font-semibold">{opening.title}</h2>
                <p className="mt-2 leading-7 text-[var(--ink-soft)]">{opening.location}<br />{opening.schedule}</p>
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

              <section className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--panel)] p-6 md:p-8" aria-labelledby="evidence-title">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--teal)]">Paso 1 · trabajo existente</p><h2 id="evidence-title" className="display mt-2 text-4xl font-semibold">Elige un ejemplo inventado.</h2></div>
                  <span className="rounded-xl border border-[var(--amber)] bg-[var(--amber-soft)] px-4 py-3 text-sm font-extrabold">Sin puntaje global</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {evidenceExamples.map((example) => (
                    <button className={`rounded-2xl border p-4 text-left transition ${selectedId === example.exampleId ? 'border-[var(--teal)] bg-[var(--teal-soft)] shadow-[inset_0_0_0_1px_var(--teal)]' : 'border-[var(--line)] bg-white hover:border-[var(--teal)]'}`} key={example.exampleId} type="button" onClick={() => chooseExample(example.exampleId)}>
                      <strong className="block">{example.label}</strong>
                      <small className="mt-2 block leading-5 text-[var(--ink-soft)]">{example.shortDescription}</small>
                    </button>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-[#eaf1f4] p-5 text-sm leading-6 text-[var(--ink-soft)]"><strong className="text-[var(--ink)]">Practica solo con el ejemplo inventado.</strong> No escribas nombres, teléfonos, correos, identificaciones, cuentas, contraseñas ni datos de salud. Nada se guarda ni se envía.</div>
                <div className="mt-6 grid gap-5">
                  {(['task', 'action', 'result'] as const).map((field) => (
                    <label className="block" key={field}>
                      <span className="font-extrabold">{fieldLabels[field]}</span>
                      <textarea className="mt-2 min-h-28 w-full resize-y rounded-2xl border border-[var(--line)] bg-white p-4 leading-7 text-[var(--ink)] shadow-inner transition focus:border-[var(--teal)]" maxLength={field === 'action' ? 220 : 180} value={draft[field]} onChange={(event) => update(field, event.target.value)} />
                      <small className="mt-1 block text-right text-[var(--ink-soft)]">{draft[field].length}/{field === 'action' ? 220 : 180}</small>
                    </label>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 text-sm"><span className="text-[var(--ink-soft)]">Procedencia simulada</span><strong>{draft.evidenceType}</strong></div>
                <button className="mt-6 w-full rounded-xl bg-[var(--ink)] px-6 py-4 text-base font-extrabold text-white transition hover:bg-[#1b455c]" type="button" onClick={runAnalysis}>Mapear mi evidencia <span aria-hidden="true">→</span></button>
                <p className="mt-3 min-h-6 text-sm font-bold text-[var(--red)]" role="status" aria-live="polite">{message}</p>
              </section>
            </section>

            {result && (
              <section ref={resultRef} className="mt-6 rounded-[1.6rem] border border-[var(--line)] bg-[var(--panel)] p-6 outline-none md:p-8" tabIndex={-1} aria-labelledby="results-title">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--teal)]">Paso 2 · resultado explicable</p><h2 id="results-title" className="display mt-2 text-4xl font-semibold">Mapa de evidencia.</h2><p className="mt-2 text-[var(--ink-soft)]">Estados calculados solo con el texto que ves arriba.</p></div>
                  <span className="rounded-xl border border-[var(--amber)] bg-[var(--amber-soft)] px-4 py-3 text-sm font-extrabold">Sin puntaje global</span>
                </div>
                <div className="mt-7 grid gap-4 lg:grid-cols-2">
                  {result.matches.map((match) => {
                    const criterion = opening.criteria.find((item) => item.id === match.criterionId)!
                    const meta = statusMeta[match.status]
                    const claims = result.claims.filter((claim) => match.evidenceClaimIds.includes(claim.id))
                    return (
                      <article className={`rounded-2xl border p-5 ${meta.card}`} key={match.criterionId}>
                        <div className="flex items-start gap-4"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-black ${meta.badge}`} aria-hidden="true">{meta.icon}</span><div><span className="text-xs font-black uppercase tracking-[.15em]">{meta.label}</span><h3 className="display mt-1 text-2xl font-semibold">{criterion.label}</h3></div></div>
                        <p className="mt-4 leading-7 text-[var(--ink-soft)]">{match.reason}</p>
                        <details className="mt-4 border-t border-black/10 pt-4">
                          <summary className="cursor-pointer font-extrabold">Ver procedencia y qué corregir</summary>
                          {claims.length > 0 ? <ul className="mt-3 space-y-2 text-sm leading-6">{claims.map((claim) => <li className="rounded-xl bg-white/75 p-3" key={claim.id}><strong className="capitalize">{sourceLabels[claim.sourceField]}:</strong> “{claim.statement}”</li>)}</ul> : <p className="mt-3 text-sm leading-6">No se cita evidencia porque este criterio sigue sin apoyo visible. Corrige los campos de arriba solo si existe evidencia real.</p>}
                        </details>
                      </article>
                    )
                  })}
                </div>
                <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
                  <article className="rounded-2xl bg-[var(--ink)] p-6 text-white">
                    <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#92d8cf]">Revisión humana obligatoria</p><h3 className="display mt-2 text-3xl font-semibold">La persona explica; el sistema no decide.</h3><p className="mt-3 leading-7 text-[#c7d3d9]">{result.uncertainty}</p>
                    <ol className="mt-5 grid gap-2 text-sm leading-6"><li>1. ¿Qué parte hiciste tú?</li><li>2. ¿Qué evidencia puede verse?</li><li>3. ¿Qué falta o debe corregirse?</li><li>4. ¿Qué decidirá la persona revisora?</li></ol>
                  </article>
                  <article className="rounded-2xl border border-[var(--line)] bg-white p-6">
                    <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--teal)]">Tu control</p><h3 className="display mt-2 text-3xl font-semibold">Corrige o guarda una copia.</h3>
                    <label className="mt-5 flex cursor-pointer gap-3 rounded-xl bg-[var(--teal-soft)] p-4"><input className="mt-1 h-5 w-5 accent-[var(--teal)]" type="checkbox" checked={correctionRequested} onChange={(event) => setCorrectionRequested(event.target.checked)} /><span><strong className="block">Solicito corregir este borrador.</strong><small className="mt-1 block leading-5 text-[var(--ink-soft)]">La señal quedará dentro de tu copia local.</small></span></label>
                    <button className="mt-4 w-full rounded-xl bg-[var(--teal)] px-5 py-4 font-extrabold text-white" type="button" onClick={downloadRecord}>Guardar copia local (.json)</button>
                    <p className="mt-3 text-xs leading-5 text-[var(--ink-soft)]">Se descarga en tu dispositivo. No se envía a una empresa ni se guarda en este sitio.</p>
                  </article>
                </div>
              </section>
            )}
          </>
        )}

        <footer className="mt-8 grid gap-4 border-t border-[var(--line)] py-7 text-sm text-[var(--ink-soft)] md:grid-cols-2">
          <p><strong className="text-[var(--ink)]">Primer Peldaño · Week 12</strong><br />Evidencia inventada, decisiones humanas, incertidumbre visible.</p>
          <p className="md:text-right"><strong className="text-[var(--ink)]">Persistencia:</strong> {supabaseConfigured ? 'Supabase configurado; el demo aun no escribe datos.' : 'Supabase no configurado; el demo no guarda datos.'}</p>
        </footer>
      </div>
    </main>
  )
}
