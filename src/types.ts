export type MatchStatus = 'sustentado' | 'parcial' | 'faltante'

export interface Criterion {
  id: string
  label: string
  description: string
  requiredTags: string[]
}

export interface AcceptanceCommitment {
  id: string
  issuedBy: string
  acceptedOn: string
  replaces: string
  language: string
  simulated: true
}

export interface Opening {
  id: string
  title: string
  location: string
  schedule: string
  openings: number
  criteria: Criterion[]
  commitment: AcceptanceCommitment
}

export interface EvidenceDraft {
  exampleId: string
  workerAlias: string
  context: string
  task: string
  action: string
  result: string
  evidenceType: string
  tags: string[]
}

export interface EvidenceExample extends EvidenceDraft {
  label: string
  shortDescription: string
}

export interface EvidenceClaim {
  id: string
  statement: string
  sourceField: 'task' | 'action' | 'result'
  evidenceType: string
  simulatedAi: true
}

export interface CriterionMatch {
  criterionId: string
  status: MatchStatus
  matchedTags: string[]
  reason: string
  evidenceClaimIds: string[]
}

export interface AnalysisResult {
  claims: EvidenceClaim[]
  matches: CriterionMatch[]
  missingTags: string[]
  uncertainty: string
}
