from pathlib import Path
from jinja2 import Template

input_dir = Path("input")

cases = []

for img in sorted(input_dir.glob("*")):

    name = img.stem

    case = {
        "name": name,
        "input": f"input/{img.name}",
        "gt": f"gt/{img.name}",
        "models": [],
        "norms": []
    }

    for i in range(1,6):
        case["models"].append(f"model{i}/{img.name}")
        case["norms"].append(f"norm_model{i}/{img.name}")

    cases.append(case)


template = Template(Path("template.html").read_text(encoding="utf-8"))

html = template.render(cases=cases)

Path("catalog.html").write_text(html, encoding="utf-8")
