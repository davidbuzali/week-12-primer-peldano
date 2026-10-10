# Persona test log - Primer Peldaño

**Test date:** 10 October 2026  
**Builds:** first and fixed production deployments  
**Method:** a fresh, self-contained persona prompt was applied to the live screen sequence in a narrow mobile-sized browser. Each screen was read in order and the persona narrated where she would hesitate, misunderstand, or leave. No real person's data was used.

## Synthetic user

**Daniela R. (invented), 22, Mexico City.** Daniela sells desserts from home with her family. She coordinates orders through WhatsApp, trusts people more than unfamiliar platforms, reads carefully on her phone, and silently abandons a process when it hides requirements or asks for information she does not understand. She worries that informal work “doesn't count” and does not know what a structured evidence record or JSON file is.

Persona prompt:

> You are Daniela R., 22, an invented worker in Mexico City who helps a family dessert business. You use WhatsApp daily but distrust unfamiliar hiring platforms. Read slowly and narrate what you think each screen is asking, where you hesitate, what you fear could happen to your information, and the exact point where you would quit. Do not be polite to the product. Do not invent capabilities you cannot see.

## Screen-by-screen log

### Screen 1 - promise and employer gate

What Daniela understood: “This says my real work may count even if it was not a formal job.”

Hesitation: “Is Empresa Horizonte real? Am I already applying?”

Evidence on screen: the opening, employer, date, and commitment are repeatedly marked simulated or invented, and the boundary card says the prototype does not verify or hire.

Decision: keep the explicit labels. The screen makes the product's strongest condition visible before asking for evidence.

### Screen 2 - choose and edit existing work

What Daniela understood: “I can start from an example like my dessert orders.”

Confusion: the warning not to use real personal data appeared after the text fields. Daniela could begin typing client names or phone numbers before seeing it.

Where she might quit: if the first error used the internal word `task`, she would assume the system was not made for her.

Fix applied: moved the invented-data/privacy instruction above the fields and replaced all internal field keys in errors with the exact Spanish question shown on screen.

### Screen 3 - evidence map

What Daniela understood: “The green cards mean the story connects to what the employer asked for.”

Critical failure found: after all three fields were changed to vague text, every card still said `Sustentado`. Daniela's reaction: “Then it is just telling me what I want to hear. I would not trust this.”

Fix applied: matches now come only from signals in the visible edited text. After the fix, the vague version produces three missing criteria and one partial criterion. Reasons use plain Spanish rather than hidden tag names.

### Screen 4 - human review and copy

What Daniela understood: “A person will still ask me how I did the work.”

Confusion: “Descargar registro JSON” sounded technical and did not say where the file went or whether the employer received it.

Fix applied: renamed the action to “Guardar una copia de mi registro” and explained that `.json` is a traceable file saved only on the device, not sent to an employer or stored by the site.

## Confusion register

| Priority | Confusion | Risk | Resolution |
|---|---|---|---|
| 1 | Green support survived after evidence text was erased | False trust and invalid evidence | Rebuilt matching from visible text and added a regression test |
| 2 | Privacy warning arrived after editable fields | Accidental personal-data entry | Moved the warning above all fields |
| 3 | Errors and provenance used `task`, `action`, `result` | Language mismatch and abandonment | Replaced with the Spanish screen questions |
| 4 | `JSON` export sounded like a developer task | Unclear next action | Renamed action and explained local file behavior |

## Retest verdict

Daniela can now identify that the opening is simulated, begin with an invented example, see the privacy boundary before typing, understand why evidence is supported or missing, and save a copy without believing it was submitted. The worst confusion - unsupported green results - was fixed before the deadline and verified on the second production deployment.

Remaining concern: a real test must use actual workers and employers, with consent, accessible language review, and independent verification that the employer honors the commitment. A synthetic persona can expose friction but cannot validate market behavior or lived experience.
