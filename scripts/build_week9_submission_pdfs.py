"""Build the three Week 9 submission PDFs from the committed Markdown sources."""

from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
FONT = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")
FONT_BOLD = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")

NAVY = colors.HexColor("#102A43")
TERRACOTTA = colors.HexColor("#C95F45")
TEAL = colors.HexColor("#3F8E84")
CREAM = colors.HexColor("#F5F0E8")
PAPER = colors.HexColor("#FFFDF8")
MUTED = colors.HexColor("#5E7180")
LINE = colors.HexColor("#D9D4C9")


def register_fonts() -> tuple[str, str]:
    regular, bold = "Helvetica", "Helvetica-Bold"
    if FONT.exists():
        pdfmetrics.registerFont(TTFont("PPRegular", str(FONT)))
        regular = "PPRegular"
    if FONT_BOLD.exists():
        pdfmetrics.registerFont(TTFont("PPBold", str(FONT_BOLD)))
        bold = "PPBold"
    return regular, bold


REGULAR, BOLD = register_fonts()


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("TitlePP", parent=base["Title"], fontName=BOLD, fontSize=25, leading=28, textColor=NAVY, alignment=TA_LEFT, spaceAfter=8),
        "deck": ParagraphStyle("DeckPP", parent=base["Normal"], fontName=REGULAR, fontSize=9.5, leading=13, textColor=MUTED, spaceAfter=14),
        "h1": ParagraphStyle("H1PP", parent=base["Heading1"], fontName=BOLD, fontSize=15, leading=18, textColor=NAVY, spaceBefore=13, spaceAfter=6),
        "h2": ParagraphStyle("H2PP", parent=base["Heading2"], fontName=BOLD, fontSize=11.5, leading=14, textColor=TEAL, spaceBefore=10, spaceAfter=5),
        "h3": ParagraphStyle("H3PP", parent=base["Heading3"], fontName=BOLD, fontSize=9.5, leading=12, textColor=TERRACOTTA, spaceBefore=8, spaceAfter=4),
        "body": ParagraphStyle("BodyPP", parent=base["BodyText"], fontName=REGULAR, fontSize=8.1, leading=11, textColor=colors.HexColor("#1B2E3B"), spaceAfter=4.5),
        "bullet": ParagraphStyle("BulletPP", parent=base["BodyText"], fontName=REGULAR, fontSize=7.9, leading=10.5, textColor=colors.HexColor("#1B2E3B"), leftIndent=12, firstLineIndent=-7, spaceAfter=2.7),
        "quote": ParagraphStyle("QuotePP", parent=base["BodyText"], fontName=REGULAR, fontSize=8.4, leading=11.5, textColor=colors.HexColor("#684338"), leftIndent=14, rightIndent=8, borderColor=TERRACOTTA, borderWidth=0, borderLeftWidth=3, borderPadding=7, backColor=colors.HexColor("#FFF4EF"), spaceAfter=7),
        "code": ParagraphStyle("CodePP", parent=base["Code"], fontName="Courier", fontSize=6.2, leading=8, textColor=NAVY, backColor=colors.HexColor("#EEF5F3"), borderPadding=7, spaceAfter=7),
        "small": ParagraphStyle("SmallPP", parent=base["BodyText"], fontName=REGULAR, fontSize=6.8, leading=8.5, textColor=MUTED, spaceAfter=3),
        "table": ParagraphStyle("TablePP", parent=base["BodyText"], fontName=REGULAR, fontSize=6.8, leading=8.2, textColor=colors.HexColor("#1B2E3B")),
        "tableHead": ParagraphStyle("TableHeadPP", parent=base["BodyText"], fontName=BOLD, fontSize=6.8, leading=8.2, textColor=colors.white),
    }


S = styles()


def clean_text(value: str) -> str:
    return value.replace("\u2014", "-").replace("\u2013", "-").replace("\u2011", "-")


def inline_md(value: str) -> str:
    value = clean_text(value.strip())
    value = html.escape(value, quote=False)
    value = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", r"\1", value)
    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<link href="\2" color="#2F6F68"><u>\1</u></link>', value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"`([^`]+)`", r'<font name="Courier">\1</font>', value)
    return value


