const titles = {
  memo: ["메모", ""],
  home: ["", ""],
  progress: ["", ""],
  "chat-list": ["Team 챗", ""],
  "chat-detail": ["", ""],
  "chat-info": ["", ""],
  alerts: ["알림", ""],
  profile: ["내 정보", ""],
};

const modalCopy = {
  settings: ["설정", "알림, 테마, 팀플 표시 방식을 설정하는 목업 화면입니다."],
  memo: ["새 메모", "개인 메모나 공유 메모를 새로 만드는 화면으로 이어집니다."],
  memoMenu: ["메모 옵션", "공유, 복제, 즐겨찾기, 삭제 같은 메모 관리 메뉴입니다."],
  file: ["파일 상세", "업로드 파일의 버전, 용량, 공유 상태를 확인하는 화면입니다."],
  board: ["게시판", "파일, 링크, 사진, 공지 게시글을 모아보는 화면입니다."],
  chat: ["채팅방 만들기", "팀원을 초대하고 새로운 팀 채팅방을 생성합니다."],
  notice: ["공지", "팀 채팅방 상단에 고정된 공지를 확인합니다."],
  invite: ["교수 초대하기", "교수님 이메일을 입력해 프로젝트 팀룸으로 초대합니다."],
};

const memoData = {
  "최종 발표 자료 정리": {
    time: "9월 19일 10:30 ㅣ 내 메모",
    list: ["시장 분석 결과", "경쟁사 분석", "핵심 기능 정의", "디자인 시안"],
    idea: "사용자 경험을 더 직관적으로! 메인 컬러는 파스텔 블루 계열로 유지",
    file: "최종 발표 초안.pptx",
  },
  "아이디어 스케치": {
    time: "9월 18일 21:15 ㅣ 아이디어",
    list: ["팀원 진행도 시각화", "AI 분석 버튼", "교수 초대 기능", "회의록 자동 정리"],
    idea: "홈 화면에서 일정과 게시판을 동시에 보여주면 팀플 상황을 빠르게 파악할 수 있다.",
    file: "아이디어 스케치 사진.png",
  },
  "역할 분담 내용": {
    time: "9월 18일 15:45 ㅣ 공유 메모",
    list: ["팀장: 일정 관리", "발표: 발표 자료 제작", "자료조사: 시장 분석", "기획: 문제 정의"],
    idea: "역할 옆에 진행률을 붙이면 무임승차 우려를 줄이고 서로의 상황을 확인하기 쉽다.",
    file: "역할 분담표.xlsx",
  },
  "시장 조사 정리": {
    time: "9월 17일 11:20 ㅣ 한글 문서",
    list: ["팀플 피로감", "파일 만료 문제", "일정 조율 어려움", "의견 조정"],
    idea: "카카오톡과 과제를 분리하고, 팀플 자료가 만료되지 않는 구조가 핵심이다.",
    file: "시장 조사 정리.hwp",
  },
};

const folderMemos = {
  "전체 메모": ["최종 발표 자료 정리", "아이디어 스케치", "역할 분담 내용", "시장 조사 정리"],
  중요: ["최종 발표 자료 정리", "역할 분담 내용"],
  아이디어: ["아이디어 스케치", "시장 조사 정리"],
};

const documentModes = {
  "메모장(개인)": ["메모장(개인)", "개인 메모 목록으로 돌아왔습니다.", "최종 발표 자료 정리"],
  "한글 문서": ["한글 문서", "문서형 과제 초안 화면입니다.", "시장 조사 정리"],
  "공유 메모장": ["공유 메모장", "팀원과 함께 편집하는 공유 메모입니다.", "역할 분담 내용"],
  휴지통: ["휴지통", "삭제된 메모를 복구하거나 영구 삭제할 수 있습니다.", "아이디어 스케치"],
};

