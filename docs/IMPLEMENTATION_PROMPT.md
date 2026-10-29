# Week 12 implementation prompt - Primer Peldaño

Rebuild the existing Primer Peldaño prototype from the Week 12 Product Charter. Preserve the venture's strongest Week 9 behavior - criterion-level evidence, transparent missingness, worker correction, local export - while making the employer-commitment gate the first interaction and upgrading to the required free stack.

## Build order

1. **Charter and packet:** commit `PRODUCT_CHARTER.md`, `PACKET.md`, the image-generated mockup, flowchart, swimlane, architecture table, test plan, and this implementation prompt before product code.
2. **Framework and gate:** migrate to Next.js/React/TypeScript and Tailwind; render the venture identity, simulated-data boundary, one opening, and an explicit absent/simulated/real commitment state.
3. **Core map:** implement bounded evidence fields, deterministic visible-text signals, criterion-level supported/partial/unresolved results, provenance, correction, and local JSON export.
4. **Data boundary:** add an optional Supabase client boundary that activates only when public environment variables exist. Do not store demo or personal data. Document the RLS requirement for any future persistence.
5. **Mechanical test and first deploy:** add unit and rendered-output tests, run the production build, deploy to Vercel, and verify the URL.
6. **Persona/QA fix and final deploy:** test the screen sequence, document at least one defect, fix the highest-risk issue, rerun checks, redeploy, and update submission evidence honestly.

## Required behavior

- Default to `demo` commitment state with invented opening and evidence records.
- Explain that production use stops without a real, dated acceptance commitment.
- Validate three fields for presence, length, and sensitive-looking content before mapping.
- Derive all criterion signals from the current visible text. Never keep hidden seed tags after edits.
- Return exactly three states: `supported`, `partial`, and `unresolved`.
- Cite only visible evidence claims in supported/partial states.
- Offer a correction loop and a minimized local export.
- Never show or calculate an aggregate score, rank, match percentage, employment probability, or recommendation.
- Keep the application usable by keyboard and at narrow mobile widths.

## Testable acceptance criteria

- Empty and sensitive-looking fields fail validation with the same Spanish wording shown in the interface.
- Replacing specific evidence with generic text removes prior support.
- Identical input produces identical states and reasons.
- Every non-unresolved criterion contains at least one provenance reference.
- The export excludes names, contact fields, credentials, and environment values.
- The page source includes `Prototipo - datos inventados`, `Sin puntaje global`, and the commitment boundary.
- `pnpm test`, `pnpm lint`, and `pnpm build` pass.
- The verified production URL returns HTTP 200.

## Commit plan

1. `docs: charter the Week 12 venture rebuild`
2. `chore: migrate Primer Peldaño to the Week 12 stack`
3. `feat: build the criterion-level evidence map`
4. `test: verify the Week 12 core workflow`
5. `fix: resolve the highest-risk usability defect`
6. `docs: finalize Week 12 deployment evidence` (only if deployment records require a separate commit)
