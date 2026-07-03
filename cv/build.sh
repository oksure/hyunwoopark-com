#!/usr/bin/env bash
# Headless CV build — reproduces the Mac pipeline (rmarkdown/pdflatex + postproc3.py logic).
# Usage: ./build.sh [FN]   where FN = Rmd basename without extension.
set -e
cd "$(dirname "$0")"
FN="${1:-CV_Hyunwoo_Park_20260129}"
echo "[1/4] render ${FN}.Rmd -> ${FN}.tex (rmarkdown -> pandoc; uses hptemplate.tex + preamble.tex + resumehp.cls)"
Rscript -e "library(rmarkdown); rmarkdown::render('${FN}.Rmd','pdf_document',encoding='UTF-8')" >/tmp/render.log 2>&1 \
  || { echo "render FAILED"; tail -30 /tmp/render.log; exit 1; }

echo "[2/4] post-process ${FN}.tex (reverse-number pubs except Working Papers/Referred Conference; bracket numbers)"
python3 - "$FN" <<'PY'
import sys
fn = sys.argv[1]
ls = open(f"{fn}.tex", encoding="utf-8").read().splitlines(keepends=True)
out = []
for i, l in enumerate(ls):
    if ("{enumerate}" in l
            and not ls[i-4].startswith("\\section{Working Paper")
            and not ls[i+3].startswith("\\section{Referred Conference")):
        l = l.replace("{enumerate}", "{etaremune}")
    if "{\\arabic{enumi}.}" in l:
        l = l.replace("{\\arabic{enumi}.}", "{[\\arabic{enumi}]}")
    out.append(l)
open(f"{fn}.tex", "w", encoding="utf-8").write("".join(out))
PY

echo "[3/4] pdflatex x2 (for \\pageref{LastPage} footer + etaremune counters)"
pdflatex -interaction=nonstopmode "${FN}.tex" >/tmp/pdflatex1.log 2>&1 || { echo "pdflatex run1 FAILED"; tail -25 /tmp/pdflatex1.log; exit 1; }
pdflatex -interaction=nonstopmode "${FN}.tex" >/tmp/pdflatex2.log 2>&1 || { echo "pdflatex run2 FAILED"; tail -25 /tmp/pdflatex2.log; exit 1; }

echo "[4/4] output -> CV_Hyunwoo_Park.pdf"
cp "${FN}.pdf" "CV_Hyunwoo_Park.pdf"
echo "  warnings (should be none/harmless):"
grep -iE "warning|missing|overfull|undefined" /tmp/pdflatex2.log | grep -ivE "font shape|\\\\T1|substituting" | head -8 || true
ls -la "CV_Hyunwoo_Park.pdf"
