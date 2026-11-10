const container = document.getElementById("qa");
const tabBar = document.getElementById("tabs");

// Build tab buttons
tabs.forEach((tab, index) => {
  const button = document.createElement("button");
  button.className = "tab";
  button.setAttribute("role", "tab");
  button.textContent = tab.name;
  button.addEventListener("click", () => showTab(index));
  tabBar.appendChild(button);
});

// Render the sections and accordion items of one tab
function showTab(index) {
  const tab = tabs[index];

  tabBar.querySelectorAll(".tab").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
    btn.setAttribute("aria-selected", i === index);
  });
  history.replaceState(null, "", "#" + tab.name.toLowerCase());

  container.innerHTML = "";

  tab.sections.forEach((section) => {
    const title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = section.section;
    container.appendChild(title);

    section.items.forEach((item, i) => {
      const wrapper = document.createElement("div");
      wrapper.className = "item";

      const button = document.createElement("button");
      button.className = "question";
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = `
        <span class="num">${i + 1}.</span>
        <span class="q-text"></span>
        <span class="icon"></span>`;
      button.querySelector(".q-text").textContent = item.question;

      const answer = document.createElement("div");
      answer.className = "answer";
      const inner = document.createElement("div");
      inner.className = "answer-inner";
      item.answer.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        inner.appendChild(p);
      });
      answer.appendChild(inner);

      button.addEventListener("click", () => toggle(wrapper));

      wrapper.append(button, answer);
      container.appendChild(wrapper);
    });
  });
}

// Only one item open at a time
function toggle(target) {
  const isOpen = target.classList.contains("open");

  document.querySelectorAll(".item.open").forEach((el) => {
    el.classList.remove("open");
    el.querySelector(".question").setAttribute("aria-expanded", "false");
  });

  if (!isOpen) {
    target.classList.add("open");
    target.querySelector(".question").setAttribute("aria-expanded", "true");
  }
}

// Open the tab named in the URL (#general / #program), or the first one
const startIndex = tabs.findIndex(
  (tab) => "#" + tab.name.toLowerCase() === location.hash
);
showTab(startIndex === -1 ? 0 : startIndex);
