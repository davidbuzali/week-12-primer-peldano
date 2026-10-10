# Build chat - Primer Peldaño

**Week 9 individual build**  
**Participant:** David Buzali  
**Development date:** 10 October 2026  
**Repository:** https://github.com/davidbuzali/week-9-primer-peldano  
**Live URL:** https://week-9-first-rung.vercel.app

This transcript records the complete user-visible development exchange for the build, followed by the exact implementation and verification actions. Long tool logs are summarized with their terminal outcome; they are evidence, not hidden product claims.

## 1. David - request

David supplied his PPPP-RRRR-VVVV Manifesto as the values framework. The manifesto commits to meaningful contribution, educational opportunity in Mexico, consequential problem solving, disciplined improvement, ethical and feasible decisions, health, reciprocal relationships, personal boundaries, visible results, calculated risk, and the use of AI without abandoning judgment or self-trust.

David also supplied the Week 9 assignment text and the team's Blueprint PDF. The request instructed Codex to distinguish attached-document instructions from David's request and added a standing delivery requirement: coursework must be committed, pushed to GitHub, and deployed on Vercel; if access fails, reauthenticate.

## 2. Codex - source separation and workflows

> I’m using the PDF workflow to extract the assignment accurately and the Sites workflow because your delivery requirements include a deployed coursework site. I’ll first separate the assignment’s instructions from your manifesto, then build, verify, commit, push, and deploy the result.

Codex extracted the assignment as reference material. The Week 9 requirements were: packet before code; image-generated mockup; Mermaid flow and actor swimlane; benchmark and long view; Dragon Stack; at least five commits and two deploys; mechanical and persona tests; a documented bug-fix-redeploy cycle; security floor; and the packet, persona, and build-chat PDFs. The attached content also forbade a CV builder or job board.

## 3. Codex - product interpretation

> The strongest interpretation of your manifesto and the Blueprint is a narrow product called “Primer Peldaño”: it converts already-completed informal work into criterion-level evidence for one verified opening, with an employer’s explicit proof-acceptance gate. It is deliberately not a CV builder or job board. I’m using image generation now because the assignment explicitly requires an image-generated mockup inside the packet.

An image-generation prompt produced a high-fidelity Spanish dashboard concept with a simulated Daniela example, one verified opening, three mapped criteria, human review, and an employer acceptance card. The image was copied into the project before any app code.

## 4. Codex - packet before code

> I’m turning the Blueprint into a testable contract before touching app code. The packet will explicitly preserve the shadow clause, identify Opportunity@Work as the benchmark, include both required Mermaid diagrams, and state the uncomfortable truth: the employer commitment in this prototype is simulated, so the build validates the workflow—not market demand.

Codex wrote `docs/PACKET.md` and `docs/IMPLEMENTATION_PROMPT.md`, then created the first commit: `docs: define Week 9 first-proof packet`.

## 5. David - repository correction

> Remember to make a separate week 9 repository please

## 6. Codex - repository isolation

> Absolutely. I’ll isolate `week-9-first-rung` as its own local Git repository and publish it to a new Week 9 GitHub repository; I’ll also undo the accidental parent-repository commit so Week 9 history stays clean and independent.

Codex reverted the accidental parent-repository commit, restored the Week 9 files, initialized a new `main` repository inside `week-9-first-rung`, and recreated the packet and scaffold commits there.

## 7. Codex - build and automated checks

The implementation added:

- an employer commitment gate before evidence intake;
- one invented operations opening with four published criteria;
- three invented existing-work examples;
- required-field, length, and sensitive-data validation;
- labeled deterministic simulated-AI claims;
- supported, partial, and missing criterion states with reasons;
- evidence provenance, uncertainty, human walkthrough, correction state, and portable local JSON export;
- no account, database, API secret, or network request.

Commits 2 through 4 were:

1. `feat: scaffold Primer Peldaño evidence workflow`
2. `feat: add explainable proof matching and export`
3. `test: validate evidence safety and matching`

The first pass returned 6 tests passed and a successful production build.

## 8. Codex - separate GitHub repository

> The working slice now has four commits, passes six logic/security tests, and builds successfully. Next I’m creating the dedicated GitHub repository and making the first Vercel deployment; after that I’ll run the required mechanical and persona passes, document the bug, fix it, and redeploy.

GitHub CLI reported an invalid token. Following David's standing instruction, Codex began device reauthentication.

> GitHub needs a quick device authorization. I’m opening GitHub’s device page now; please approve code **2320-9C8B** in the browser, then I’ll continue automatically.

Authorization completed. Codex created and pushed the public repository `davidbuzali/week-9-primer-peldano`.

## 9. Codex - first deployment and tests

The first production deployment completed and was aliased to `https://week-9-first-rung.vercel.app`. An anonymous HTTP request returned 200. Browser tests confirmed the default flow, focus movement, sensitive-data block, walkthrough expansion, and portable download.

## 10. Codex - bug found in production

> The first live pass found a real integrity bug: after replacing every evidence field with generic text, the app still marked all four criteria “supported” because matching relied on the seed’s hidden tags. The persona pass also surfaced two trust problems—the privacy warning arrived after the fields, and technical labels such as `task` and “JSON” appeared without explanation. I’m fixing all three before the second deploy.

The exact reproduction text was “Había algo pendiente,” “Ayudé con el trabajo,” and “Terminamos.” The faulty build returned four supported criteria.

## 11. Codex - repair

Codex changed the matcher to derive bounded tags from the visible Spanish evidence text, trace only relevant claims, and recompute missing signals. It moved the privacy instruction above the fields, translated internal field and tag names, and renamed the export action in plain language. A seventh regression test was added. All 7 tests passed and the production build succeeded.

Commit 5 was `fix: make matches follow edited evidence`.

## 12. Codex - second deployment and retest

The second production deployment completed and replaced the stable alias. The exact generic reproduction now returned:

- Atención al cliente: `Faltante`
- Organización de tareas: `Faltante`
- Iniciativa y mejora: `Parcial`
- Herramientas digitales: `Faltante`

The default invented Daniela example still produced supported criteria. The four human-walkthrough questions opened, the portable record downloaded, and the stable URL remained publicly accessible.

> The second deployment is live and the repaired flow now reacts correctly to edited evidence, exposes missing criteria, opens the human-review questions, and downloads a portable record. I’m finalizing the documented test evidence, persona log, demo script, decision trail, and the three required submission PDFs next.

## 13. Close

The final source, decisions, testing record, persona log, demo script, image-generated mockup, and submission PDFs were committed to the separate Week 9 repository and pushed to GitHub. The live Vercel alias points to the fixed build.
