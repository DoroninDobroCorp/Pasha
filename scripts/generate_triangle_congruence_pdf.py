from pathlib import Path

import markdown
from weasyprint import HTML


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "triangle_congruence_olympiad.md"
OUTPUT = ROOT / "triangle_congruence_olympiad.pdf"


CSS_STYLE = """
@page {
    size: A4;
    margin: 2cm 2cm 2.3cm 2cm;

    @bottom-center {
        content: counter(page) " / " counter(pages);
        font-family: "DejaVu Serif", serif;
        font-size: 10pt;
        color: #616161;
    }
}

body {
    font-family: "DejaVu Serif", serif;
    font-size: 11pt;
    line-height: 1.7;
    color: #1a1a1a;
}

h1 {
    color: #1a237e;
    border-bottom: 3px solid #1a237e;
    padding-bottom: 8px;
    font-size: 22pt;
}

h2 {
    color: #283593;
    border-bottom: 2px solid #7986cb;
    padding-bottom: 5px;
    margin-top: 2em;
    font-size: 16pt;
    page-break-before: always;
}

h3 {
    color: #303f9f;
    font-size: 13pt;
    margin-top: 1.5em;
}

h4 {
    color: #3949ab;
    font-size: 12pt;
}

blockquote {
    background: #e8eaf6;
    border-left: 5px solid #3f51b5;
    padding: 12px 16px;
    margin: 1em 0;
    border-radius: 4px;
}

code {
    background: #f5f5f5;
    padding: 2px 5px;
    font-family: "DejaVu Sans Mono", monospace;
    font-size: 9.5pt;
    border-radius: 3px;
}

pre {
    background: #f8f8f8;
    border: 1px solid #ddd;
    padding: 12px;
    border-radius: 5px;
    overflow-x: auto;
}

pre code {
    background: none;
    padding: 0;
}

table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
}

th,
td {
    border: 1px solid #c5cae9;
    padding: 8px 12px;
}

th {
    background: #e8eaf6;
    font-weight: bold;
}

tr:nth-child(even) {
    background: #f3f4fc;
}

p {
    margin: 0.7em 0;
}

hr {
    border: none;
    border-top: 1px solid #c5cae9;
    margin: 2em 0;
}

strong {
    color: #1a237e;
}
"""


def main() -> None:
    md_content = SOURCE.read_text(encoding="utf-8")
    html_body = markdown.markdown(md_content, extensions=["tables", "fenced_code"])

    full_html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <style>{CSS_STYLE}</style>
</head>
<body>{html_body}</body>
</html>"""

    HTML(string=full_html).write_pdf(str(OUTPUT))
    print(f"Generated: {OUTPUT}")


if __name__ == "__main__":
    main()
