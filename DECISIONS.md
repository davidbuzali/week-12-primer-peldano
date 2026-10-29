# Decision log - Primer Peldaño

## Week 12 session close 1 - charter before rebuild

- Ratified the conditional Week 12 choice: Primer Peldaño, sourced from Week 9 and distinct from the teammates' named chapters.
- Bound the core build to one employer-commitment gate and one criterion-level evidence map.
- Kept the reported October 2026 worker story out of the public demo until consent is documented.
- Preserved the Blueprint shadow clause: no automatic verdict, global score, ranking, verification claim, or hidden repair of missing evidence.
- Chose a Next.js + React + Tailwind + Vercel + GitHub stack with an optional Supabase boundary; no public demo data will be stored.
- Re-verified Opportunity@Work and OECD as primary benchmark sources.
- Prohibited any 10:1 claim until the same task is measured on comparable time, cost, or review probability.
- Tomorrow's first move: migrate the existing Week 9 interface and put the commitment state before all evidence interaction.

## Prior Week 9 close

The Week 9 history remains available in Git. Its last verified state used invented data, deterministic matching, seven passing tests, and a public Vercel demo. Week 12 does not reuse its simulated employer commitment as real-world evidence.

## Week 12 session close 2 - core feature and first deployment

- Migrated the venture to Next.js 16, React 19, TypeScript, and Tailwind 4.
- Added a guarded Supabase client boundary and an owner-scoped RLS migration; the public demo does not store data.
- Built the employer stop-state, invented demo, bounded fields, deterministic criterion map, provenance details, correction signal, and local export.
- Seven logic tests, type checking, lint, and the production build pass.
- First ready deployment: `dpl_4exL42rt5wKZ6D2YvGXHSc4ARM8k`.
- Found and fixed the highest-severity mechanical defect: Vercel Authentication blocked anonymous visitors even though a HEAD request returned 200.
- Assigned `https://primer-peldano-mx.vercel.app` as the venture URL of record and confirmed anonymous browser access.
- Tomorrow's first move: correct the highest-risk usability ambiguity, rerun the full suite, and complete deployment 2.
