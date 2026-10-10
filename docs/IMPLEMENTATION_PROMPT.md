# Implementation prompt - Primer Peldaño

Build the Week 9 working slice described in `docs/PACKET.md` as a polished, responsive React + TypeScript + Vite web app in Spanish.

## Product contract

The app must help a young worker translate **existing, invented informal work** into criterion-level evidence for one invented `Auxiliar de operaciones` opening. It is not a CV builder, job board, course, test, or new work assignment. Before evidence collection, show a simulated employer commitment to accept named proof instead of one year of prior experience. Use a labeled deterministic simulated-AI layer and transparent matching logic. Require human review and never rank a candidate or promise employment.

## Features

1. **Opening gate**
   - Display the invented opening, opening ID, four criteria, issuer, acceptance date, and commitment language.
   - Mark every identity and status as simulated.
   - Explain that without a real commitment the production process must stop.

2. **Structured evidence intake**
   - Offer three invented work examples and prefill a safe scenario.
   - Allow bounded edits to a task, action, result, and evidence type.
   - Validate required fields, maximum lengths, and common sensitive-data patterns.
   - Store nothing after the tab closes.

3. **Simulated-AI evidence draft**
   - Convert the structured fields into concise claims without inventing facts.
   - Label the output “IA simulada” wherever it appears.
   - State the uncertainty and what still needs human verification.

4. **Criterion matching**
   - Compare evidence tags with the published criterion requirements.
   - Return `sustentado`, `parcial`, or `faltante` with a plain-language reason.
   - Cite the supporting evidence item for every positive match.
   - Do not compute an aggregate score.

5. **Review and portability**
   - Show a four-question human walkthrough.
   - Let the worker mark a claim for correction.
   - Download a minimized JSON record with schema version, simulated-data flag, commitment, claims, matches, provenance, and correction state.

6. **Narrative and boundaries**
   - Include a concise “why this exists” section tied to Mexico's first-rung problem.
   - Name the 90-day formal-employment checkpoint as the future outcome, not a current result.
   - State that the prototype does not verify identity, truth, authorship, fairness, a vacancy, or a hire.

## Acceptance criteria

- TypeScript compiles and the Vite production build succeeds.
- Unit tests cover validation, deterministic claims, status logic, no aggregate score, and minimized export.
- The flow works without API keys, database, authentication, or network calls.
- No real personal data or real company names appear in seeds.
- Inputs have labels, errors are announced, focus moves to results, and contrast/focus states are visible.
- The design is distinct, calm, and credible: warm paper background, navy typography, terracotta actions, teal verification accents, and a subtle stair motif.
- Mobile layouts remain usable at 360px.

## Commit plan

1. `docs: define Week 9 first-proof packet`
2. `feat: scaffold Primer Peldaño evidence workflow`
3. `feat: add explainable proof matching and export`
4. `test: validate evidence safety and matching`
5. `fix: address mechanical and persona test findings`
6. `docs: finalize Week 9 submission artifacts`

Deploy after commit 4, run both test passes, fix the worst observed issue, then deploy again.