const boardItems = {
  전체: [
    ["▤", "최종 디자인 시안_v3.pdf", "유연아 · 9월 19일 10:30"],
    ["🔗", "경쟁사 분석 참고 링크", "허디록 · 9월 18일 15:45"],
    ["사진", "아이디어 스케치 사진", "파일 · 9월 17일 20:10"],
  ],
  파일: [
    ["▤", "최종 디자인 시안_v3.pdf", "유연아 · 9월 19일 10:30"],
    ["▤", "발표 대본 최종본.docx", "김플팀 · 9월 18일 22:10"],
  ],
  링크: [
    ["🔗", "경쟁사 분석 참고 링크", "허디록 · 9월 18일 15:45"],
    ["🔗", "Figma 프로토타입 링크", "김플팀 · 9월 18일 16:40"],
  ],
  사진: [
    ["사진", "아이디어 스케치 사진", "파일 · 9월 17일 20:10"],
    ["사진", "회의 화이트보드 사진", "유연아 · 9월 16일 18:20"],
  ],
  공지: [
    ["!", "중간 발표 준비 안내", "유연아 · 9월 16일 09:00"],
    ["!", "6/11 팀미팅 예정", "김플팀 · 9월 15일 12:10"],
  ],
};

const screens = document.querySelectorAll("[data-screen]");
const navButtons = document.querySelectorAll("[data-screen-target]");
const headerTitle = document.querySelector("[data-header-title]");
const headerSubtitle = document.querySelector("[data-header-subtitle]");
const modal = document.querySelector("#modal");
const memoCard = document.querySelector(".memo-card");
const toast = document.querySelector("[data-toast]");
let toastTimer;

function setScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.screenTarget === name);
  });

  const [title, subtitle] = titles[name] || ["잇다", ""];
  headerTitle.textContent = title;
  headerSubtitle.textContent = subtitle;
  document.querySelector("[data-header]").style.display = ["chat-detail", "chat-info"].includes(name) ? "none" : "flex";
  document.querySelector(".floating-task").style.display = name === "progress" ? "none" : "grid";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(kind) {
  const [title, copy] = modalCopy[kind] || ["상세 보기", "클릭 가능한 앱 프로토타입 화면입니다."];
  modal.querySelector("[data-modal-title]").textContent = title;
  modal.querySelector("[data-modal-copy]").textContent = copy;
  modal.showModal();
}

function openInfo(title, copy) {
  modal.querySelector("[data-modal-title]").textContent = title;
  modal.querySelector("[data-modal-copy]").textContent = copy;
  modal.showModal();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function setActiveWithin(group, activeButton) {
  group.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button === activeButton));
}

function renderPersonalEditor() {
  memoCard.innerHTML = `
    <div class="memo-head">
      <div>
        <h2>최종 발표 자료 정리 ⭐</h2>
        <p>9월 19일 10:30 ㅣ 내 메모</p>
      </div>
      <div class="memo-actions">
        <button type="button">↶</button>
        <button type="button">↷</button>
        <button type="button" data-open-modal="memoMenu">⋯</button>
      </div>
    </div>
    <div class="format-bar">
      <button type="button">본문⌄</button>
      <button type="button">16⌄</button>
      <button type="button"><b>B</b></button>
      <button type="button"><i>I</i></button>
      <button type="button"><u>U</u></button>
      <button type="button">☷</button>
      <button type="button">▧</button>
    </div>
    <section class="note-section">
      <h3><span class="badge violet">⌁</span> 목차</h3>
      <ul></ul>
    </section>
    <section class="note-section">
      <h3><span class="badge mint">☑</span> 할 일</h3>
      <label><input type="checkbox" checked /> 시장 조사 자료 정리</label>
      <label><input type="checkbox" checked /> 경쟁사 벤치마킹</label>
      <label><input type="checkbox" /> PPT 초안 작성</label>
      <label><input type="checkbox" /> 디자인 시안 확정</label>
    </section>
    <section class="note-section">
      <h3><span class="badge amber">⌕</span> 아이디어</h3>
      <p class="idea-box"></p>
    </section>
    <button class="file-card" type="button" data-open-modal="file">
      <span>P</span>
      <strong>최종 발표 초안.pptx</strong>
      <small>9.2MB ㅣ 9월 19일 10:25</small>
      <em>⋯</em>
    </button>
  `;
}

