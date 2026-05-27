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
    ["▤", "발표 대본 최종본.docx", "김쫀틸 · 9월 18일 22:10"],
  ],
  링크: [
    ["🔗", "경쟁사 분석 참고 링크", "허디록 · 9월 18일 15:45"],
    ["🔗", "Figma 프로토타입 링크", "김쫀틸 · 9월 18일 16:40"],
  ],
  사진: [
    ["사진", "아이디어 스케치 사진", "파일 · 9월 17일 20:10"],
    ["사진", "회의 화이트보드 사진", "유연아 · 9월 16일 18:20"],
  ],
  공지: [
    ["!", "중간 발표 준비 안내", "유연아 · 9월 16일 09:00"],
    ["!", "6/11 팀미팅 예정", "김쫀틸 · 9월 15일 12:10"],
  ],
};

const screens = document.querySelectorAll("[data-screen]");
const navButtons = document.querySelectorAll("[data-screen-target]");
const headerTitle = document.querySelector("[data-header-title]");
const headerSubtitle = document.querySelector("[data-header-subtitle]");
const modal = document.querySelector("#modal");

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

function setActiveWithin(group, activeButton) {
  group.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button === activeButton));
}

function updateMemo(name) {
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
  button.addEventListener("click", () => openModal(button.dataset.openModal));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => modal.close());
});

document.querySelectorAll(".pill-row .pill").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveWithin(button.closest(".pill-row"), button);
    const label = button.textContent.trim();
    const [title, copy, memoName] = documentModes[label] || documentModes["메모장(개인)"];
    updateMemo(memoName);
    openModal("memo");
    modal.querySelector("[data-modal-title]").textContent = title;
    modal.querySelector("[data-modal-copy]").textContent = copy;
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
    const importantOnly = button.textContent.includes("중요");
    const unreadOnly = button.textContent.includes("안 읽은");
    document.querySelectorAll(".notice-list button").forEach((notice, index) => {
      notice.hidden = (importantOnly && index > 2) || (unreadOnly && index % 2 === 1);
    });
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
