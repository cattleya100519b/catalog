## ディレクトリ構造
```
project/
  build_catalog.py
  template.html
  input/
      img01.png
      img02.png
  gt/
      img01.png
      img02.png
  model1/
  model2/
  model3/
  model4/
  norm_model1/
  norm_model2/
  norm_model3/
  norm_model4/
```
## 仕様
- [x] Python（Jinja2）で catalog.html を生成する
- [x] サーバ不要の静的HTMLビューア
- [x] オフライン環境で閲覧可能
- [x] input ディレクトリの画像を基準にケースを作成
- [x] 画像ファイル名で input / gt / model / norm を対応付け
- [x] テスト画像ごとに1セクションを生成
- [x] 1セクションに input と GT を表示
- [x] 1セクションにモデル推論画像（横並び）を表示
- [x] 1セクションに正規化画像（横並び）を表示
- [x] 左側にテスト画像一覧の目次を表示
- [x] 目次はスクロールしても画面に固定
- [x] 目次リンクをクリックすると該当ケースへジャンプ
- [x] スクロール位置に応じて目次の現在項目をハイライト
- [x] メイン表示は2カラムグリッドレイアウト
- [x] input / GT は2列グリッド表示
- [x] モデル画像は5列グリッド表示
- [x] 画像は loading="lazy" で遅延読み込み
- [x] 画像クリックでモーダル表示（拡大）
- [x] モーダル背景クリックで閉じる
- [x] ESC キーでモーダルを閉じる
- [x] モーダル画像は縦横比を維持して表示
- [ ] モデル画像をホバーすると拡大表示
- [ ] モデル列の表示ON/OFFチェックボックス
- [ ] チェックボックスでモデル列を非表示にできる
- [ ] ← → キーで前後のケースにスクロール
  - [x] n(ext), p(rev) に変えて
- [ ] f キーでブラウザフルスクリーン切り替え
- [x] CSSを style.css に分離
- [x] JavaScriptを script.js に分離
- [x] HTMLテンプレートを template.html に分離
- [x] Pythonスクリプト build_catalog.py でHTML生成
- [x] README.md に使用方法と仕様を記載

追加
- [x] 各画像に一番上のディレクトリ名（input, gt, model1, norm_model1, etc.）を併記して、モーダルの中にも（こちらは画像名とともに）


## 概要

このツールは、複数の画像生成モデルの出力を比較するための
静的HTMLビューアを生成するツールです。

Pythonスクリプトで catalog.html を生成し、ブラウザで開くだけで
各テストケースの input / GT / model出力 / 正規化画像 を一覧比較できます。

サーバは不要で、完全にオフラインで閲覧可能です。


## ディレクトリ構成

### 以下のディレクトリ構造を前提とします。

input/
gt/
model1/
model2/
model3/
model4/
model5/
norm_model1/
norm_model2/
norm_model3/
norm_model4/
norm_model5/

### 各ディレクトリには同一ファイル名の画像を配置します。

例

001.png
002.png
003.png

### input ディレクトリの画像を基準としてテストケースが生成されます。


## HTMLビューア仕様

### レイアウト

左側：テストケース目次  
右側：画像比較ビュー

### 各テストケースには以下が表示されます

input  
ground truth (GT)  
モデル出力（5列）  
正規化画像（5列）

画像はすべてグリッド表示されます。


### 画像表示

各画像の左上にディレクトリ名ラベルを表示

例

input  
model3  
norm_model2

### 画像クリックでモーダル拡大表示

モーダルには以下が表示されます

ディレクトリ名 / ファイル名

例

model3 / 001.png


### キーボード操作

n  次のテストケースへ移動  
p  前のテストケースへ移動  
ESC  モーダルを閉じる


### 目次

左側にテストケースの目次を表示  
スクロールしても固定表示  
クリックで該当ケースへジャンプ  
現在表示中のケースを自動ハイライト


### パフォーマンス

画像は loading="lazy" により遅延読み込みされます  
IntersectionObserver によりスクロール監視を効率化しています


## HTML生成

### HTMLは以下のスクリプトで生成されます

build_catalog.py

### テンプレートエンジン Jinja2 を使用しています

python build_catalog.py

### 実行後に以下が生成されます

catalog.html

### ブラウザで開くだけで閲覧できます


## 使用ファイル

build_catalog.py   HTML生成スクリプト  
template.html      HTMLテンプレート  
style.css          スタイル  
script.js          ビューア動作  
catalog.html       生成されるビューア