function renderHangulDocs() {
  memoCard.innerHTML = `
    <div class="doc-hero hwp">
      <span>한</span>
      <div>
        <h2>한글 문서</h2>
        <p>과제 초안과 보고서를 문서 형태로 관리해요.</p>
      </div>
      <button type="button" data-doc-action="새 한글 문서">+ 새 문서</button>
    </div>
    <div class="doc-toolbar">
      <button class="active" type="button">최근 문서</button>
      <button type="button">내가 작성</button>
      <button type="button">팀 문서</button>
    </div>
    <div class="doc-list">
      <button class="doc-item featured" type="button" data-doc-action="시장 조사 정리.hwp">
        <span class="doc-icon hwp">한</span>
        <strong>시장 조사 정리.hwp</strong>
        <small>1.8MB ㅣ 방금 수정됨 ㅣ 개인</small>
        <em>작성 중</em>
      </button>
      <button class="doc-item" type="button" data-doc-action="문제 정의 초안.hwp">
        <span class="doc-icon hwp">한</span>
        <strong>문제 정의 초안.hwp</strong>
        <small>842KB ㅣ 9월 18일 21:10 ㅣ 공유 가능</small>
        <em>초안</em>
      </button>
      <button class="doc-item" type="button" data-doc-action="발표 대본.hwp">
        <span class="doc-icon hwp">한</span>
        <strong>발표 대본.hwp</strong>
        <small>612KB ㅣ 9월 17일 13:40 ㅣ 내 문서</small>
        <em>검토</em>
      </button>
    </div>
    <section class="doc-preview">
      <h3>문서 미리보기</h3>
      <p><b>팀플 앱 잇다(ITDA)</b></p>
      <p>카카오톡에서 개인 연락과 과제가 섞이는 문제를 줄이고, 파일과 회의 내용을 한 곳에서 관리하는 복합형 팀플 플랫폼입니다.</p>
    </section>
  `;
}

function renderSharedNotes() {
  memoCard.innerHTML = `
    <div class="doc-hero shared">
      <span>♧</span>
      <div>
        <h2>공유 메모장</h2>
        <p>팀원이 함께 작성하고 수정 상태를 바로 확인해요.</p>
      </div>
      <button type="button" data-doc-action="팀원 초대">팀원 초대</button>
    </div>
    <div class="collab-strip">
      <span class="avatar mini">김</span>
      <span class="avatar mini green">유</span>
      <span class="avatar mini orange">허</span>
      <b>3명이 편집 중</b>
    </div>
    <div class="doc-list">
      <button class="doc-item featured" type="button" data-doc-action="역할 분담 내용">
        <span class="doc-icon shared">공</span>
        <strong>역할 분담 내용</strong>
        <small>김플팀, 유연아 공동 편집 ㅣ 9월 18일 15:45</small>
        <em>실시간</em>
      </button>
      <button class="doc-item" type="button" data-doc-action="회의 결정사항">
        <span class="doc-icon shared">공</span>
        <strong>회의 결정사항</strong>
        <small>댓글 4개 ㅣ 마지막 수정 12분 전</small>
        <em>댓글</em>
      </button>
      <button class="doc-item" type="button" data-doc-action="자료 조사 링크 모음">
        <span class="doc-icon shared">링</span>
        <strong>자료 조사 링크 모음</strong>
        <small>링크 8개 ㅣ 팀 전체 공유</small>
        <em>공유됨</em>
      </button>
    </div>
    <section class="shared-board">
      <h3>최근 변경</h3>
      <p><b>유연아</b>님이 “발표 자료 제작” 체크를 완료했어요.</p>
      <p><b>허디록</b>님이 기획안 문장을 수정했어요.</p>
    </section>
  `;
}

