import { useMemo, useState } from 'react'
import { evidenceExamples, opening } from './data'
import { analyzeEvidence, buildPortableRecord, validateDraft } from './logic'
import type { AnalysisResult, EvidenceDraft, MatchStatus } from './types'

const statusLabel: Record<MatchStatus, string> = {
  sustentado: 'Sustentado',
  parcial: 'Parcial',
  faltante: 'Faltante',
}

const sourceLabel = { task: 'qué necesitaba resolverse', action: 'qué hiciste tú', result: 'qué cambió o quedó listo' } as const

function App() {
  const [selectedId, setSelectedId] = useState(evidenceExamples[0].exampleId)
  const selected = useMemo(() => evidenceExamples.find((item) => item.exampleId === selectedId) ?? evidenceExamples[0], [selectedId])
  const [draft, setDraft] = useState<EvidenceDraft>(selected)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [message, setMessage] = useState('')
  const [correctionRequested, setCorrectionRequested] = useState(false)
  const [walkthroughOpen, setWalkthroughOpen] = useState(false)

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
    setMessage('')
  }

  const analyze = () => {
    const errors = validateDraft(draft)
    if (errors.length) {
      setMessage(errors.join(' '))
      return
    }
    setResult(analyzeEvidence(draft, opening))
    setMessage('Borrador simulado listo. Revisa cada razón antes de exportar.')
    window.setTimeout(() => document.getElementById('resultado')?.focus(), 0)
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

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Primer Peldaño, inicio">
          <span className="brand-stairs" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>Primer</strong> Peldaño</span>
        </a>
        <span className="simulation-pill">Prototipo · todo es simulado</span>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div>
            <p className="eyebrow">Tu trabajo también cuenta</p>
            <h1>Haz visible lo que ya sabes hacer.</h1>
            <p className="lede">Convierte trabajo real que ya realizaste en evidencia clara para una vacante que prometió mirarla. Sin otro curso. Sin otra audición.</p>
          </div>
          <aside className="boundary-card">
            <span aria-hidden="true">!</span>
            <div><strong>Este prototipo no verifica ni contrata.</strong><p>La empresa, la vacante, las personas y la aceptación son inventadas. La IA también está simulada.</p></div>
          </aside>
        </section>

        <section className="commitment" aria-labelledby="commitment-title">
          <div className="commitment-badge" aria-hidden="true">✓</div>
          <div className="commitment-main">
            <p className="eyebrow">Puerta obligatoria · compromiso simulado</p>
            <h2 id="commitment-title">La evidencia reemplaza el filtro de experiencia.</h2>
            <blockquote>“{opening.commitment.language}”</blockquote>
            <p className="commitment-rule"><strong>Regla de producción:</strong> sin un compromiso real firmado antes, el proceso se detiene y no se pide evidencia al trabajador.</p>
          </div>
          <dl>
            <div><dt>Vacante</dt><dd>{opening.id}</dd></div>
            <div><dt>Emisor</dt><dd>{opening.commitment.issuedBy}</dd></div>
            <div><dt>Reemplaza</dt><dd>{opening.commitment.replaces}</dd></div>
            <div><dt>Fecha simulada</dt><dd>8 oct 2026</dd></div>
          </dl>
        </section>

        <section className="workspace" aria-labelledby="evidence-title">
          <aside className="opening-card">
            <p className="eyebrow">Vacante simulada verificada</p>
            <h2>{opening.title}</h2>
            <p>{opening.location}<br />{opening.schedule}</p>
            <span className="opening-count">{opening.openings} aperturas inventadas</span>
            <h3>Criterios publicados</h3>
            <ol>{opening.criteria.map((criterion, index) => <li key={criterion.id}><span>0{index + 1}</span><div><strong>{criterion.label}</strong><small>{criterion.description}</small></div></li>)}</ol>
          </aside>

          <div className="evidence-card">
            <div className="section-number"><span>01</span><div><p className="eyebrow">Trabajo existente</p><h2 id="evidence-title">Elige un ejemplo inventado</h2></div></div>
            <div className="example-grid">
              {evidenceExamples.map((example) => (
                <button key={example.exampleId} type="button" className={selectedId === example.exampleId ? 'example selected' : 'example'} onClick={() => chooseExample(example.exampleId)}>
                  <span>{example.label}</span><small>{example.shortDescription}</small>
                </button>
              ))}
            </div>
            <div className="identity-row"><span>Alias</span><strong>{draft.workerAlias}</strong><span>Contexto</span><strong>{draft.context}</strong></div>
            <p className="privacy-note"><strong>Practica solo con este ejemplo inventado.</strong> No escribas nombres, teléfonos, correos, identificaciones, cuentas, contraseñas ni información de salud. Nada se guarda ni se envía.</p>
            <div className="field-stack">
              <label><span>¿Qué necesitaba resolverse?</span><textarea maxLength={180} value={draft.task} onChange={(event) => update('task', event.target.value)} /><small>{draft.task.length}/180</small></label>
              <label><span>¿Qué hiciste tú?</span><textarea maxLength={220} value={draft.action} onChange={(event) => update('action', event.target.value)} /><small>{draft.action.length}/220</small></label>
              <label><span>¿Qué cambió o quedó listo?</span><textarea maxLength={180} value={draft.result} onChange={(event) => update('result', event.target.value)} /><small>{draft.result.length}/180</small></label>
            </div>
            <div className="evidence-source"><span>Tipo de evidencia simulada</span><strong>{draft.evidenceType}</strong></div>
            <button className="primary-button" type="button" onClick={analyze}>Analizar evidencia <span aria-hidden="true">→</span></button>
            <p className="form-message" role="status" aria-live="polite">{message}</p>
          </div>
        </section>

        {result && (
          <section className="results" id="resultado" tabIndex={-1} aria-labelledby="results-title">
            <div className="result-heading">
              <div className="section-number"><span>02</span><div><p className="eyebrow">IA simulada + reglas visibles</p><h2 id="results-title">Mapa de evidencia, no calificación</h2></div></div>
              <span className="no-score">Sin puntaje global</span>
            </div>

            <div className="claim-grid">
              {result.claims.map((claim, index) => (
                <article key={claim.id} className="claim-card">
                  <span className="claim-kicker">Afirmación {index + 1} · IA simulada</span>
                  <p>{claim.statement}</p>
                  <small>Fuente: “{sourceLabel[claim.sourceField]}” · {claim.evidenceType}</small>
                </article>
              ))}
            </div>

            <div className="match-list">
              {result.matches.map((match) => {
                const criterion = opening.criteria.find((item) => item.id === match.criterionId)!
                return (
                  <article key={match.criterionId} className={`match-card status-${match.status}`}>
                    <div className="match-title"><span className="status-icon" aria-hidden="true">{match.status === 'sustentado' ? '✓' : match.status === 'parcial' ? '◐' : '—'}</span><div><h3>{criterion.label}</h3><span>{statusLabel[match.status]}</span></div></div>
                    <p>{match.reason}</p>
                    <details><summary>Ver trazabilidad</summary><p>{match.evidenceClaimIds.length ? `Afirmaciones citadas: ${match.evidenceClaimIds.join(', ')}.` : 'No se cita evidencia porque el criterio está faltante.'}</p></details>
                  </article>
                )
              })}
            </div>

            <aside className="uncertainty"><strong>Límite obligatorio</strong><p>{result.uncertainty}</p></aside>

            <div className="review-grid">
              <article className="walkthrough-card">
                <p className="eyebrow">Revisión humana obligatoria</p>
                <h2>La persona explica; el sistema no decide.</h2>
                <p>Una revisión de 10 minutos comprueba que la evidencia es comprensible y que las afirmaciones no exceden lo mostrado.</p>
                <button className="secondary-button" type="button" aria-expanded={walkthroughOpen} onClick={() => setWalkthroughOpen((current) => !current)}>{walkthroughOpen ? 'Ocultar preguntas' : 'Preparar mi recorrido'}</button>
                {walkthroughOpen && <ol className="walkthrough-list"><li>¿Qué decisión tomaste y por qué?</li><li>¿Qué parte hiciste tú y qué parte hizo otra persona o herramienta?</li><li>¿Qué salió mal o quedó limitado?</li><li>¿Cómo cambiarías el trabajo para una situación nueva?</li></ol>}
              </article>
              <article className="control-card">
                <p className="eyebrow">Control de la persona</p>
                <h2>Corrige antes de compartir.</h2>
                <label className="correction-check"><input type="checkbox" checked={correctionRequested} onChange={(event) => setCorrectionRequested(event.target.checked)} /><span><strong>Solicito corregir este borrador.</strong><small>El registro exportado conservará esta señal.</small></span></label>
                <button className="primary-button" type="button" onClick={downloadRecord}>Guardar una copia de mi registro</button>
                <p className="export-note">Se guarda en tu dispositivo como archivo .json, un formato que conserva la trazabilidad. No se envía a una empresa ni se guarda en este sitio.</p>
              </article>
            </div>
          </section>
        )}

        <section className="why-section">
          <div><p className="eyebrow">Por qué existe</p><h2>Una primera oportunidad no debería exigir una primera oportunidad.</h2></div>
          <div className="why-copy"><p>Primer Peldaño prueba una idea pequeña: pedir al empleador que cambie el filtro antes de pedirle más trabajo a la persona.</p><p>En un piloto real, el resultado sería empleo formal confirmado a 90 días. Este prototipo solo demuestra el flujo y no afirma una contratación.</p></div>
        </section>
      </main>
      <footer>Primer Peldaño · Week 9 · Evidencia inventada, decisiones explícitas, sin promesas de empleo</footer>
    </div>
  )
}

export default App
