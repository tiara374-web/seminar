const data = window.ARTIFACTS;

document.getElementById("artifactYear").textContent = new Date().getFullYear();

function renderFiles(items){
  return items.map(file => {
    const link = file.url && file.url !== "#"
      ? `<a href="${file.url}" target="_blank" rel="noopener">Lihat Dokumen ↗</a>`
      : `<span class="no-link">Belum ada link</span>`;

    return `
      <article class="artifact-file">
        <span class="artifact-file-type">${file.type}</span>
        <div>
          <h4>${file.title}</h4>
          <p>${file.description}</p>
          ${link}
        </div>
      </article>
    `;
  }).join("");
}

function renderCourses(targetId, courses){
  document.getElementById(targetId).innerHTML = courses.map(course => `
    <article class="artifact-course">
      <div class="artifact-course-head">
        <h3>${course.course}</h3>
        <p>${course.description}</p>
      </div>

      <div class="artifact-files">
        ${renderFiles(course.files)}
      </div>
    </article>
  `).join("");
}

renderCourses("semester1Artifacts", data.semester1);
renderCourses("semester2Artifacts", data.semester2);
renderCourses("pplArtifacts", data.ppl);
renderCourses("ppl2Artifacts", data.ppl2);

/* TAB */
const tabs = document.querySelectorAll(".artifact-tab");
const panels = document.querySelectorAll(".artifact-panel");

function showPanel(id){
  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.target === id);
  });

  panels.forEach(panel => {
    panel.classList.toggle("active", panel.id === id);
  });

  history.replaceState(null, "", "#" + id);
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    showPanel(tab.dataset.target);
  });
});

/* Jika membuka artefak.html#semester2 atau #ppl */
const firstHash = location.hash.replace("#", "");
if(["semester1","semester2","ppl"].includes(firstHash)){
  showPanel(firstHash);
}

/* Menu mobile */
const menuBtn = document.getElementById("artifactMenuBtn");
const nav = document.getElementById("artifactNav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});