function renderTrash() {
  memoCard.innerHTML = `
    <div class="doc-hero trash">
      <span>⌫</span>
      <div>
        <h2>휴지통</h2>
        <p>삭제된 메모는 30일 동안 보관돼요.</p>
      </div>
      <button type="button" data-doc-action="휴지통 비우기">비우기</button>
    </div>
    <div class="trash-summary">
      <strong>삭제된 항목 4개</strong>
      <small>복구하거나 영구 삭제할 수 있어요.</small>
    </div>
    <div class="doc-list">
      <button class="doc-item deleted" type="button" data-doc-action="아이디어 스케치 복구">
        <span class="doc-icon trash">⌫</span>
        <strong>아이디어 스케치</strong>
        <small>삭제됨 2일 전 ㅣ 아이디어</small>
        <em>복구</em>
      </button>
      <button class="doc-item deleted" type="button" data-doc-action="구버전 발표 대본 복구">
        <span class="doc-icon trash">⌫</span>
        <strong>구버전 발표 대본</strong>
        <small>삭제됨 5일 전 ㅣ 한글 문서</small>
        <em>복구</em>
      </button>
      <button class="doc-item deleted" type="button" data-doc-action="중복 파일 삭제">
        <span class="doc-icon trash">⌫</span>
        <strong>중복 파일 메모</strong>
        <small>삭제됨 12일 전 ㅣ 개인 메모</small>
        <em>삭제</em>
      </button>
    </div>
    <section class="empty-hint">
      <h3>안내</h3>
      <p>복구 버튼을 누르면 메모장으로 다시 이동하고, 비우기를 누르면 완전히 삭제되는 흐름을 보여줍니다.</p>
    </section>
  `;
}

function updateMemo(name) {
  if (!document.querySelector(".note-section ul")) {
    renderPersonalEditor();
  }
  const memo = memoData[name] || memoData["최종 발표 자료 정리"];
  const title = document.querySelector(".memo-head h2");
  const meta = document.querySelector(".memo-head p");
  const list = document.querySelector(".note-section ul");
  const idea = document.querySelector(".idea-box");
  const fileTitle = document.querySelector(".file-card strong");
  const fileMeta = document.querySelector(".file-card small");

  title.textContent = `${name} ⭐`;
  meta.textContent = memo.time;
  list.innerHTML = memo.list.map((item) => `<li>${item}</li>`).join("");
  idea.textContent = memo.idea;
  fileTitle.textContent = memo.file;
  fileMeta.textContent = memo.file.endsWith(".hwp") ? "1.8MB ㅣ 방금 수정됨" : "9.2MB ㅣ 9월 19일 10:25";
}

function renderRecentList(names) {
  const container = document.querySelector(".recent-list");
  const heading = container.querySelector("strong");
  container.innerHTML = "";
  container.appendChild(heading);

  names.forEach((name, index) => {
    const memo = memoData[name];
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === 0 ? "active" : "";
    button.innerHTML = `${name}<small>${memo.time.split("ㅣ")[0].trim()}</small>`;
    button.addEventListener("click", () => {
      setActiveWithin(container, button);
      updateMemo(name);
    });
    container.appendChild(button);
  });

  updateMemo(names[0]);
}

function renderBoard(kind) {
  const items = boardItems[kind] || boardItems.전체;
  const board = document.querySelector(".board-card");
  board.querySelectorAll(".board-item").forEach((item) => item.remove());

  items.forEach(([icon, title, meta]) => {
    const button = document.createElement("button");
    button.className = "board-item";
    button.type = "button";
    button.innerHTML = `<span class="badge blue">${icon}</span><strong>${title}</strong><small>${meta}</small><em>⋯</em>`;
    button.addEventListener("click", () => openModal(title.includes("링크") ? "board" : "file"));
    board.appendChild(button);
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => setScreen(button.dataset.screenTarget));
});

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.closest(".memo-card")) return;
    event.stopPropagation();
    openModal(button.dataset.openModal);
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => modal.close());
});

