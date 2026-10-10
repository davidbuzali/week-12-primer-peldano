import { useMemo, useState } from 'react'
import { evidenceExamples, opening } from './data'
import type { EvidenceDraft } from './types'

function App() {
  const [selectedId, setSelectedId] = useState(evidenceExamples[0].exampleId)
  const selected = useMemo(() => evidenceExamples.find((item) => item.exampleId === selectedId) ?? evidenceExamples[0], [selectedId])
  const [draft, setDraft] = useState<EvidenceDraft>(selected)

  const chooseExample = (id: string) => {
    const next = evidenceExamples.find((item) => item.exampleId === id) ?? evidenceExamples[0]
    setSelectedId(id)
    setDraft(next)
  }

  const update = (field: 'task' | 'action' | 'result', value: string) => setDraft((current) => ({ ...current, [field]: value }))

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
            <div className="field-stack">
              <label><span>¿Qué necesitaba resolverse?</span><textarea maxLength={180} value={draft.task} onChange={(event) => update('task', event.target.value)} /><small>{draft.task.length}/180</small></label>
              <label><span>¿Qué hiciste tú?</span><textarea maxLength={220} value={draft.action} onChange={(event) => update('action', event.target.value)} /><small>{draft.action.length}/220</small></label>
              <label><span>¿Qué cambió o quedó listo?</span><textarea maxLength={180} value={draft.result} onChange={(event) => update('result', event.target.value)} /><small>{draft.result.length}/180</small></label>
            </div>
            <div className="evidence-source"><span>Tipo de evidencia simulada</span><strong>{draft.evidenceType}</strong></div>
            <button className="primary-button" type="button" disabled>Analizar evidencia <span aria-hidden="true">→</span></button>
            <p className="coming-soon">La siguiente iteración conecta la validación, la IA simulada y el emparejamiento transparente.</p>
          </div>
        </section>
      </main>
      <footer>Primer Peldaño · Week 9 · Evidencia inventada, decisiones explícitas, sin promesas de empleo</footer>
    </div>
  )
}

export default App
