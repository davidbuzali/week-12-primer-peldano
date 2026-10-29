# Week 12 preliminary persona walkthrough - Primer Peldaño

**Date:** 29 October 2026

## Integrity note

This is a preliminary, developer-run heuristic walkthrough using a synthetic persona. It did **not** occur in a fresh independent chat and therefore must not be presented as the course's completed Layer 1 persona test. It is useful for finding obvious comprehension risks before a real or independently simulated user sees the product. A fresh-chat transcript or consented worker test remains required for the final submission claim.

## Synthetic persona

**Rogelio A. (invented), 52, Estado de México.** Rogelio has worked in maintenance and textile operations through informal arrangements. He uses WhatsApp, reads slowly on his phone, distrusts hiring platforms, and leaves a process when it appears to demand unpaid work or hide who will see his information. He worries that his experience “no cuenta” because the workplace was unfamiliar to employers.

He is not the reported real worker and contains no real person's data.

## Screen-by-screen walkthrough

### 1. Venture promise and boundary

Likely understanding: “This wants to help describe work I already did, not send me to another course.”

Likely hesitation: “Does this system decide whether I am qualified?”

Visible answer: the hero says the system does not verify the story, decide a hire, or complete missing evidence. `Sin puntaje global` appears before the analysis.

### 2. Employer commitment gate

Highest-risk confusion in the first build: the page opened in demo mode and displayed editable evidence fields below an invented commitment. A hurried user could scroll past the words `simulado` and assume that an employer was ready to receive the record.

Fix applied:

- the default page state is now the real stop-state;
- no evidence fields exist in that state;
- the active option says `Uso real: sin compromiso`;
- the only way to continue is an explicit `Abrir demo inventada` action;
- the stop-state assigns the next action to the employer, not the worker.

### 3. Invented evidence entry

Likely understanding: “I can practice with an example and change the description.”

Likely fear: “Will this send my information somewhere?”

Visible answer: the privacy instruction appears before all fields; it prohibits names, contact details, identifiers, accounts, passwords, and health data. The footer says Supabase is not configured and the demo stores nothing. An email entered during browser QA was blocked.

### 4. Criterion map

Likely understanding: green means the visible story supports a criterion, amber means something is missing, and red means there is no visible evidence.

Integrity challenge: replacing the specific example with generic text produced three `Sin evidencia` states and one `Parcial`; the product did not preserve hidden support.

Likely hesitation: “Does green mean they will hire me?”

Visible answer: the result says it organizes only what was declared and cannot verify truth, fairness, vacancy existence, or a hiring decision. Human review remains required.

### 5. Correction and export

Likely understanding: “I can mark that I want a correction and save my own copy.”

Visible answer: the export is labeled `.json` but explained in plain language as a copy saved on the device, not sent to an employer or stored by the site.

## Preliminary confusion register

| Priority | Confusion | Risk | Resolution |
|---|---|---|---|
| 1 | Invented commitment was active by default | Worker mistakes a demonstration for employer readiness | Default to blocked real-use state; require explicit demo choice |
| 2 | A 200 HEAD response masked Vercel login protection | Grader or worker cannot open the URL | Remove project authentication and verify anonymous browser navigation |
| 3 | Simulated examples could invite real data entry | Accidental disclosure | Put privacy boundary before fields, block sensitive patterns, store nothing |
| 4 | Criterion color could be read as a hiring verdict | False confidence | Repeat no-score and human-review boundaries; preserve missingness |

## Retest verdict

The revised first screen now stops before evidence by default and makes the invented demo an explicit choice. The live browser also demonstrated sensitive-data rejection, visible-text recalculation, correction control, and mobile layout without horizontal overflow.

This is not evidence that Rogelio or a real worker would understand, trust, or benefit from the product. The remaining Layer 1 task is to run the screen sequence in a fresh chat with the persona prompt below, preserve the transcript, and fix any higher-severity confusion it discovers.

## Prompt for the required fresh-chat pass

> You are Rogelio A., an invented 52-year-old worker in Estado de México. You have decades of maintenance and textile-operations experience from informal arrangements, use WhatsApp, read slowly on your phone, distrust hiring platforms, and abandon processes that demand unpaid work or hide who will see your information. I will show you Primer Peldaño one screen at a time. Attempt the task as Rogelio. Narrate what you think each screen means, what you fear, every word you do not understand, and the exact point where you would leave. Do not be polite to the product and do not invent capabilities you cannot see.
