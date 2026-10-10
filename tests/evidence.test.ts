import assert from 'node:assert/strict'
import test from 'node:test'
import { evidenceExamples, opening } from '../src/data.ts'
import { analyzeEvidence, buildPortableRecord, buildSimulatedClaims, matchCriteria, recordHasAggregateScore, validateDraft } from '../src/logic.ts'

const daniela = evidenceExamples[0]

test('complete invented evidence passes bounded validation', () => {
  assert.equal(validateDraft(daniela).length, 0)
})

test('empty, over-length, and sensitive input are rejected', () => {
  const emptyErrors = validateDraft({ ...daniela, task: '   ' })
  const longErrors = validateDraft({ ...daniela, action: 'a'.repeat(221) })
  const sensitiveErrors = validateDraft({ ...daniela, result: 'Escríbeme a persona@example.com con mi contraseña.' })
  assert.equal(emptyErrors.length, 1)
  assert.equal(longErrors.length, 1)
  assert.ok(sensitiveErrors.some((error) => /sensibles/i.test(error)))
})

test('simulated claims preserve declared facts and normalize spacing', () => {
  const claims = buildSimulatedClaims({ ...daniela, task: '  Coordiné   siete pedidos  ' })
  assert.equal(claims[0].statement, 'Coordiné siete pedidos.')
  assert.equal(claims[0].simulatedAi, true)
  assert.equal(claims[0].sourceField, 'task')
})

test('criterion matching is deterministic and cites evidence', () => {
  const claims = buildSimulatedClaims(daniela)
  const first = matchCriteria(daniela, opening, claims)
  const second = matchCriteria(daniela, opening, claims)
  assert.deepEqual(first, second)
  assert.ok(first.every((match) => match.status === 'sustentado'))
  assert.ok(first.every((match) => match.evidenceClaimIds.length > 0))
})

test('partial and missing states expose the gap instead of inventing support', () => {
  const sparse = { ...daniela, tags: ['cliente'] }
  const result = analyzeEvidence(sparse, opening)
  assert.equal(result.matches.find((match) => match.criterionId === 'cliente')?.status, 'parcial')
  assert.equal(result.matches.find((match) => match.criterionId === 'herramientas')?.status, 'faltante')
  assert.deepEqual(result.matches.find((match) => match.criterionId === 'herramientas')?.evidenceClaimIds, [])
})

test('portable record is minimized, simulated, and has no aggregate score', () => {
  const result = analyzeEvidence(daniela, opening)
  const record = buildPortableRecord(daniela, opening, result, true)
  assert.equal(record.simulatedData, true)
  assert.equal(record.correctionRequested, true)
  assert.deepEqual(Object.keys(record.worker), ['alias'])
  assert.equal(recordHasAggregateScore(record), false)
  assert.equal(JSON.stringify(record).includes('persona@example.com'), false)
})
