/* ======================================================
モーダル拡大表示
====================================================== */

/* モーダル要素を取得 */
const modal = document.getElementById("modal")        // モーダル全体
const modalImg = document.getElementById("modalImg")  // モーダル内の画像
const modalInfo = document.getElementById("modalInfo")// モーダル下部の情報テキスト

/* 各画像にクリックイベントを設定
   .imgbox 内の画像だけを対象にする（モーダル内の画像を除外するため） */
document.querySelectorAll(".imgbox img").forEach(img=>{

  img.onclick = ()=>{

    /* モーダルを表示 */
    modal.style.display="flex"

    /* モーダルにクリックされた画像を表示 */
    modalImg.src = img.src

    /* 画像上に表示されているラベルを取得
       例: input / gt / model1 / norm_model3 など */
    const label = img.parentElement.querySelector(".label").innerText

    /* ファイル名だけ取得
       例: input/001.png → 001.png */
    const filename = img.src.split("/").pop()

    /* モーダル下部に表示 */
    modalInfo.textContent = label + " / " + filename

  }

})


/* モーダル背景クリックで閉じる */
modal.onclick = ()=>{

  modal.style.display="none"

}


/* ESCキーでモーダルを閉じる */
document.addEventListener("keydown",e=>{

  if(e.key==="Escape"){

    modal.style.display="none"

  }

})


/* ======================================================
ケースナビゲーション
====================================================== */

/* 各テストケース（section.case）を取得 */
const sections = Array.from(document.querySelectorAll(".case"))

/* 現在表示中のケース番号 */
let currentIndex = 0


/* スクロール位置から現在のケースを推定する */
function updateCurrent(){

  const y = window.scrollY

  sections.forEach((s,i)=>{

    /* セクション上端より少し手前に来たら現在ケースにする */
    if(s.offsetTop-200 <= y){

      currentIndex = i

    }

  })

}

/* スクロール時に現在ケースを更新 */
window.addEventListener("scroll",updateCurrent)


/* ======================================================
キーボードでケース移動
====================================================== */

document.addEventListener("keydown",e=>{

  /* モーダル表示中はナビゲーションを無効化 */
  if(modal.style.display === "flex") return

  /* nキー → 次のケース */
  if(e.key==="n"){

    currentIndex = Math.min(currentIndex+1,sections.length-1)

    sections[currentIndex].scrollIntoView({behavior:"smooth"})

  }

  /* pキー → 前のケース */
  if(e.key==="p"){

    currentIndex = Math.max(currentIndex-1,0)

    sections[currentIndex].scrollIntoView({behavior:"smooth"})

  }

})


/* ======================================================
フルスクリーン（現在未使用）
====================================================== 

document.addEventListener("keydown",e=>{

  if(e.key==="f"){

    if(!document.fullscreenElement){

      document.documentElement.requestFullscreen()

    }else{

      document.exitFullscreen()

    }

  }

})
*/


/* ======================================================
モデル列ON/OFF（現在未使用）
====================================================== 

document.querySelectorAll(".controls input").forEach(cb=>{

  cb.onchange = ()=>{

    const col = parseInt(cb.dataset.col)

    document.querySelectorAll(".row5").forEach(row=>{

      const el = row.children[col]

      if(el){

        el.style.display = cb.checked ? "" : "none"

      }

    })

  }

})
*/


/* ======================================================
目次ハイライト
====================================================== */

/* 目次リンクを取得 */
const links = document.querySelectorAll(".toc a")

/* セクションID → リンク要素 の対応表 */
const map = {}

/* aタグのhref (#001など) からIDを取り出してマッピング */
links.forEach(a=>{

  map[a.getAttribute("href").substring(1)] = a

})


/* セクションが画面中央付近に入ったら
   目次の該当リンクをハイライト */
const observer = new IntersectionObserver(entries=>{

  entries.forEach(e=>{

    if(e.isIntersecting){

      /* すべてのハイライトを解除 */
      links.forEach(a=>a.classList.remove("active"))

      /* 該当リンクだけハイライト */
      map[e.target.id].classList.add("active")

    }

  })

},{
  rootMargin:"-40% 0px -55% 0px"
})

/* すべてのケースセクションを監視対象にする */
sections.forEach(s=>observer.observe(s))