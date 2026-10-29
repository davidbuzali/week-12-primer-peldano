# Week 12 testing log - Primer Peldaño

**Test date:** 29 October 2026, America/Mexico_City

**URL of record:** https://primer-peldano-mx.vercel.app

**First ready deployment:** `dpl_4exL42rt5wKZ6D2YvGXHSc4ARM8k`

## Mechanical pass 1

### Automated checks

- `pnpm typecheck`: passed.
- `pnpm lint`: passed with zero warnings.
- `pnpm test`: seven logic tests passed, zero failed.
- `pnpm build`: Next.js 16 production build passed with a statically rendered `/` route.

The logic suite covers required fields, length limits, sensitive-looking input, deterministic claim construction, visible-text matching, supported/partial/missing states, provenance, minimized export, and the absence of an aggregate score.

### First deployment attempt and defect

The first Vercel upload reached the linked Week 9 project but failed because the project still expected the former Vite `dist` output. The code had migrated to Next.js, which produces `.next`. The durable project configuration now declares `framework: nextjs` and `outputDirectory: .next` in `vercel.json`; the Vercel project settings were aligned to the same values and Node 22.

A second upload produced the first ready Week 12 deployment and assigned both the legacy production alias and the venture-identity alias.

### High-severity mechanical bug found

**An anonymous browser was redirected to Vercel login.** An HTTP HEAD request returned 200, but a real navigation exposed project-level Vercel Authentication. This violated the Blueprint's URL-of-record condition: the company's door did not open for a grader or user.

**Cause:** the linked project had `ssoProtection.deploymentType = all_except_custom_domains`. A `.vercel.app` alias was still protected even though it was assigned to the production deployment.

**Fix:** removed Vercel Authentication for this public coursework project only. The project contains no secrets or personal data, the demo writes no records, and previews do not expose user information. The project remains on HTTPS; source/log protection and Git-fork protection were not disabled.

**Verification:** an anonymous in-app browser loaded `https://primer-peldano-mx.vercel.app` directly, with no login screen. The accessibility tree showed the public page and all expected controls.

## Live browser checks

### Employer gate

- `Ver bloqueo real` removes all evidence inputs.
- The stop-state says no evidence or data should be requested before a real, dated employer commitment.
- Returning to the simulated demo restores invented records only.

### Input and integrity

- Replacing the first field with `persona@example.com` blocks mapping and reports that the field appears to contain sensitive data.
- Replacing all visible evidence with generic text produces three `Sin evidencia` states and one `Parcial`; no hidden seed support survives.
- Each status explains its reason, and only supported/partial states can cite visible claims.

### Responsive layout

- Desktop viewport: no horizontal overflow; hero, gate, opening, evidence form, and result cards render in the intended hierarchy.
- Mobile viewport at 390 x 844: `scrollWidth` equals `innerWidth` (390); header, hero, criteria, example cards, inputs, and output cards stack without clipping.

## Security floor

| Check | Result |
|---|---|
| No secrets in code or repository | Pass. `.env.example` contains blank public variables only; no service-role key exists. |
| Authentication for personal data | Not applicable to the public demo: it accepts invented examples and stores nothing. |
| Supabase RLS | Pass for the optional future preflight table: RLS is enabled and policies require `auth.uid() = owner_id`. The migration is not applied to the public demo. |
| Input validation | Pass: required text, length limits, email/phone/credential patterns, and card-number-like text are blocked. |
| No real personal data | Pass: the reported worker story is not in the public application; all displayed people, employers, openings, and records are labeled invented. |

## Remaining pass

The final release still requires one usability correction, the second production deployment, another anonymous URL check, and an honest persona record. A synthetic or heuristic walkthrough cannot validate employer demand, worker benefit, or lived experience.