document.querySelectorAll(".pill-row .pill").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveWithin(button.closest(".pill-row"), button);
    const label = button.textContent.trim();
    if (label === "메모장(개인)") {
      renderPersonalEditor();
      updateMemo("최종 발표 자료 정리");
    }
    if (label === "한글 문서") renderHangulDocs();
    if (label === "공유 메모장") renderSharedNotes();
    if (label === "휴지통") renderTrash();
  });
});

document.querySelectorAll(".folder-list .folder").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveWithin(button.closest(".folder-list"), button);
    const label = button.textContent.replace(/\d+/g, "").trim();
    renderRecentList(folderMemos[label] || folderMemos["전체 메모"]);
  });
});

document.querySelectorAll(".recent-list button").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveWithin(button.closest(".recent-list"), button);
    updateMemo(button.childNodes[0].textContent.trim());
  });
});

document.querySelectorAll(".board-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveWithin(button.closest(".board-tabs"), button);
    renderBoard(button.textContent.trim());
  });
});

document.querySelectorAll(".chat-filters button").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveWithin(button.closest(".chat-filters"), button);
    const unreadOnly = button.textContent.includes("읽지않음");
    document.querySelectorAll(".chat-room-list button").forEach((room, index) => {
      room.hidden = unreadOnly && index !== 3;
    });
  });
});

document.querySelectorAll(".tab-line button").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveWithin(button.closest(".tab-line"), button);
    const label = button.textContent.trim();
    const importantOnly = label.includes("중요");
    const unreadOnly = label.includes("안 읽은");
    const summaryTitle = document.querySelector("[data-alert-summary-title]");
    const summaryCopy = document.querySelector("[data-alert-summary-copy]");
    const emptyAlert = document.querySelector(".empty-alert");
    let visibleCount = 0;

    if (label === "전체") {
      summaryTitle.textContent = "전체 알림";
      summaryCopy.textContent = "팀플 활동을 시간순으로 모아봤어요.";
    } else if (unreadOnly) {
      summaryTitle.textContent = "안 읽은 알림";
      summaryCopy.textContent = "아직 확인하지 않은 새 알림만 보여드려요.";
    } else {
      summaryTitle.textContent = "중요 알림";
      summaryCopy.textContent = "회의, 투표, 긴급 채팅처럼 놓치면 안 되는 알림이에요.";
    }

    document.querySelectorAll(".notice-list button").forEach((notice, index) => {
      const type = notice.dataset.alertType || "";
      const shouldHide = (importantOnly && !type.includes("important")) || (unreadOnly && !type.includes("unread"));
      notice.hidden = shouldHide;
      if (!shouldHide) visibleCount += 1;
    });
    emptyAlert.hidden = visibleCount > 0;
  });
});

document.querySelectorAll(".settings-list button").forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.textContent.replace("›", "").trim();
    modal.querySelector("[data-modal-title]").textContent = title;
    modal.querySelector("[data-modal-copy]").textContent = `${title} 화면으로 이동하는 목업입니다. 발표 중 클릭 동작을 보여주기 위한 상세 팝업입니다.`;
    modal.showModal();
  });
});

document.querySelectorAll(".service-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.querySelector("strong")?.textContent || "서비스";
    modal.querySelector("[data-modal-title]").textContent = `${service} 바로가기`;
    modal.querySelector("[data-modal-copy]").textContent = `${service} 외부 서비스로 이동하는 앱 바로가기 목업입니다.`;
    modal.showModal();
  });
});

document.querySelectorAll(".quick-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    const label = button.querySelector("strong")?.textContent;
    if (label === "회의록") setScreen("memo");
    if (label === "화상회의") openModal("notice");
  });
});

