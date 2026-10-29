import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const appSource = readFileSync(new URL('../src/components/VentureApp.tsx', import.meta.url), 'utf8')
const migration = readFileSync(new URL('../supabase/migrations/20261029000000_venture_preflights.sql', import.meta.url), 'utf8')
const vercelConfig = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))

test('public interface exposes the Week 12 authority boundaries', () => {
  for (const phrase of [
    'Prototipo - datos inventados',
    'Sin puntaje global',
    'Sin compromiso, el proceso se detiene aquí.',
    'No verifica tu historia, no decide una contratación',
    'Supabase no configurado; el demo no guarda datos.',
  ]) assert.match(appSource, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.match(appSource, /useState<GateMode>\('blocked'\)/)
  assert.match(appSource, /Abrir demo inventada/)
})

test('optional Supabase table is owner-scoped with RLS', () => {
  assert.match(migration, /enable row level security/i)
  assert.match(migration, /auth\.uid\(\).*owner_id/i)
  assert.doesNotMatch(migration, /service[_-]?role/i)
})

test('Vercel configuration targets the Next.js output', () => {
  assert.equal(vercelConfig.framework, 'nextjs')
  assert.equal(vercelConfig.outputDirectory, '.next')
})
