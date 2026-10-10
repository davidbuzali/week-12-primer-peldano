import type { AnalysisResult, CriterionMatch, EvidenceClaim, EvidenceDraft, Opening } from './types'

const limits = { task: 180, action: 220, result: 180 } as const
const sensitivePatterns = [
  /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i,
  /\b(?:\+?52\s?)?(?:\d[\s-]?){10}\b/,
  /\b(?:contrase(?:ñ|n)a|password|nip|cvv|curp|rfc|nss|clabe|tarjeta)\b/i,
  /\b(?:\d[ -]*?){16}\b/,
]

export function validateDraft(draft: EvidenceDraft): string[] {
  const errors: string[] = []
  ;(['task', 'action', 'result'] as const).forEach((field) => {
    const value = draft[field].trim()
    if (!value) errors.push(`Completa “${field === 'task' ? 'qué necesitaba resolverse' : field === 'action' ? 'qué hiciste tú' : 'qué cambió'}”.`)
    if (value.length > limits[field]) errors.push(`El campo ${field} supera ${limits[field]} caracteres.`)
    if (sensitivePatterns.some((pattern) => pattern.test(value))) errors.push(`El campo ${field} parece incluir datos sensibles. Elimínalos para continuar.`)
  })
  return [...new Set(errors)]
}

function normalizeSentence(value: string): string {
  const trimmed = value.trim().replace(/\s+/g, ' ')
  if (!trimmed) return ''
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

export function buildSimulatedClaims(draft: EvidenceDraft): EvidenceClaim[] {
  return [
    { id: `${draft.exampleId}-task`, statement: normalizeSentence(draft.task), sourceField: 'task', evidenceType: draft.evidenceType, simulatedAi: true },
    { id: `${draft.exampleId}-action`, statement: normalizeSentence(draft.action), sourceField: 'action', evidenceType: draft.evidenceType, simulatedAi: true },
    { id: `${draft.exampleId}-result`, statement: normalizeSentence(draft.result), sourceField: 'result', evidenceType: draft.evidenceType, simulatedAi: true },
  ]
}

export function matchCriteria(draft: EvidenceDraft, opening: Opening, claims: EvidenceClaim[]): CriterionMatch[] {
  return opening.criteria.map((criterion) => {
    const matchedTags = criterion.requiredTags.filter((tag) => draft.tags.includes(tag))
    const status = matchedTags.length === criterion.requiredTags.length ? 'sustentado' : matchedTags.length > 0 ? 'parcial' : 'faltante'
    const missing = criterion.requiredTags.filter((tag) => !matchedTags.includes(tag))
    const reason = status === 'sustentado'
      ? `Hay evidencia declarada para ${matchedTags.join(' y ')}.`
      : status === 'parcial'
        ? `Hay una señal de ${matchedTags.join(' y ')}, pero falta evidencia de ${missing.join(' y ')}.`
        : `No hay evidencia declarada de ${criterion.requiredTags.join(' ni ')}.`
    const evidenceClaimIds = status === 'faltante' ? [] : claims.map((claim) => claim.id)
    return { criterionId: criterion.id, status, matchedTags, reason, evidenceClaimIds }
  })
}

export function analyzeEvidence(draft: EvidenceDraft, opening: Opening): AnalysisResult {
  const claims = buildSimulatedClaims(draft)
  const matches = matchCriteria(draft, opening, claims)
  const missingTags = opening.criteria.flatMap((criterion) => criterion.requiredTags).filter((tag, index, all) => !draft.tags.includes(tag) && all.indexOf(tag) === index)
  return {
    claims,
    matches,
    missingTags,
    uncertainty: 'Este borrador organiza lo declarado. No verifica identidad, contexto, verdad, autoría, justicia de la evaluación ni que la vacante exista.',
  }
}

export function buildPortableRecord(draft: EvidenceDraft, opening: Opening, result: AnalysisResult, correctionRequested: boolean) {
  return {
    schemaVersion: 'primer-peldano/0.1',
    simulatedData: true,
    exportedAt: new Date().toISOString(),
    worker: { alias: draft.workerAlias },
    opening: {
      id: opening.id,
      title: opening.title,
      commitment: opening.commitment,
      criteria: opening.criteria.map(({ id, label, description }) => ({ id, label, description })),
    },
    evidence: {
      id: draft.exampleId,
      context: draft.context,
      evidenceType: draft.evidenceType,
      claims: result.claims,
    },
    matches: result.matches,
    unresolved: result.missingTags,
    correctionRequested,
    humanReview: { required: true, completed: false },
    limitations: result.uncertainty,
  }
}

export function recordHasAggregateScore(record: unknown): boolean {
  return /(?:score|puntaje|ranking|probability|probabilidad)/i.test(JSON.stringify(record))
}
