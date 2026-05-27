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

navButtons.forEach((button) => {
  button.addEventListener("click", () => setScreen(button.dataset.screenTarget));
});

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.openModal));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => modal.close());
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