def parse_table(lines: list[str], start: int) -> tuple[Table, int]:
    rows: list[list[str]] = []
    i = start
    while i < len(lines) and lines[i].strip().startswith("|"):
        cells = [cell.strip() for cell in lines[i].strip().strip("|").split("|")]
        if not all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells):
            rows.append(cells)
        i += 1
    width = 7.1 * inch
    cols = max(len(row) for row in rows)
    col_widths = [width / cols] * cols
    data = []
    for row_idx, row in enumerate(rows):
        style = S["tableHead"] if row_idx == 0 else S["table"]
        data.append([Paragraph(inline_md(cell), style) for cell in row])
    table = Table(data, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [PAPER, colors.HexColor("#F4F1EA")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return table, i


def markdown_story(path: Path, include_mockup: bool = False):
    lines = path.read_text(encoding="utf-8").splitlines()
    story = []
    paragraph: list[str] = []
    in_code = False
    code_lines: list[str] = []

    def flush_paragraph():
        if paragraph:
            story.append(Paragraph(inline_md(" ".join(paragraph)), S["body"]))
            paragraph.clear()

    i = 0
    while i < len(lines):
        raw = lines[i]
        line = raw.strip()
        if line.startswith("```"):
            flush_paragraph()
            if in_code:
                story.append(Preformatted(clean_text("\n".join(code_lines)), S["code"]))
                code_lines.clear()
                in_code = False
            else:
                in_code = True
            i += 1
            continue
        if in_code:
            code_lines.append(raw)
            i += 1
            continue
        if line.startswith("|") and i + 1 < len(lines) and lines[i + 1].strip().startswith("|"):
            flush_paragraph()
            table, i = parse_table(lines, i)
            story.append(table)
            story.append(Spacer(1, 7))
            continue
        if not line:
            flush_paragraph()
            i += 1
            continue
        if line.startswith("# "):
            flush_paragraph()
            if story:
                story.append(PageBreak())
            story.append(Paragraph(inline_md(line[2:]), S["title"]))
        elif line.startswith("## "):
            flush_paragraph()
            story.append(Paragraph(inline_md(line[3:]), S["h1"]))
        elif line.startswith("### "):
            flush_paragraph()
            story.append(Paragraph(inline_md(line[4:]), S["h2"]))
        elif line.startswith("#### "):
            flush_paragraph()
            story.append(Paragraph(inline_md(line[5:]), S["h3"]))
        elif line.startswith("!["):
            flush_paragraph()
            if include_mockup:
                image_path = ROOT / "docs" / "assets" / "primer-peldano-mockup.png"
                img = Image(str(image_path), width=7.0 * inch, height=3.94 * inch)
                story.append(KeepTogether([img, Paragraph("Image-generated interface direction. All people, openings, and records are invented.", S["small"])]))
        elif line.startswith("> "):
            flush_paragraph()
            story.append(Paragraph(inline_md(line[2:]), S["quote"]))
        elif re.match(r"^[-*] ", line):
            flush_paragraph()
            story.append(Paragraph("• " + inline_md(line[2:]), S["bullet"]))
        elif re.match(r"^\d+\. ", line):
            flush_paragraph()
            number, text = line.split(". ", 1)
            story.append(Paragraph(f"{number}. " + inline_md(text), S["bullet"]))
        elif re.match(r"^\*\*[^*]+:\*\*", line):
            flush_paragraph()
            story.append(Paragraph(inline_md(line), S["deck"]))
        else:
            paragraph.append(line)
        i += 1
    flush_paragraph()
    return story


def decorate_page(canvas, doc, short_title: str):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 0.24 * inch, width, 0.24 * inch, fill=1, stroke=0)
    canvas.setFillColor(TERRACOTTA)
    for idx, h in enumerate((0.07, 0.12, 0.17)):
        canvas.rect(0.58 * inch + idx * 0.085 * inch, height - 0.2 * inch, 0.055 * inch, h * inch, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.line(0.62 * inch, 0.52 * inch, width - 0.62 * inch, 0.52 * inch)
    canvas.setFont(REGULAR, 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.62 * inch, 0.34 * inch, f"PRIMER PELDAÑO / WEEK 9 / {short_title}")
    canvas.drawRightString(width - 0.62 * inch, 0.34 * inch, str(doc.page))
    canvas.restoreState()


def build(source: str, target: str, title: str, include_mockup: bool = False):
    OUT.mkdir(parents=True, exist_ok=True)
    story = markdown_story(ROOT / source, include_mockup=include_mockup)
    doc = SimpleDocTemplate(
        str(OUT / target),
        pagesize=letter,
        leftMargin=0.62 * inch,
        rightMargin=0.62 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.68 * inch,
        title=title,
        author="David Buzali",
        subject="Business Bending Week 9 - Primer Peldaño",
    )
    doc.build(story, onFirstPage=lambda c, d: decorate_page(c, d, title.upper()), onLaterPages=lambda c, d: decorate_page(c, d, title.upper()))


def main():
    build("docs/PACKET.md", "PACKET_David_Buzali.pdf", "Packet", include_mockup=True)
    build("docs/PERSONA.md", "PERSONA_David_Buzali.pdf", "Persona")
    build("docs/BUILDCHAT.md", "BUILDCHAT_David_Buzali.pdf", "Build chat")
    for name in ("PACKET_David_Buzali.pdf", "PERSONA_David_Buzali.pdf", "BUILDCHAT_David_Buzali.pdf"):
        path = OUT / name
        print(f"{path}: {path.stat().st_size} bytes")


if __name__ == "__main__":
    main()
