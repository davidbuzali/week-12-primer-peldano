# Testing log - Primer Peldaño

## Release under test

- Repository: https://github.com/davidbuzali/week-9-primer-peldano
- Production alias: https://week-9-first-rung.vercel.app
- First production deployment: `3YM2J37TdjFDijK5zzJq9LwG1p8j`
- Fixed production deployment: `4ib25vxRPZ6bxakDMWXPb2rU37QZ`
- Test date: 10 October 2026, America/Mexico_City

## Mechanical pass 1

### Automated checks

`node --experimental-strip-types --test tests/*.test.ts`

- 6 tests passed, 0 failed before the first deployment.
- Covered required input, length limits, sensitive-data patterns, deterministic simulated claims, supported/partial/missing matching, evidence citations, minimized export, and the absence of an aggregate score.

`tsc -b && vite build`

- TypeScript completed without errors.
- Vite produced the static production bundle.

Anonymous production request:

- `https://week-9-first-rung.vercel.app` returned HTTP 200.
- The stable production alias was publicly accessible; the generated deployment URL remained protected by Vercel's standard protection.

### Browser walk-through

The first production build was opened at the stable URL in a narrow mobile-sized browser. The Daniela example completed the flow, focused the result, opened the human-review questions, and downloaded the portable JSON file.

Security validation was exercised by replacing the task with `persona@example.com`. The interface blocked analysis and explained that the field appeared to contain sensitive data.

## Bug found

**Severity: high - evidence integrity.** I replaced all three visible evidence fields with generic statements: “Había algo pendiente,” “Ayudé con el trabajo,” and “Terminamos.” The first deployment still marked all four criteria `Sustentado`.

**Cause:** matching used the selected seed's hidden tags instead of deriving signals from the visible, edited text. A worker could therefore change or erase the stated evidence while the status remained positive.

**Fix:** the matching layer now normalizes the visible Spanish text, derives bounded tags with deterministic keyword rules, traces each criterion to only the claims that contain a relevant signal, and recalculates the missing tags on every analysis. A regression test proves that generic text can no longer retain hidden support.

## Persona pass

The full log is in `docs/PERSONA.md`. In addition to the integrity bug, the simulated user hesitated because the privacy warning appeared after the editable fields and because the result exposed English field names and a technical `JSON` label.

Fixes:

- moved the invented-data/privacy instruction before the first editable field;
- replaced raw field keys with Spanish questions in validation errors and evidence provenance;
- translated internal tag names into plain Spanish reasons;
- renamed the export action from “Descargar registro JSON” to “Guardar una copia de mi registro,” with a plain-language explanation of the file format.

## Mechanical pass 2

After the fix:

- 7 tests passed, 0 failed, including the new hidden-tag regression test;
- TypeScript and the production build passed;
- the second production deployment reached `Ready` and replaced the stable alias;
- the same generic text produced three `Faltante` states and one `Parcial`, with explicit reasons;
- the default Daniela example still produced four supported criteria;
- the four human-walkthrough questions opened;
- the portable record downloaded successfully;
- the production alias returned HTTP 200 anonymously.

## Security floor

| Check | Result |
|---|---|
| No secrets in code or repository | Pass. No API integration or environment secret is used. |
| Authentication for personal data | Not applicable: the prototype stores no data and explicitly accepts invented examples only. |
| Row-level security | Not applicable: there is no database. |
| Input validation | Pass: required fields, length limits, and sensitive-data patterns are enforced before analysis. |
| No real personal data | Pass: every person, employer, opening, issuer, record, and claim is labeled invented or simulated. |

## Known limits

- Keyword matching is intentionally narrow and not appropriate for production hiring.
- The app does not verify identity, evidence truth, authorship, employer authority, vacancy existence, fairness, or employment.
- The employer commitment is simulated. A real pilot must obtain the commitment before asking a worker for evidence.
- The product-level outcome remains consent-verified formal employment at 90 days; this prototype cannot measure it.
