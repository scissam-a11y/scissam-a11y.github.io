const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const items = document.querySelectorAll(".menu-item");

// 햄버거 버튼: 스마트폰에서 메뉴 열기/닫기
toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.classList.toggle("active", isOpen);
  toggle.setAttribute("aria-expanded", isOpen);
});

// 카테고리 클릭: 하위 메뉴 열기/닫기 (하나만 열림)
items.forEach((item) => {
  const title = item.querySelector(".menu-title");
  title.addEventListener("click", (e) => {
    e.stopPropagation();
    const willOpen = !item.classList.contains("open");
    closeAll();
    if (willOpen) {
      item.classList.add("open");
      title.setAttribute("aria-expanded", "true");
    }
  });
});

function closeAll() {
  items.forEach((item) => {
    item.classList.remove("open");
    item.querySelector(".menu-title").setAttribute("aria-expanded", "false");
  });
}

function closeMobileMenu() {
  nav.classList.remove("open");
  toggle.classList.remove("active");
  toggle.setAttribute("aria-expanded", "false");
}

// 하위 메뉴를 누르면 메뉴 닫기
document.querySelectorAll(".submenu a").forEach((link) => {
  link.addEventListener("click", () => {
    closeAll();
    closeMobileMenu();
  });
});

// 손경제 뉴스: news-data.js(update-news.ps1이 만든 파일)를 국내/해외로 나눠 보여주기
const WORLD_WORDS = [
  "美", "미국", "中", "중국", "日", "일본", "유럽", "EU", "영국", "독일", "프랑스",
  "러시아", "우크라이나", "중동", "이스라엘", "이란", "사우디", "인도", "대만", "베트남",
  "브라질", "연준", "FOMC", "트럼프", "월가", "뉴욕", "달러", "엔화", "위안", "글로벌", "해외",
  "엔비디아", "알파벳", "구글", "MS", "애플", "아마존", "메타", "테슬라", "넷플릭스", "앤트로픽", "오픈AI",
];

function esc(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function isWorld(text) {
  return WORLD_WORDS.some((w) => text.includes(w));
}

function getHeadlines(ep) {
  // 설명란의 "1) 제목" 줄을 우선 쓰고, 없으면 제목의 "|" 구분을 씀
  const lines = ep.description.split("\n")
    .map((l) => l.match(/^\d+\)\s*(.+)/))
    .filter(Boolean)
    .map((m) => m[1].trim());
  if (lines.length) return lines;
  return ep.title.replace(/^\[[^\]]+\]\s*\S+\s*/, "").split("|").map((s) => s.trim()).filter(Boolean);
}

function renderNews() {
  const data = window.NEWS_DATA;
  if (!data) return;

  const episodes = data.episodes.filter((ep) => ep.title.startsWith("[손경제]")).slice(0, 3);

  document.querySelectorAll(".news-list").forEach((box) => {
    const wantWorld = box.dataset.region === "world";
    const html = episodes.map((ep) => {
      const picked = getHeadlines(ep).filter((h) => isWorld(h) === wantWorld);
      if (!picked.length) return "";
      const day = ep.title.match(/\d+\/\d+\([^)]+\)/);
      return `
        <div class="news-day">
          <div class="news-day-head">
            <span class="news-date">${day ? day[0] : ep.date}</span>
            <a class="news-listen" href="${ep.audio}" target="_blank" rel="noopener">▶ 방송 듣기</a>
          </div>
          <ul>${picked.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        </div>`;
    }).join("");
    box.innerHTML = html || `<p class="placeholder">최근 방송에 해당 소식이 없어요.</p>`;
  });

  document.querySelector(".news-updated").innerHTML =
    `마지막 업데이트 ${data.updated} · <a href="${data.link}" target="_blank" rel="noopener">손경제 전체 방송 보기</a>`;
}

renderNews();

// 메뉴 바깥을 누르면 하위 메뉴 닫기
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) {
    closeAll();
    closeMobileMenu();
  }
});
