#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Důkazní spis TJ Krupka z.s. – Dobrá víra a zákonné jednání
"""
import fitz, os, io
from PIL import Image as PILImage
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Image as RLImage,
                                 Table, TableStyle, PageBreak, HRFlowable, KeepTogether)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Fonts ────────────────────────────────────────────────────────────────
def reg(name, path):
    if os.path.exists(path):
        try: pdfmetrics.registerFont(TTFont(name, path)); return True
        except: pass
    return False

HAVE_AR = reg("AR", "/System/Library/Fonts/Supplemental/Arial.ttf")
HAVE_ARB= reg("ARB","/System/Library/Fonts/Supplemental/Arial Bold.ttf")
HAVE_ARI= reg("ARI","/System/Library/Fonts/Supplemental/Arial Italic.ttf")
F  = "AR"  if HAVE_AR  else "Helvetica"
FB = "ARB" if HAVE_ARB else "Helvetica-Bold"
FI = "ARI" if HAVE_ARI else "Helvetica-Oblique"

# ── Colours ───────────────────────────────────────────────────────────────
CD   = colors.HexColor("#0d1f3c")
CB   = colors.HexColor("#1565c0")
CA   = colors.HexColor("#1e88e5")
CG   = colors.HexColor("#f9a825")
CGR  = colors.HexColor("#2e7d32")
CR   = colors.HexColor("#c62828")
COR  = colors.HexColor("#e65100")
CLT  = colors.HexColor("#e8f0fe")
CBG  = colors.HexColor("#f4f6fb")
CBR  = colors.HexColor("#90caf9")
CGY  = colors.HexColor("#546e7a")
CGY2 = colors.HexColor("#eceff1")

PW, PH = A4  # 595 × 842 pt
AVAIL  = PW - 4*cm   # usable width after 2cm margins each side

# ── Styles ────────────────────────────────────────────────────────────────
ss = getSampleStyleSheet()
def S(name, **kw):
    p = ParagraphStyle(name=name, **kw)
    if name in ss: ss[name].__dict__.update(p.__dict__)
    else: ss.add(p)
    return ss[name]

S("H1",   fontName=FB, fontSize=18, textColor=CD, leading=24, spaceBefore=16, spaceAfter=8)
S("H2",   fontName=FB, fontSize=13, textColor=CB, leading=18, spaceBefore=12, spaceAfter=6)
S("BODY", fontName=F,  fontSize=10, textColor=colors.HexColor("#1a1a2a"), leading=15, spaceAfter=4)
S("CAP",  fontName=FI, fontSize=8.5,textColor=CGY, leading=12, alignment=1, spaceBefore=2, spaceAfter=8)
S("SML",  fontName=F,  fontSize=9,  textColor=CGY, leading=13)
S("BOLD", fontName=FB, fontSize=10, textColor=colors.HexColor("#1a1a2a"), leading=15)
S("RED",  fontName=FB, fontSize=10, textColor=CR,  leading=14)
S("GRN",  fontName=FB, fontSize=10, textColor=CGR, leading=14)
S("WHT",  fontName=FB, fontSize=10, textColor=colors.white, leading=14)
S("CTR",  fontName=F,  fontSize=10, textColor=CGY, leading=14, alignment=1)

# ── Page decorations ──────────────────────────────────────────────────────
_pg = [0]
def on_page(cv, doc):
    _pg[0] += 1
    n = _pg[0]
    cv.saveState()
    if n > 1:
        cv.setFillColor(CD)
        cv.rect(0, PH-20, PW, 20, fill=1, stroke=0)
        cv.setFillColor(CG)
        cv.setFont(FB, 7)
        cv.drawString(1.5*cm, PH-13, "TJ KRUPKA z.s.  ·  DŮKAZNÍ SPIS: DOBRÁ VÍRA A ZÁKONNÉ JEDNÁNÍ")
        cv.setFillColor(colors.HexColor("#90b4d8"))
        cv.setFont(F, 7)
        cv.drawRightString(PW-1.5*cm, PH-13, f"strana {n}")
        cv.setFillColor(colors.HexColor("#e0e7ef"))
        cv.rect(0, 0, PW, 14, fill=1, stroke=0)
        cv.setFillColor(CGY)
        cv.setFont(F, 6.5)
        cv.drawString(1.5*cm, 4, "Důvěrný interní dokument · TJ Krupka z.s. · IČO 763586 · Přítkovská 95/2, Proboštov · březen 2026")
        cv.drawRightString(PW-1.5*cm, 4, "NENÍ VEŘEJNOU LISTINOU")
    cv.restoreState()

# ── Helpers ───────────────────────────────────────────────────────────────
def render_pdf_page(path, page=0, dpi=130):
    """Render PDF page → PNG bytes. Returns None on failure."""
    try:
        doc = fitz.open(path)
        pg  = doc[min(page, doc.page_count-1)]
        mat = fitz.Matrix(dpi/72, dpi/72)
        pix = pg.get_pixmap(matrix=mat, alpha=False)
        return pix.tobytes("png"), doc.page_count
    except Exception as e:
        print(f"  WARN: {path}: {e}")
        return None, 0

def img_elem(png_bytes, max_h=15*cm):
    """PNG bytes → RLImage scaled to fit available width."""
    if png_bytes is None:
        return None
    pil = PILImage.open(io.BytesIO(png_bytes))
    w, h = pil.size
    scale = min(AVAIL / w, max_h / h, 1.0)
    return RLImage(io.BytesIO(png_bytes), width=w*scale, height=h*scale)

def doc_block(path, page=0, label="", caption="", max_h=15*cm, dpi=140):
    """Return flowables: header label + document image + caption."""
    out = []
    png, n_pages = render_pdf_page(path, page, dpi)
    # Header row
    hdr = Table([[
        Paragraph("📄", ParagraphStyle("ic",fontName=F,fontSize=11,textColor=CG)),
        Paragraph(label, ParagraphStyle("lbl",fontName=FB,fontSize=9,textColor=CG,leading=13)),
    ]], colWidths=[0.7*cm, AVAIL-0.7*cm])
    hdr.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),CD),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("TOPPADDING",(0,0),(-1,-1),5),
        ("BOTTOMPADDING",(0,0),(-1,-1),5),
        ("LEFTPADDING",(0,0),(-1,-1),8),
    ]))
    out.append(Spacer(1, 3*mm))
    out.append(hdr)
    if png:
        ri = img_elem(png, max_h)
        if ri:
            # frame + image table
            img_tbl = Table([[ri]], colWidths=[AVAIL])
            img_tbl.setStyle(TableStyle([
                ("BOX",(0,0),(-1,-1),1,CBR),
                ("BACKGROUND",(0,0),(-1,-1),colors.white),
                ("ALIGN",(0,0),(-1,-1),"CENTER"),
                ("TOPPADDING",(0,0),(-1,-1),4),
                ("BOTTOMPADDING",(0,0),(-1,-1),4),
            ]))
            out.append(img_tbl)
    else:
        out.append(Paragraph(f"[Dokument nenalezen: {os.path.basename(path)}]",
                              ParagraphStyle("err",fontName=FI,fontSize=9,textColor=CGY,
                                             alignment=1,leading=14)))
    if caption:
        out.append(Paragraph(caption, ss["CAP"]))
    out.append(Spacer(1, 2*mm))
    return out

def callout(text, bg=CLT, border=CB, icon="ℹ", text_color=CD):
    """Coloured callout box."""
    tbl = Table([[
        Paragraph(icon, ParagraphStyle("ic2",fontName=F,fontSize=14,textColor=border,alignment=1)),
        Paragraph(text, ParagraphStyle("cb",fontName=FB,fontSize=9.5,textColor=text_color,leading=14)),
    ]], colWidths=[0.9*cm, AVAIL-0.9*cm])
    tbl.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),bg),
        ("BOX",(0,0),(-1,-1),1.5,border),
        ("LINEBEFORE",(0,0),(0,-1),4,border),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("TOPPADDING",(0,0),(-1,-1),8),
        ("BOTTOMPADDING",(0,0),(-1,-1),8),
        ("LEFTPADDING",(0,0),(-1,-1),8),
    ]))
    return [Spacer(1,2*mm), tbl, Spacer(1,2*mm)]

def section_hdr(num, title, color=CD):
    num_cell = Table([[Paragraph(f"ČÁST {num}", ParagraphStyle(
        "sn",fontName=FB,fontSize=8,textColor=CG,leading=10))]],
        colWidths=[1.8*cm])
    num_cell.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#1a3a6e")),
        ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4),
        ("LEFTPADDING",(0,0),(-1,-1),6),
    ]))
    title_cell = Table([[Paragraph(title, ParagraphStyle(
        "st",fontName=FB,fontSize=14,textColor=colors.white,leading=18))]],
        colWidths=[AVAIL-1.8*cm])
    title_cell.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),color),
        ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8),
        ("LEFTPADDING",(0,0),(-1,-1),12),
    ]))
    outer = Table([[num_cell, title_cell]], colWidths=[1.8*cm, AVAIL-1.8*cm])
    outer.setStyle(TableStyle([
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0),
        ("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0),
    ]))
    line = HRFlowable(width="100%",thickness=3,color=CG,spaceAfter=10,spaceBefore=0)
    return [Spacer(1,8*mm), outer, line]

def row_evidence(date, desc, result, ok=True):
    col = CGR if ok else CR
    tbl = Table([[
        Paragraph(date, ParagraphStyle("d",fontName=FB,fontSize=9,textColor=CG,leading=13)),
        Paragraph(desc, ParagraphStyle("de",fontName=F, fontSize=9,textColor=CD,leading=13)),
        Paragraph(result, ParagraphStyle("r",fontName=FB,fontSize=9,textColor=col,leading=13)),
    ]], colWidths=[3*cm, 10*cm, 3.9*cm])
    tbl.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),CBG),
        ("BOX",(0,0),(-1,-1),0.5,CBR),
        ("LINEAFTER",(0,0),(1,-1),0.5,CBR),
        ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
        ("LEFTPADDING",(0,0),(-1,-1),6),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
    ]))
    return tbl

# ═══════════════════════════════════════════════════════════════════════════
# PATHS
# ═══════════════════════════════════════════════════════════════════════════
BASE    = "/Users/mb/Documents/KAUZA-TJK"
PRILOHY = f"{BASE}/podání/VLACH - návrh na jmenování opatrovníka/PŘÍLOHY"
CAST    = f"{BASE}/podání/ČAST"
ZAPISY  = f"{BASE}/ZÁPISY SPOLKU TJK 2025"
ANALYZY = f"{BASE}/analýzy/KAUZATJKRUPKA CLAUDE"
PODANI  = f"{BASE}/podání/VLACH - návrh na jmenování opatrovníka/HOTOVO"

# ═══════════════════════════════════════════════════════════════════════════
# BUILD
# ═══════════════════════════════════════════════════════════════════════════
def build():
    out = f"{BASE}/HTML_GEN files/DUKAZ_DOBRA_VIRA_TJK.pdf"
    doc = SimpleDocTemplate(out, pagesize=A4,
        leftMargin=2*cm, rightMargin=2*cm,
        topMargin=2.2*cm, bottomMargin=1.5*cm,
        title="Důkazní spis: Dobrá víra TJ Krupka z.s.")
    E = []

    # ── COVER ──────────────────────────────────────────────────────────────
    cover_top = Table([[Paragraph(
        "TJ KRUPKA z.s. · IČO 763586",
        ParagraphStyle("ct",fontName=FB,fontSize=11,textColor=CG,alignment=1)
    )]], colWidths=[AVAIL])
    cover_top.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),CD),
        ("TOPPADDING",(0,0),(-1,-1),12),("BOTTOMPADDING",(0,0),(-1,-1),12),
    ]))

    cover_title = Table([[Paragraph(
        "DOBRÁ VÍRA<br/>A ZÁKONNÉ JEDNÁNÍ",
        ParagraphStyle("ctt",fontName=FB,fontSize=30,textColor=colors.white,
                       leading=36,alignment=1)
    )]], colWidths=[AVAIL])
    cover_title.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),CD),
        ("TOPPADDING",(0,0),(-1,-1),20),("BOTTOMPADDING",(0,0),(-1,-1),8),
    ]))

    cover_sub = Table([[Paragraph(
        "DŮKAZNÍ SPIS · TĚLOVÝCHOVNÁ JEDNOTA KRUPKA z.s.",
        ParagraphStyle("cs",fontName=F,fontSize=13,textColor=CG,alignment=1)
    )]], colWidths=[AVAIL])
    cover_sub.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),CD),
        ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),22),
    ]))

    E += [Spacer(1,3.5*cm), cover_top, cover_title, cover_sub, Spacer(1,8*mm)]
    E.append(HRFlowable(width="70%",thickness=2,color=CG,hAlign="CENTER",
                         spaceBefore=0,spaceAfter=10))

    # Cover bullets
    bullets = [
        ("✔", "Miroslav Brožek byl řádně zvolen valnou hromadou dne 24.8.2021 za přítomnosti starosty města."),
        ("✔", "TJ čekala přes 2 roky na dobrovolné splnění povinností protistrany — bez sankcí."),
        ("✔", "Každý sankční krok byl přímou reakcí na prokazatelné protiprávní jednání Vaniše, Vlacha, Pivoňky."),
        ("✔", "TJ využívala výhradně zákonné prostředky: stížnosti, formální výzvy, odvolání v zákonných lhůtách."),
        ("✔", "Protistrany podaly žaloby PO prekluzivní lhůtě, zadržovaly majetek a klamaly soudní orgány."),
    ]
    brows = [[
        Paragraph(ico, ParagraphStyle("bi",fontName=FB,fontSize=14,textColor=CG,alignment=1)),
        Paragraph(txt, ParagraphStyle("bt",fontName=F,fontSize=11,textColor=colors.white,leading=16)),
    ] for ico,txt in bullets]
    btbl = Table(brows, colWidths=[0.9*cm, AVAIL-0.9*cm])
    btbl.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#0d2550")),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8),
        ("LEFTPADDING",(0,0),(-1,-1),10),
        ("LINEBELOW",(0,0),(-1,-2),0.4,colors.HexColor("#1e3a6e")),
    ]))
    E.append(btbl)
    E.append(Spacer(1,1*cm))
    E.append(HRFlowable(width="60%",thickness=1,color=CA,hAlign="CENTER",
                         spaceBefore=0,spaceAfter=12))

    # Cover meta
    cw4 = AVAIL/4
    meta = Table([[
        Paragraph("Poškozený:<br/><b>TJ Krupka z.s.</b>",
                  ParagraphStyle("m1",fontName=F,fontSize=10,textColor=colors.HexColor("#b0c8e8"),leading=15,alignment=1)),
        Paragraph("Předseda:<br/><b>Miroslav Brožek</b><br/>od: 24.8.2021",
                  ParagraphStyle("m2",fontName=F,fontSize=10,textColor=colors.HexColor("#b0c8e8"),leading=15,alignment=1)),
        Paragraph("Protistrana:<br/><b>Vaniš · Vlach<br/>Pivoňka · Kulík</b>",
                  ParagraphStyle("m3",fontName=F,fontSize=10,textColor=colors.HexColor("#b0c8e8"),leading=15,alignment=1)),
        Paragraph("Celková škoda:<br/><b>min. 2 070 044 Kč</b>",
                  ParagraphStyle("m4",fontName=FB,fontSize=11,textColor=colors.HexColor("#ff8a65"),leading=15,alignment=1)),
    ]], colWidths=[cw4, cw4, cw4, cw4])
    meta.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),CD),
        ("TOPPADDING",(0,0),(-1,-1),12),("BOTTOMPADDING",(0,0),(-1,-1),12),
        ("LINEAFTER",(0,0),(-2,-1),0.5,colors.HexColor("#1e3a6e")),
    ]))
    E.append(meta)
    E.append(Spacer(1,1.2*cm))
    E.append(Paragraph("Dokument generován: březen 2026 · Advokát TJ: Mgr. Miroslav Kučera",
                        ss["CTR"]))
    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST I – LEGITIMITA PŘEDSEDY
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("I", "LEGITIMITA PŘEDSEDY — ŘÁDNÁ VOLBA VALNOU HROMADOU", CD)

    E.append(Paragraph(
        "Miroslav Brožek byl zvolen předsedou TJ Krupka z.s. na valné hromadě dne "
        "<b>24. srpna 2021</b> za přítomnosti starosty města Krupka Jana Kuzmy a delegátů "
        "všech oddílů. Volba proběhla v souladu se stanovami a zákonem č. 89/2012 Sb. (NOZ). "
        "Vaniš, Vlach, Kulík a Vodvářková funkce vědomě přijali — tím na sebe vzali "
        "povinnosti z nich plynoucí.", ss["BODY"]))

    E += callout(
        "KLÍČOVÝ DŮKAZ: Zápis z VH 24.8.2021 prokazuje řádnou volbu, přítomnost kvora "
        "a vědomé přijetí funkcí i povinností (předání evidencí, odvádění příspěvků) "
        "všemi zvolenými osobami.",
        bg=CLT, border=CB, icon="⚖️")

    path_vh = f"{PRILOHY}/210824 - VH - zvolení mb.pdf"
    _, vh_pages = render_pdf_page(path_vh, 0)
    for pg in range(min(vh_pages, 3)):
        E += doc_block(path_vh, pg,
            f"ZÁPIS Z VALNÉ HROMADY TJ KRUPKA — 24. 8. 2021  (strana {pg+1})",
            "Volba Miroslava Brožka předsedou · přijatá usnesení · podpisy delegátů",
            max_h=14*cm)

    # OR výpis
    E.append(Paragraph("Výpis z Obchodního rejstříku (aktuální stav 2026)", ss["H2"]))
    E.append(Paragraph(
        "Výpis z OR prokazuje, že Miroslav Brožek je ke dni vyhotovení tohoto spisu "
        "stále zapsán jako předseda TJ Krupka z.s. s datem vzniku funkce 24.8.2021. "
        "Žádné zákonné rozhodnutí, které by ho z funkce odvolalo, neexistuje.", ss["BODY"]))

    path_or = f"{PRILOHY}/vypis OR - TJK 2026.pdf"
    _, or_pages = render_pdf_page(path_or, 0)
    for pg in range(min(or_pages, 2)):
        E += doc_block(path_or, pg,
            f"VÝPIS Z OBCHODNÍHO REJSTŘÍKU — TJ KRUPKA z.s. (strana {pg+1})",
            "Předseda: Miroslav Brožek · funkce od: 24.8.2021 · IČO: 763586",
            max_h=14*cm)

    E += callout(
        "ZÁVĚR: Miroslav Brožek je řádně zvolený a v OR zapsaný předseda TJ Krupka z.s. "
        "Veškerá jeho rozhodnutí jsou právně platná. Pokus Vlache o výmaz předsedy byl "
        "podán osobou, která v té době přes 1,5 roku nebyla členem TJ — tedy bez aktivní legitimace.",
        bg=colors.HexColor("#e8f5e9"), border=CGR, icon="✔")
    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST II – OPAKOVANÉ VÝZVY BEZ ESKALACE
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("II", "OPAKOVANÉ VÝZVY BEZ ESKALACE — DOBRÁ VÍRA TJ (2021–2023)", CD)

    E.append(Paragraph(
        "Po zvolení výboru zahájil předseda Brožek řádné kroky k fungování spolku. "
        "Veškeré výzvy byly formulovány věcně a klidně, s jasnou lhůtou a odkazem "
        "na stanovy. TJ nevyužívala sankce, dokud to nebylo nezbytně nutné.", ss["BODY"]))

    # Timeline tabulka
    E.append(Spacer(1, 4*mm))
    th_style = ParagraphStyle("th",fontName=FB,fontSize=9,textColor=colors.white,alignment=1)
    tl = [
        [Paragraph("DATUM",th_style), Paragraph("KROK TJ — DOBRÁ VÍRA",th_style),
         Paragraph("REAKCE PROTISTRANY",th_style)],
        ["24. 8. 2021","Volba výboru. MB informuje o povinnostech všech oddílů.",
         Paragraph("Funkce přijaty", ParagraphStyle("ok",fontName=FB,fontSize=9,textColor=CGR,leading=13))],
        ["13. 9. 2021","1. výzva k předání evidencí členů. Lhůta: 26.9.2021.",
         Paragraph("BEZ REAKCE", ParagraphStyle("no",fontName=FB,fontSize=9,textColor=CR,leading=13))],
        ["26. 9. 2021","Lhůta uplynula. TJ čeká, NESANKCIONUJE.",
         Paragraph("Žádná evidence nepředána",ParagraphStyle("no2",fontName=F,fontSize=9,textColor=CR,leading=13))],
        ["10. 12. 2021","2. výzva — odvody příspěvků. Klidný tón.",
         Paragraph("BEZ REAKCE",ParagraphStyle("no",fontName=FB,fontSize=9,textColor=CR,leading=13))],
        ["Rok 2022","TJ neeskaluje. Čeká na dobrovolné plnění.",
         Paragraph("Dluh narůstá",ParagraphStyle("no2",fontName=F,fontSize=9,textColor=COR,leading=13))],
        ["31. 3. 2023","MB zasílá rodičům sportovců smírný apel o klid.",
         Paragraph("Vaniš šíří dezinformace",ParagraphStyle("no2",fontName=F,fontSize=9,textColor=CR,leading=13))],
        ["14. 11. 2023","Předžalobní výzvy — POSLEDNÍ smírná příležitost.",
         Paragraph("BEZ REAKCE / odmítnutí",ParagraphStyle("no",fontName=FB,fontSize=9,textColor=CR,leading=13))],
        ["28. 11. 2023","TJ přistupuje k zákonnému vyloučení (po >2 letech).",
         Paragraph("Protistrany odmítají předat majetek",ParagraphStyle("no2",fontName=F,fontSize=9,textColor=CR,leading=13))],
    ]
    cw_tl = [3*cm, 9.2*cm, 4.7*cm]
    tl_tbl = Table(tl, colWidths=cw_tl)
    tl_tbl.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,0),CD),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, CBG]),
        ("BOX",(0,0),(-1,-1),1,CBR),
        ("INNERGRID",(0,0),(-1,-1),0.3,CBR),
        ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),
        ("LEFTPADDING",(0,0),(-1,-1),7),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("FONTNAME",(0,1),(-1,-1),F),("FONTSIZE",(0,1),(-1,-1),9),
        ("FONTNAME",(0,0),(-1,0),FB),
    ]))
    E.append(tl_tbl)
    E.append(Spacer(1, 4*mm))

    E += callout(
        "TJ a předseda čekali PŘES 2 ROKY (srpen 2021 – listopad 2023) na dobrovolné "
        "splnění povinností — aniž by přistoupili k jakýmkoli sankcím. Eskalace nastala "
        "výhradně poté, co protistrany opakovaně vědomě ignorovaly zákonné výzvy.",
        bg=colors.HexColor("#fff8e1"), border=CG, icon="⏱")

    # Předžalobní výzva Vlach
    E.append(Paragraph("Předžalobní výzva Gustavu Vlachovi — 6. 11. 2023", ss["H2"]))
    E.append(Paragraph(
        "Teprve v listopadu 2023 — po více než 2 letech ignorování povinností — zaslala TJ "
        "Vlachovi formální předžalobní výzvu. Výzva je věcná, dává 30denní lhůtu "
        "a je zákonným povinným úkonem před žalobou (§ 142a OSŘ).", ss["BODY"]))

    path_vyz = f"{PRILOHY}/231106 - předžalobní výzva VLACH ODESLANÁ.pdf"
    _, vyz_pgs = render_pdf_page(path_vyz, 0)
    for pg in range(min(vyz_pgs, 3)):
        E += doc_block(path_vyz, pg,
            f"PŘEDŽALOBNÍ VÝZVA GUSTAVU VLACHOVI — 6. 11. 2023 (strana {pg+1})",
            "Zákonný postup dle § 142a OSŘ · lhůta 30 dní · požadavek vrácení pokladny a příspěvků",
            max_h=14*cm)
    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST III – VYLOUČENÍ JAKO ZÁKONNÝ KROK
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("III", "ZÁKONNÉ VYLOUČENÍ ČLENŮ — PO VYČERPÁNÍ SMÍRNÝCH MOŽNOSTÍ", CD)

    E.append(Paragraph(
        "Teprve po marném uplynutí lhůt ve všech výzvách a po více než dvou letech "
        "vědomého ignorování povinností přistoupila TJ k zákonnému vyloučení dle "
        "§ 237–240 NOZ a stanov TJ (§ 3 odst. 4 písm. c).", ss["BODY"]))

    E += callout(
        "Vyloučení NENÍ odvetou — je to zákonný nástroj ochrany spolku před členy, "
        "kteří opakovaně a vědomě poškozují jeho zájmy. TJ jej použila jako POSLEDNÍ "
        "MOŽNOST po vyčerpání všech smírných alternativ.",
        bg=CLT, border=CB, icon="⚖️")

    path_vl = f"{PRILOHY}/231215 - 15.12.2023 Gustav Vlach  - zánik členství a doručenka.pdf"
    _, vl_pgs = render_pdf_page(path_vl, 0)
    for pg in range(min(vl_pgs, 3)):
        E += doc_block(path_vl, pg,
            f"ZÁNIK ČLENSTVÍ GUSTAVA VLACHE — 15. 12. 2023 + DORUČENKA (strana {pg+1})",
            "Rozhodnutí doručeno datovou schránkou 23.12.2023 · prekluzivní lhůta do 15.3.2024",
            max_h=14*cm)

    E += callout(
        "ZÁSADNÍ SKUTEČNOST: Vlach podal žalobu 3.4.2024 — tedy 19 dní PO uplynutí zákonné "
        "prekluzivní lhůty (§ 259 NOZ). Vaniš a Pivoňka podali žalobu 39 dní po lhůtě. "
        "Tím ztratili právo soudního přezkumu ze zákona. Přesto v řízeních pokračovali — "
        "šikanózní výkon práva způsobující TJ zbytečné náklady.",
        bg=colors.HexColor("#ffebee"), border=CR, icon="⚠️")
    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST IV – FINANČNÍ DŮKAZY
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("IV", "FINANČNÍ DŮKAZY — VÝSLEDEK HOSPODAŘENÍ ODDÍLŮ 2021–2023", CD)

    E.append(Paragraph(
        "Finanční analýza prokazuje, že oddíly stolní tenis, lyžování a karate "
        "způsobily TJ Krupka kumulovanou škodu přesahující 2 miliony korun "
        "neodváděním příspěvků, neplacením energií a zadržením pokladen.", ss["BODY"]))

    hosp_png = f"{PRILOHY}/Hospodaření oddílů 2021-2023 ... 2 045 635 Kč.png"
    if os.path.exists(hosp_png):
        with open(hosp_png,"rb") as f: png_data = f.read()
        ri = img_elem(png_data, 14*cm)
        if ri:
            frm = Table([[ri]], colWidths=[AVAIL])
            frm.setStyle(TableStyle([
                ("BOX",(0,0),(-1,-1),1,CBR),("BACKGROUND",(0,0),(-1,-1),colors.white),
                ("ALIGN",(0,0),(-1,-1),"CENTER"),
                ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4),
            ]))
            E.append(Spacer(1,3*mm))
            E.append(Table([[Paragraph(
                "📄  HOSPODAŘENÍ ODDÍLŮ TJ KRUPKA 2021–2023 — ZTRÁTA 2 045 635 Kč",
                ParagraphStyle("lbl2",fontName=FB,fontSize=9,textColor=CG,leading=13)
            )]], colWidths=[AVAIL]))
            E[-1].setStyle(TableStyle([
                ("BACKGROUND",(0,0),(-1,-1),CD),
                ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
                ("LEFTPADDING",(0,0),(-1,-1),10),
            ]))
            E.append(frm)
            E.append(Paragraph("Vizualizace neuhrazených pohledávek TJ vůči oddílům", ss["CAP"]))

    # Hospodaření PDF
    path_hosp = f"{ANALYZY}/⚜ TJ ODDÍLY 2021-2023 - výsledek hospodaření.pdf"
    _, h_pgs = render_pdf_page(path_hosp, 0)
    for pg in range(min(h_pgs, 3)):
        E += doc_block(path_hosp, pg,
            f"TJ ODDÍLY 2021–2023 — VÝSLEDEK HOSPODAŘENÍ (strana {pg+1})",
            "Detailní finanční výkaz · dluhy oddílů vůči TJ · příspěvky · energie · pokladny",
            max_h=14*cm)

    # Škodní tabulka (textová)
    E.append(Paragraph("Přehled způsobené škody podle oddílů", ss["H2"]))
    cw5 = [3.4*cm, 4.2*cm, 3.1*cm, 3.1*cm, 3.1*cm]
    dmg_h = ParagraphStyle("dmh",fontName=FB,fontSize=9,textColor=colors.white,alignment=1)
    dmg = [
        [Paragraph("ODDÍL",dmg_h), Paragraph("ZODPOVĚDNÁ OSOBA",dmg_h),
         Paragraph("VÝCHOVNÉ",dmg_h), Paragraph("ENERGIE+OST.",dmg_h), Paragraph("CELKEM",dmg_h)],
        ["Stolní tenis","Ing. Marek Vaniš","518 400 Kč","91 466 Kč","609 866 Kč"],
        ["Lyžování","Gustav Vlach","379 200 Kč","668 978 Kč","1 048 178 Kč"],
        ["Karate","Martin Kulík","316 800 Kč","32 000 Kč","348 800 Kč"],
        [Paragraph("<b>CELKEM</b>",ParagraphStyle("t",fontName=FB,fontSize=10,textColor=CR)),
         "",
         Paragraph("<b>1 214 400 Kč</b>",ParagraphStyle("t2",fontName=FB,fontSize=10,textColor=CR,alignment=2)),
         Paragraph("<b>792 444 Kč</b>",ParagraphStyle("t3",fontName=FB,fontSize=10,textColor=CR,alignment=2)),
         Paragraph("<b>2 006 844 Kč</b>",ParagraphStyle("t4",fontName=FB,fontSize=11,textColor=CR,alignment=2))],
    ]
    dmg_tbl = Table(dmg, colWidths=cw5)
    dmg_tbl.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,0),CD),
        ("ROWBACKGROUNDS",(0,1),(-1,-2),[colors.white,CBG]),
        ("BACKGROUND",(0,-1),(-1,-1),colors.HexColor("#ffebee")),
        ("BOX",(0,0),(-1,-1),1,CBR),("INNERGRID",(0,0),(-1,-1),0.3,CBR),
        ("ALIGN",(2,0),(-1,-1),"RIGHT"),
        ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),
        ("LEFTPADDING",(0,0),(-1,-1),6),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("FONTNAME",(0,1),(-1,-2),F),("FONTSIZE",(0,1),(-1,-2),9),
    ]))
    E.append(dmg_tbl)
    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST V – FORMÁLNÍ STÍŽNOSTI (ČAST)
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("V", "ZÁKONNÉ PROSTŘEDKY — STÍŽNOSTI K SPORTOVNÍM ORGÁNŮM (ČAST)", CD)

    E.append(Paragraph(
        "TJ podávala stížnosti na sportovní orgány jako zákonný nástroj ochrany svých práv. "
        "Stížnosti se týkají neoprávněných přestupů hráčů, neuhrazeného výchovného "
        "a neoprávněného převodu soutěží bez souhlasu TJ.", ss["BODY"]))

    cast_list = [
        (f"{CAST}/❌ Stížnost na neuhrazení výchovného .pdf",
         "STÍŽNOST NA NEUHRAZENÍ VÝCHOVNÉHO — ČAST",
         "Podáno České asociaci stolního tenisu · zákonný prostředek ochrany výchovného"),
        (f"{CAST}/❌ Stížnost na neoprávněný převod_přechod soutěží TJ Krupka.pdf",
         "STÍŽNOST NA NEOPRÁVNĚNÝ PŘEVOD SOUTĚŽÍ — ČAST (17.9.2024)",
         "Krajský svaz STÚK · soutěže převedeny bez souhlasu TJ · zákonné právo TJ porušeno"),
        (f"{CAST}/❌ Stížnost na neplatné přestupy hráčů.pdf",
         "STÍŽNOST NA NEPLATNÉ PŘESTUPY HRÁČŮ — ČAST",
         "Přestupy provedeny bez zákonných podkladů · TJ namítá neplatnost"),
        (f"{CAST}/❌ TJ _ Poslané Oznámení ČAST, KSSTÚK, RSST Teplice.pdf",
         "OZNÁMENÍ ČAST, KSSTÚK, RSST TEPLICE — TJ KRUPKA",
         "Komplexní oznámení zaslaných všem příslušným sportovním orgánům"),
    ]
    for path, lbl, cap in cast_list:
        if os.path.exists(path):
            E += doc_block(path, 0, lbl, cap, max_h=13*cm)
        else:
            E.append(Paragraph(f"⚠ Soubor nenalezen: {os.path.basename(path)}", ss["SML"]))

    E += callout(
        "TJ podala stížnosti na 4 různé sportovní orgány. Každá stížnost je věcná, "
        "odkazuje na konkrétní pravidla a byla podána v zákonných lhůtách. "
        "Toto systematické jednání prokazuje zákonný a korektní přístup TJ.",
        bg=colors.HexColor("#e8f5e9"), border=CGR, icon="✔")
    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST VI – OBRANA V SOUDNÍCH ŘÍZENÍCH
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("VI", "OBRANA V SOUDNÍCH ŘÍZENÍCH — ZÁKONNÉ KROKY TJ", CD)

    E.append(Paragraph(
        "Ve všech soudních řízeních reagovala TJ řádně, v zákonných lhůtách a "
        "věcnými právními argumenty. Níže jsou klíčové dokumenty dokládající "
        "zákonnou obranu spolku.", ss["BODY"]))

    # Odvolání
    E.append(Paragraph("Odvolání proti neoprávněnému výmazu předsedy z OR (2025)", ss["H2"]))
    E.append(Paragraph(
        "Dne 6.8.2025 rozhodl vyšší soudní úředník (nikoli soudce — procesní pochybení) "
        "o výmazu Miroslava Brožka z OR na základě návrhu Vlache, který v té době "
        "přes 1,5 roku nebyl členem TJ. TJ podala řádné odvolání 29.8.2025.", ss["BODY"]))

    path_odv = f"{PRILOHY}/⭐️ Odvolání - výmaz předsedy spolku.pdf"
    _, odv_pgs = render_pdf_page(path_odv, 0)
    for pg in range(min(odv_pgs, 4)):
        E += doc_block(path_odv, pg,
            f"ODVOLÁNÍ TJ KRUPKA PROTI VÝMAZU PŘEDSEDY — Vrchní soud Praha (strana {pg+1})",
            "Podáno 29.8.2025 · v zákonné lhůtě · Vlach nemá aktivní legitimaci (není člen TJ)",
            max_h=14*cm)

    # Vyjádření k opatrovníkovi
    E.append(Paragraph("Vyjádření k návrhu na jmenování procesního opatrovníka", ss["H2"]))
    E.append(Paragraph(
        "Vlach (prostřednictvím JUDr. Rouska) podal 5.12.2025 návrh na opatrovníka TJ. "
        "TJ reagovala věcným vyjádřením k soudu v zákonné lhůtě.", ss["BODY"]))

    path_atr = f"{PODANI}/č. j. 61 Cm 106_2025-8 Vyjádření k návrhu na ustanovení procesního opatrovníka.pdf"
    _, atr_pgs = render_pdf_page(path_atr, 0)
    for pg in range(min(atr_pgs, 4)):
        E += doc_block(path_atr, pg,
            f"VYJÁDŘENÍ TJ K NÁVRHU NA OPATROVNÍKA — č.j. 61 Cm 106/2025-8 (strana {pg+1})",
            "Zákonná odpověď · podáno v lhůtě · argumenty proti neoprávněnému návrhu Vlache",
            max_h=14*cm)

    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST VII – SHROMÁŽDĚNÍ DELEGÁTŮ
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("VII", "DEMOKRATICKÉ ROZHODOVÁNÍ — ZÁPISY Z MIMOŘÁDNÝCH SHROMÁŽDĚNÍ", CD)

    E.append(Paragraph(
        "Všechna zásadní rozhodnutí TJ byla přijímána demokraticky na řádně svolaných "
        "shromážděních delegátů s prezenčními listinami a zápisy. TJ fungovala jako "
        "zákonný spolek i v nejtěžším období sporu.", ss["BODY"]))

    zapis_list = [
        (f"{ZAPISY}/RB ⭐️ 16.4.2025 ZÁPIS z MIMOŘÁDNÉHO SHROMÁŽDĚNÍ DELEGÁTŮ.pdf",
         "ZÁPIS Z MIMOŘÁDNÉHO SHROMÁŽDĚNÍ DELEGÁTŮ — 16. 4. 2025",
         "Svolavatel: Miroslav Brožek · projednání situace spolku · zákonný postup"),
        (f"{ZAPISY}/⭐️ ZÁPIS Z MIMOŘÁDNÉHO SHROMÁŽDĚNÍ DELEGÁTŮ  ze dne 29.6.2025.pdf",
         "ZÁPIS Z MIMOŘÁDNÉHO SHROMÁŽDĚNÍ DELEGÁTŮ — 29. 6. 2025",
         "Projednání výmazu předsedy z OR · souhlas delegátů s odvoláním k Vrchnímu soudu Praha"),
    ]
    for path, lbl, cap in zapis_list:
        if os.path.exists(path):
            _, z_pgs = render_pdf_page(path, 0)
            for pg in range(min(z_pgs, 3)):
                E += doc_block(path, pg, f"{lbl} (strana {pg+1})", cap, max_h=14*cm)
        else:
            E.append(Paragraph(f"⚠ Soubor nenalezen: {os.path.basename(path)}", ss["SML"]))
    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST VIII – CELKOVÉ VYJÁDŘENÍ TJK 2021–2024
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("VIII", "CELKOVÉ VYJÁDŘENÍ TJ KRUPKA KE KAUZE 2021–2024", CD)

    E.append(Paragraph(
        "Klíčový dokument — celkové vyjádření TJ Krupka k průběhu kauzy. "
        "Shrnuje postup spolku a zákonné kroky předsedy po celé sledované období.", ss["BODY"]))

    path_vyj = f"{ANALYZY}/⚜ VYJÁDŘENÍ TJK k 2021-2024.pdf"
    _, vyj_pgs = render_pdf_page(path_vyj, 0)
    for pg in range(min(vyj_pgs, 6)):
        E += doc_block(path_vyj, pg,
            f"VYJÁDŘENÍ TJ KRUPKA K OBDOBÍ 2021–2024 (strana {pg+1})",
            "Shrnutí celé kauzy z pohledu TJ · zákonné kroky · dobrá víra · škody",
            max_h=14*cm)
    E.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════
    # ČÁST IX – ZÁVĚRY
    # ══════════════════════════════════════════════════════════════════════
    E += section_hdr("IX", "SOUHRNNÉ ZÁVĚRY — DOBRÁ VÍRA PROKÁZÁNA", CGR)

    E.append(Paragraph(
        "Na základě výše uvedených listinných důkazů lze jednoznačně prokázat, "
        "že TJ Krupka z.s. a předseda Miroslav Brožek:", ss["BODY"]))
    E.append(Spacer(1, 4*mm))

    conclusions = [
        "Jednali v plném souladu se zákonem č. 89/2012 Sb. (NOZ), stanovami spolku "
        "a vnitřním právním řádem TJ po celou dobu sporu od roku 2021.",
        "Dali protistraně VÍCE NEŽ 2 ROKY (srpen 2021 – listopad 2023) na dobrovolné "
        "splnění povinností před přistoupením k jakýmkoli sankčním krokům.",
        "Každý sankční krok (výzva, vyloučení, trestní oznámení, žaloba) byl přímou "
        "reakcí na prokazatelné protiprávní jednání protistrany.",
        "Využívali výhradně zákonné prostředky ochrany (stížnosti, žaloby, odvolání) "
        "a reagovali v zákonných lhůtách na všechna soudní podání.",
        "Demokraticky rozhodovali ve spolkových orgánech s řádnými zápisovými protokoly.",
        "Protistrany naproti tomu porušily stanovy, zákon, podaly žaloby PO prekluzivní "
        "lhůtě, zadržovaly majetek spolku a zneužívaly soudní systém.",
    ]
    for i, txt in enumerate(conclusions, 1):
        row = Table([[
            Paragraph(f"{i}.", ParagraphStyle("cn",fontName=FB,fontSize=14,
                                               textColor=CGR,alignment=1)),
            Paragraph(txt, ParagraphStyle("ct",fontName=F,fontSize=10.5,
                                           textColor=colors.HexColor("#1a1a2a"),leading=15)),
        ]], colWidths=[0.9*cm, AVAIL-0.9*cm])
        row.setStyle(TableStyle([
            ("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#f1f8e9")),
            ("BOX",(0,0),(-1,-1),0.5,CGR),("LINEBEFORE",(0,0),(0,-1),3,CGR),
            ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
            ("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9),
            ("LEFTPADDING",(0,0),(-1,-1),8),
        ]))
        E.append(row)
        E.append(Spacer(1, 3*mm))

    E.append(Spacer(1, 5*mm))
    E += callout(
        "FINÁLNÍ ZÁVĚR: Veškeré listinné důkazy (zápisy VH, výpis OR, předžalobní výzvy, "
        "rozhodnutí o vyloučení s doručenkami, odvolání, vyjádření k soudu, zápisy "
        "ze shromáždění, finanční výkazy, stížnosti) jednoznačně prokazují, "
        "že TJ Krupka z.s. a předseda Miroslav Brožek jednali zákonně a v dobré víře. "
        "Celý spor byl vyvolán a udržován protistranou.",
        bg=colors.HexColor("#e8f5e9"), border=CGR, icon="✔")

    E.append(Spacer(1, 1.2*cm))
    E.append(HRFlowable(width="55%",thickness=2,color=CD,hAlign="CENTER",
                         spaceBefore=0,spaceAfter=10))
    E.append(Paragraph(
        "TJ Krupka z.s. · Přítkovská 95/2, Proboštov · IČO 763586<br/>"
        "Předseda: Miroslav Brožek · Advokát: Mgr. Miroslav Kučera<br/>"
        "Generováno: březen 2026",
        ParagraphStyle("fin",fontName=F,fontSize=9,textColor=CGY,leading=14,alignment=1)))

    # ── Build ──────────────────────────────────────────────────────────────
    print(f"\nGeneruji PDF → {out}")
    doc.build(E, onFirstPage=on_page, onLaterPages=on_page)
    sz = os.path.getsize(out)
    print(f"✅  Hotovo!  {sz//1024} KB  ({round(sz/1024/1024,1)} MB)")
    print(f"   Cesta: {out}")

if __name__ == "__main__":
    build()
