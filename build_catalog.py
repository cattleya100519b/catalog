from pathlib import Path
from jinja2 import Template

# ==========================================================
# 設定
# ==========================================================

# テスト入力画像ディレクトリ
input_dir = Path("input")

# 使用モデル数
NUM_MODELS = 5

# 出力HTML
OUTPUT = "index.html"

# ==========================================================
# ケース情報作成
# ==========================================================

cases = []

# inputフォルダの画像を基準にケース作成
for img in sorted(input_dir.glob("*.png")):
    name = img.stem
    case = {
        "name": name,
        "input": f"input/{img.name}",
        "gt": f"gt/{img.name}",
        "models": [],
        "norms": []
    }

    # モデル画像パス作成
    for i in range(1, NUM_MODELS+1):
        case["models"].append(
            f"model{i}/{img.name}"
        )
        case["norms"].append(
            f"norm_model{i}/{img.name}"
        )

    cases.append(case)


# ==========================================================
# HTML生成
# ==========================================================

template = Template(
    Path("template.html").read_text()
)

html = template.render(cases=cases)

Path(OUTPUT).write_text(html)

print("index.html generated")
