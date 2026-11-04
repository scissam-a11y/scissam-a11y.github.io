// ===== 메뉴 =====
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".menu-item");

toggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  toggle.classList.toggle("active", isOpen);
  toggle.setAttribute("aria-expanded", isOpen);
});

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
  menu.classList.remove("open");
  toggle.classList.remove("active");
  toggle.setAttribute("aria-expanded", "false");
}

document.querySelectorAll(".submenu a").forEach((link) => {
  link.addEventListener("click", () => {
    closeAll();
    closeMobileMenu();
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-wrap")) {
    closeAll();
    closeMobileMenu();
  }
});

// ===== 공통 =====
function esc(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

const today = new Date();
const days = ["일", "월", "화", "수", "목", "금", "토"];
document.querySelector(".issue-date").textContent =
  `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}. (${days[today.getDay()]})`;

// ===== 01 기본동사 100 =====
function renderVerbs() {
  const data = window.VERB_DATA;
  if (!data) return;

  // START 날짜부터 오늘까지 지난 날 수 = 오늘의 Day (준비된 동사보다 많으면 마지막 동사)
  const start = new Date(data.start + "T00:00:00");
  const passed = Math.floor((today - start) / 86400000);
  const index = Math.max(0, Math.min(passed, data.verbs.length - 1));
  const v = data.verbs[index];

  document.getElementById("cover-title").textContent = v.headline;
  document.getElementById("cover-sub").textContent = `Day ${index + 1} · ${v.verb} = ${v.core}`;
  document.getElementById("verb-day").textContent = `DAY ${String(index + 1).padStart(3, "0")}`;
  document.getElementById("verb-word").textContent = v.verb;
  document.getElementById("verb-core").textContent = v.core;
  document.getElementById("verb-examples").innerHTML = v.examples
    .map((ex) => `<li><span class="ex-en">${esc(ex.en)}</span><span class="ex-ko">${esc(ex.ko)}</span></li>`)
    .join("");
  document.getElementById("verb-tip").innerHTML = `<strong>기억 팁</strong> ${esc(v.tip)}`;

  const past = data.verbs.slice(0, index).reverse().slice(0, 4);
  document.getElementById("past-verbs").innerHTML = past.length
    ? past.map((p) => `<li><span class="pv-word">${esc(p.verb)}</span><span class="pv-core">${esc(p.core)}</span></li>`).join("")
    : `<li class="empty">오늘이 첫날이에요. 내일부터 지난 동사가 여기에 쌓여요.</li>`;

  const list = [];
  for (let i = 0; i < 100; i++) {
    const item = data.verbs[i];
    const cls = i === index ? "now" : i < index ? "done" : "";
    list.push(`<li class="${cls}"><span>${i + 1}</span>${item ? esc(item.verb) : "·"}</li>`);
  }
  document.getElementById("verb-list-items").innerHTML = list.join("");
}

// ===== 02 손경제 쉽게 읽기 =====
function renderEconomy() {
  const data = window.ECON_DATA;
  if (!data) return;

  document.getElementById("eco-episode").innerHTML =
    `<span>${esc(data.date)} 방송</span><a class="listen" href="${data.audio}" target="_blank" rel="noopener">▶ 방송 듣기</a>`;

  document.getElementById("eco-keywords").innerHTML = data.keywords.map((k, i) => `
    <div class="keyword">
      <p class="keyword-label">KEYWORD ${i + 1}</p>
      <h3>${esc(k.keyword)}</h3>
      <p class="keyword-headline">${esc(k.headline)}</p>
      <p><strong>쉽게 말하면</strong> ${esc(k.easy)}</p>
      <p><strong>왜 중요할까?</strong> ${esc(k.why)}</p>
    </div>`).join("");

  document.getElementById("eco-term-list").innerHTML = data.terms
    .map((t) => `<dt>${esc(t.word)}</dt><dd>${esc(t.easy)}</dd>`)
    .join("");
}

function renderPastEpisodes() {
  const data = window.NEWS_DATA;
  const box = document.getElementById("past-episodes");
  if (!data) {
    box.innerHTML = `<li class="empty">방송 목록을 불러오지 못했어요.</li>`;
    return;
  }
  const current = window.ECON_DATA ? window.ECON_DATA.episode : "";
  const eps = data.episodes.filter((ep) => ep.title.startsWith("[손경제]") && ep.title !== current).slice(0, 4);
  box.innerHTML = eps.map((ep) => {
    const m = ep.title.match(/^\[손경제\]\s*(\S+)\s*(.*)$/);
    return `<li><span class="pe-date">${esc(m ? m[1] : ep.date)}</span><span class="pe-title">${esc(m ? m[2] : ep.title)}</span><a href="${ep.audio}" target="_blank" rel="noopener">듣기</a></li>`;
  }).join("");
}

// ===== 03 GeekNews =====
const AI_WORDS = [
  "AI", "LLM", "GPT", "Claude", "Gemini", "OpenAI", "Anthropic", "에이전트", "Agent",
  "인공지능", "머신러닝", "딥러닝", "모델", "프롬프트", "챗봇", "Copilot", "MCP", "RAG",
];

function isAI(title) {
  // "AI"는 단어 경계로만 찾아서 "MAIL" 같은 글자를 잘못 고르지 않게 해요
  return AI_WORDS.some((w) => (w === "AI" ? /(^|[^A-Za-z])AI([^A-Za-z]|$)/.test(title) : title.includes(w)));
}

function gnDate(date) {
  const [d, t] = date.split(" ");
  const [, m, day] = d.split("-");
  return `${Number(m)}/${Number(day)} ${t}`;
}

function renderGeekNews() {
  const data = window.GEEKNEWS_DATA;
  if (!data || !data.posts.length) {
    document.getElementById("gn-feature").innerHTML = `<p class="empty">GeekNews 소식을 불러오지 못했어요.</p>`;
    return;
  }

  const [top, ...rest] = data.posts;
  document.getElementById("gn-feature").innerHTML = `
    <p class="keyword-label">LATEST · ${esc(gnDate(top.date))}</p>
    <h3><a href="${esc(top.link)}" target="_blank" rel="noopener">${esc(top.title)}</a></h3>
    <p>${esc(top.summary)}</p>`;

  document.getElementById("gn-list").innerHTML = rest.slice(0, 8).map((p) => `
    <li>
      <a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>
      <span class="gn-date">${esc(gnDate(p.date))}</span>
    </li>`).join("");

  const ai = data.posts.filter((p) => isAI(p.title)).slice(0, 6);
  document.getElementById("gn-ai-list").innerHTML = ai.length
    ? ai.map((p) => `<li><a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a></li>`).join("")
    : `<li class="empty">오늘 올라온 글 중에는 AI 관련 소식이 없어요.</li>`;

  document.getElementById("gn-updated").textContent = `마지막 업데이트 ${data.updated}`;
}

renderVerbs();
renderEconomy();
renderPastEpisodes();
renderGeekNews();