document.addEventListener("click", (event) => {
  const formatButton = event.target.closest(".format-bar button");
  if (formatButton) {
    formatButton.classList.toggle("active");
    showToast(`${formatButton.textContent.trim()} 서식이 적용됐어요`);
    return;
  }

  const docToolbarButton = event.target.closest(".doc-toolbar button");
  if (docToolbarButton) {
    setActiveWithin(docToolbarButton.closest(".doc-toolbar"), docToolbarButton);
    showToast(`${docToolbarButton.textContent.trim()}만 모아볼게요`);
    return;
  }

  const memoAction = event.target.closest(".memo-actions button");
  if (memoAction && !memoAction.dataset.openModal) {
    showToast(memoAction.textContent.includes("↶") ? "이전 상태로 되돌렸어요" : "다시 실행했어요");
    return;
  }

  const calendarDay = event.target.closest(".calendar b");
  if (calendarDay) {
    document.querySelectorAll(".calendar b").forEach((day) => day.classList.remove("selected"));
    calendarDay.classList.add("selected");
    showToast(`${calendarDay.textContent}일 일정이 선택됐어요`);
    return;
  }

  const agendaItem = event.target.closest(".agenda p");
  if (agendaItem) {
    openInfo("일정 상세", `${agendaItem.textContent.trim()} 일정 상세 화면입니다.`);
    return;
  }

  const chatSearch = event.target.closest(".chat-title button:first-of-type, .info-header button:nth-of-type(2)");
  if (chatSearch) {
    openInfo("검색", "채팅방, 메시지, 팀원을 검색하는 화면입니다.");
    return;
  }

  const chatAdd = event.target.closest(".chat-filters button:last-child, .chat-input button:first-child");
  if (chatAdd) {
    openInfo("추가 메뉴", "사진, 파일, 링크, 투표를 첨부할 수 있는 메뉴입니다.");
    return;
  }

  const chatInfoMore = event.target.closest(".info-header button:nth-of-type(3)");
  if (chatInfoMore) {
    openInfo("채팅방 메뉴", "공지, 파일, 링크, 알림 끄기, 채팅방 나가기 메뉴입니다.");
    return;
  }

  const plainRoom = event.target.closest(".chat-room-list button:not([data-screen-target])");
  if (plainRoom) {
    setScreen("chat-detail");
    return;
  }

  const member = event.target.closest(".member-list button");
  if (member) {
    const name = member.querySelector("strong")?.textContent || "팀원";
    openInfo(name, `${name}의 역할, 학번, 담당 업무를 확인하는 프로필 화면입니다.`);
    return;
  }

  const notice = event.target.closest(".notice-list button");
  if (notice) {
    notice.querySelector("i")?.remove();
    notice.dataset.alertType = (notice.dataset.alertType || "").replace("unread", "read").trim();
    const title = notice.querySelector("strong")?.textContent || "알림";
    const copy = notice.querySelector("small")?.textContent || "알림 상세입니다.";
    openInfo(title, copy);
    return;
  }

  const profileArrow = event.target.closest(".profile-main-row button");
  if (profileArrow) {
    openInfo("프로필 상세", "프로필 사진, 이름, 이메일, 학과 정보를 수정하는 화면입니다.");
    return;
  }

  const teamMore = event.target.closest(".my-team .card-title button");
  if (teamMore) {
    openInfo("내 팀 전체 보기", "참여 중인 모든 팀플 목록을 확인하는 화면입니다.");
    return;
  }

  const logout = event.target.closest(".logout");
  if (logout) {
    openInfo("로그아웃", "현재 계정에서 로그아웃하는 확인 화면입니다.");
  }
});

memoCard.addEventListener("click", (event) => {
  const modalButton = event.target.closest("[data-open-modal]");
  if (modalButton) {
    openModal(modalButton.dataset.openModal);
    return;
  }

  const actionButton = event.target.closest("[data-doc-action]");
  if (!actionButton) return;

  const action = actionButton.dataset.docAction;
  openInfo(action, `${action} 화면으로 이어지는 앱 스타일 목업입니다. 발표 중에는 이 버튼을 눌러 문서 열기, 공유, 복구 같은 흐름을 보여줄 수 있어요.`);
});

document.querySelector(".chat-input")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  const value = input.value.trim();
  if (!value) return;

  const message = document.createElement("p");
  message.className = "message mine";
  message.textContent = value;
  document.querySelector(".messages").appendChild(message);
  input.value = "";
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.open) modal.close();
});

renderBoard("전체");
