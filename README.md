# Primer Peldaño

Primer Peldaño is David Buzali's Week 12 venture rebuild. It maps worker-controlled evidence from existing informal work to criteria for one opening, but only after an employer-commitment gate. The software preserves provenance and missingness; it never produces a global candidate score, hiring prediction, verification claim, or automatic verdict.

- Live venture URL: https://primer-peldano-mx.vercel.app
- GitHub: https://github.com/davidbuzali/week-12-primer-peldano
- Vercel project: https://vercel.com/davidbuzali/week-12-primer-peldano
- Product charter: `docs/PRODUCT_CHARTER.md`
- Packet-before-code: `docs/PACKET.md`
- Testing and deploy cycle: `docs/TESTING.md`
- Preliminary persona walkthrough: `docs/PERSONA.md`
- Demo narration: `docs/DEMO_SCRIPT.md`
- Build conversation: `docs/BUILDCHAT.md`

## Status honesty

The public flow uses invented people, employer, opening, commitment, and evidence. The reported real worker story is not published because consent is not documented. Employer demand, a real acceptance commitment, comparable 10:1 improvement, evidence truth, human review, and employment outcomes remain unverified.

The application starts in the real-use stop-state. A visitor must explicitly choose `Abrir demo inventada` before any evidence fields appear.

## Week 12 stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- deterministic, visible-text evidence matching
- optional Supabase client boundary with an owner-scoped RLS migration
- Vercel production hosting under a venture-identity alias
- GitHub source with five ordered Week 12 implementation commits plus final documentation

No Supabase environment is configured in the public demo. It stores and sends no records. `.env.example` contains blank public variables only; no service-role key belongs in the project.

## Local verification

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Final verified state: 10 tests passed; type checking, lint, and the Next.js production build passed; the venture URL loaded anonymously on desktop and at 390 x 844.

## Submission artifacts

- `output/pdf/PACKET_David_Buzali.pdf`
- `output/pdf/PERSONA_David_Buzali.pdf`
- `output/pdf/BUILDCHAT_David_Buzali.pdf`

The persona PDF is explicitly preliminary because a fresh independent-chat test has not yet been performed. Do not represent it as completed Layer 1 evidence.
