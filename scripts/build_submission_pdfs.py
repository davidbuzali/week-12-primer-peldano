"""Build the Week 9 Money brief and raw Brain Bending chat PDFs."""

from __future__ import annotations

import html
import json
import sqlite3
import unicodedata
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "pdf"
BRIEF_OUT = OUT_DIR / "BRIEF_David_Buzali.pdf"
CHAT_OUT = OUT_DIR / "CHAT_David_Buzali.pdf"
THREAD_DB = Path("/Users/davidbuzali/.codex/thread_history_1.sqlite")
THREAD_ID = "01a111ed-ba65-70f3-94fe-caa07568ed9c"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")
EMOJI_PATH = Path("/System/Library/Fonts/Apple Color Emoji.ttc")


def link(label: str, url: str) -> str:
    return f'<link href="{url}" color="#176a91"><u>{label}</u></link>'


def build_brief() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="W9Title",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=15.5,
            leading=18,
            textColor=colors.HexColor("#102f46"),
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="W9Deck",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10.5,
            textColor=colors.HexColor("#526675"),
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="W9Head",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=11.2,
            textColor=colors.HexColor("#102f46"),
            spaceBefore=5.5,
            spaceAfter=2.2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="W9Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.35,
            leading=10.9,
            textColor=colors.HexColor("#17232c"),
            spaceAfter=3.6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="W9Small",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=6.55,
            leading=8.15,
            textColor=colors.HexColor("#3f505c"),
            spaceAfter=1.8,
        )
    )

    def p(text: str, style: str = "W9Body") -> Paragraph:
        return Paragraph(text, styles[style])

    story = [
        p("WEEK 9 | WHEN THE FIRST RUNG DISAPPEARS", "W9Title"),
        p("David Buzali / MONEY lens / Brain Bending opening brief", "W9Deck"),
        p("1. My angle", "W9Head"),
        p(
            "The Money lens asks who writes the check, what loss appears in that payer's own records, and whether the proposed return survives full-cost accounting. I reject a generic employer buyer and any claim that a certificate creates value by itself. The first possible payer is an employer with repeated junior hiring, real openings, a budgeted assessment process, and authority to replace part of that process with paid work. The employer may screen only legal eligibility, availability, location or schedule, and genuinely essential prerequisites - not prior experience, resume prestige or unpaid work. Lottery selection among eligible applicants preserves the first-rung purpose."
        ),
        p("2. The technology, honestly", "W9Head"),
        p(
            "Today's technology can timestamp versions, bind an employer identity to an evaluation, preserve a rubric, issue a tamper-evident portable credential, and let the candidate share it selectively. It cannot prove that the candidate worked alone, that the evaluator was fair, or that the claims are true; W3C explicitly separates cryptographic verifiability from truth. [1] AI should be allowed under the employer's data rules because the project should resemble real work. The candidate submits the artifact and a short record of which tools helped, one consequential suggestion accepted or rejected, what changed, and how the result was checked. A human then runs a 10-15 minute walkthrough: two decisions, one limitation or error, and one new job-relevant change. The record reports rubric evidence and AI disclosure - never a universal employability score."
        ),
        p("3. The world's best attempt - global to local", "W9Head"),
        p(
            "<b>Parker Dewey</b> demonstrates paid micro-internships: fixed-fee projects generally last 10-40 hours, cost US$200-US$600, and send 90% of the payment to the participant. Its separate employer program fees also show that a 10% project margin alone may not fund credible delivery. [2] <b>Riipen Level UP</b> offers 60-hour, government-subsidized projects; it proves that project-based experience can be organized, but not that employers will pay when subsidy disappears. [3] <b>Forage</b> scales free employer simulations, practice and recruiting exposure; simulations are not paid employment history. [4] Mexico's much larger incumbent is <b>Jovenes Construyendo el Futuro</b>, with a MX$25.173 billion 2026 budget and a monthly stipend plus IMSS coverage. [5] Translation therefore requires a narrower claim than 'experience': paid work, lawful labor treatment, employer-signed evidence, and independently verified formal employment."
        ),
        PageBreak(),
        p("WEEK 9 | MONEY | PAID MICRO-EXPERIENCE", "W9Title"),
        p("David Buzali / Opening position for Team Bending", "W9Deck"),
        p("4. The vacuum I'd attack - micro-experience", "W9Head"),
        p(
            "I would test one standardized role family with 20 paid projects for ten verified openings. Each project costs MX$4,000: MX$3,600 to the worker and MX$400 to the platform. The employer funds the MX$80,000 project pool. A university, limited initially to final-year students and recent graduates with no formal work history, pays a MX$40,000 cohort fee: MX$30,000 when all 20 complete and receive signed portable evaluations, then MX$10,000 if at least five reach qualifying formal employment. Jobs may be with any employer, but the record must be shared before the offer, work must start within 60 days of completion, and the participant must complete 90 days at predeclared pay and hours. Verification uses IMSS affiliation or a predetermined lawful equivalent, with consent. Sponsor hires and outside hires are reported separately; no causal claim is attached to an outside hire."
        ),
        p(
            "The economics remain a hypothesis. A successful cohort yields MX$48,000 of platform revenue (MX$40,000 fee plus MX$8,000 project share). If variable delivery stays below MX$30,000, contribution is MX$18,000; a failed employment outcome still contributes MX$8,000. At an assumed 80% cohort-success rate, expected contribution is MX$16,000. Covering an illustrative MX$540,000 in annual fixed costs therefore requires about 34 cohorts and 680 paid projects before acquisition costs. The employer's full external cost is MX$80,000, while the university buys access, credible evidence and a predeclared employment outcome - not a promised 10:1 financial return. Kill or redesign the model if employers reject recurring cohorts at full price, delivery breaches the cap, universities will not verify employment, or repeated cohorts miss the 90-day threshold."
        ),
        p("5. The shadow - a rung cannot become a treadmill", "W9Head"),
        p(
            "The chapter's displaced workers risk being optimized into lower-paid tasks while others capture the productivity gain. Micro-experience can repeat that harm as disguised contingent labor or endless auditions. The design response is structural: no verified opening, no cohort; no more than two projects per opening; published criteria before the lottery; payment regardless of hiring; portable evidence for every participant; correction and appeal; no keystroke surveillance; and no opaque ranking. A sponsor that consumes work without making offers consistent with its published threshold is suspended before another cohort. If an employer cancels openings, participants already selected remain entitled to payment."
        ),
        p("6. My opening position for Team Bending", "W9Head"),
        p(
            "I would rewrite the provocation. It is right that informal work often leaves people without protection or a legible record, but informality is a present employment condition while AI exposure is neither job loss nor a layoff forecast. INEGI reported 55.1% labor informality in Q2 2026; the OECD estimated about 19% of Mexican workers exposed to generative AI under its task threshold, while the IDB's broader measure estimated 16 million exposed jobs. These totals are not comparable destruction counts. [6-8] My claim is: <b>AI becomes a labor-market threat when employers remove formal entry-level tasks without creating another paid, verifiable first rung, and the displaced opportunity reappears as lower-paid or informal work.</b> Test it by tracking formal junior hiring, hours and earnings, transitions into informality, and productivity gains at comparable workplaces before and after AI adoption. This product counts as a response only when it creates portable evidence and verified formal employment - not more auditions."
        ),
        Spacer(1, 3),
        p("Sources", "W9Head"),
        p(
            "[1] " + link("W3C Verifiable Credentials 2.0", "https://www.w3.org/TR/vc-data-model/")
            + "  [2] " + link("Parker Dewey pricing and FAQ", "https://www.parkerdewey.com/pricing")
            + "  [3] " + link("Riipen Level UP", "https://www.riipen.com/levelup/employers")
            + "  [4] " + link("Forage job simulations", "https://www.theforage.com/"),
            "W9Small",
        ),
        p(
            "[5] " + link("STPS: JCF 2026 budget and benefit", "https://www.gob.mx/stps/prensa/secretaria-del-trabajo-y-prevision-social-apoyara-a-500-mil-jovenes-construyendo-el-futuro-en-2026")
            + "  [6] " + link("INEGI: national labor indicators", "https://www.inegi.org.mx/app/areasgeograficas/")
            + "  [7] " + link("OECD: Mexico GenAI exposure", "https://www.oecd.org/en/publications/job-creation-and-local-economic-development-2024-country-notes_ad2806c1-en/mexico_0e0d74d9-en.html")
            + "  [8] " + link("IDB: AI occupational exposure", "https://www.iadb.org/en/blog/research-development/taking-pulse-employment-new-world-ai"),
            "W9Small",
        ),
    ]

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#c8d4dc"))
        canvas.line(0.62 * inch, 0.52 * inch, 7.88 * inch, 0.52 * inch)
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(colors.HexColor("#5d6d79"))
        canvas.drawString(0.62 * inch, 0.34 * inch, "BRAIN BENDING / WEEK 9 / MONEY")
        canvas.drawRightString(7.88 * inch, 0.34 * inch, f"{doc.page} / 2")
        canvas.restoreState()

    doc = SimpleDocTemplate(
        str(BRIEF_OUT),
        pagesize=letter,
        leftMargin=0.62 * inch,
        rightMargin=0.62 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.66 * inch,
        title="Week 9 Brain Bending - Money",
        author="David Buzali",
        subject="Paid micro-experience and the disappearing first rung",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def _register_chat_fonts() -> tuple[str, set[int], str | None, set[int]]:
    if FONT_PATH.exists():
        pdfmetrics.registerFont(TTFont("ChatUnicode", str(FONT_PATH)))
        main_name = "ChatUnicode"
        main_glyphs = set(pdfmetrics.getFont(main_name).face.charWidths)
    else:
        main_name = "Helvetica"
        main_glyphs = set(range(32, 256))

    emoji_name = None
    emoji_glyphs: set[int] = set()
    if EMOJI_PATH.exists():
        try:
            pdfmetrics.registerFont(TTFont("ChatEmoji", str(EMOJI_PATH), subfontIndex=0))
            emoji_name = "ChatEmoji"
            emoji_glyphs = set(pdfmetrics.getFont(emoji_name).face.charWidths)
        except Exception:
            emoji_name = None
    return main_name, main_glyphs, emoji_name, emoji_glyphs


def _safe_text(raw: str, main_glyphs: set[int], emoji_glyphs: set[int]) -> str:
    chunks: list[str] = []
    for char in raw.replace("\t", "    "):
        cp = ord(char)
        if char == "\n":
            chunks.append("\n")
            continue
        if char == "\ufe0f":
            continue
        if cp in main_glyphs:
            chunks.append(html.escape(char, quote=False))
        elif cp in emoji_glyphs or unicodedata.category(char) in {"So", "Sk"}:
            chunks.append(f"[symbol: {unicodedata.name(char, 'symbol').lower()}]")
        else:
            chunks.append(f"[U+{cp:04X}]")
    return "".join(chunks)


def _load_messages() -> list[tuple[int, int, str, str]]:
    with sqlite3.connect(f"file:{THREAD_DB}?mode=ro", uri=True) as con:
        rows = con.execute(
            """SELECT rollout_ordinal, created_at_ms, item_type, item_json
               FROM thread_items
               WHERE thread_id = ? AND item_type IN ('userMessage', 'agentMessage')
               ORDER BY rollout_ordinal""",
            (THREAD_ID,),
        ).fetchall()

    messages: list[tuple[int, int, str, str]] = []
    for ordinal, created_ms, item_type, raw in rows:
        item = json.loads(raw)
        if item_type == "userMessage":
            parts = [
                block.get("text", "")
                for block in item.get("content", [])
                if block.get("type") == "text"
            ]
            body = "\n".join(parts).strip()
            role = "DAVID"
        else:
            body = item.get("text", "").strip()
            role = "CODEX"
        if body:
            messages.append((ordinal, created_ms, role, body))
    return messages


def build_chat() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    font_name, main_glyphs, _emoji_name, emoji_glyphs = _register_chat_fonts()
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="ChatTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=15,
            leading=18,
            textColor=colors.HexColor("#102f46"),
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ChatDeck",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=colors.HexColor("#526675"),
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ChatHeaderUser",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=10,
            textColor=colors.HexColor("#694100"),
            backColor=colors.HexColor("#fff5dd"),
            borderPadding=(3, 5, 3, 5),
            spaceBefore=5,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ChatHeaderAgent",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=10,
            textColor=colors.HexColor("#0d4c66"),
            backColor=colors.HexColor("#eaf6fb"),
            borderPadding=(3, 5, 3, 5),
            spaceBefore=5,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ChatBody",
            parent=styles["BodyText"],
            fontName=font_name,
            fontSize=7.35,
            leading=9.5,
            textColor=colors.HexColor("#18242d"),
            spaceAfter=3.5,
        )
    )

    tz = ZoneInfo("America/Mexico_City")
    messages = _load_messages()
    story = [
        Paragraph("WEEK 9 | RAW BRAIN BENDING CHAT", styles["ChatTitle"]),
        Paragraph(
            "David Buzali / MONEY lens / Complete user-assistant transcript through brief preparation",
            styles["ChatDeck"],
        ),
    ]
    visible_index = 0
    for _ordinal, created_ms, role, body in messages:
        visible_index += 1
        timestamp = datetime.fromtimestamp(created_ms / 1000, tz=tz).strftime("%d %b %Y %H:%M:%S")
        header_style = styles["ChatHeaderUser"] if role == "DAVID" else styles["ChatHeaderAgent"]
        story.append(Paragraph(f"{visible_index:02d}  {role}  |  {timestamp}", header_style))
        blocks = body.split("\n\n")
        for block in blocks:
            rendered = _safe_text(block, main_glyphs, emoji_glyphs).replace("\n", "<br/>")
            story.append(Paragraph(rendered or " ", styles["ChatBody"]))

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#c8d4dc"))
        canvas.line(0.52 * inch, 0.47 * inch, 7.98 * inch, 0.47 * inch)
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(colors.HexColor("#5d6d79"))
        canvas.drawString(0.52 * inch, 0.29 * inch, "WEEK 9 / MONEY / RAW CHAT")
        canvas.drawRightString(7.98 * inch, 0.29 * inch, f"Page {doc.page}")
        canvas.restoreState()

    doc = SimpleDocTemplate(
        str(CHAT_OUT),
        pagesize=letter,
        leftMargin=0.52 * inch,
        rightMargin=0.52 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.62 * inch,
        title="Week 9 Raw Brain Bending Chat - Money",
        author="David Buzali",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_brief()
    build_chat()
    print(BRIEF_OUT)
    print(CHAT_OUT)
