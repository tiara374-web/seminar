const C = window.PORTFOLIO_CONTENT;

document.getElementById("name").textContent = C.profile.name;
document.getElementById("program").textContent = C.profile.program;
document.getElementById("institution").textContent = C.profile.institution;
document.getElementById("tagline").textContent = C.profile.tagline;
document.getElementById("year").textContent = new Date().getFullYear();

function renderCourse(c,i){
  const artifacts=c.artifacts.map(a=>`
    <article class="artifact-card">
      <h4>${a.name}</h4>
      <p>${a.desc}</p>
      <a href="${a.url}" ${a.url==="#"?'':'target="_blank" rel="noopener"'}>Lihat artefak ↗</a>
    </article>`).join("");
  return `<article class="course reveal">
    <button class="course-top" aria-expanded="false">
      <span class="course-number">${String(i+1).padStart(2,"0")}</span>
      <span class="course-name">${c.title}</span>
      <span class="chev">⌄</span>
    </button>
    <div class="course-content"><div class="course-inner">
      <div class="fourc">
        <article class="reflect-card"><h4>Connection</h4><p>${c.connection}</p></article>
        <article class="reflect-card"><h4>Challenge</h4><p>${c.challenge}</p></article>
        <article class="reflect-card"><h4>Concept</h4><p>${c.concept}</p></article>
        <article class="reflect-card"><h4>Change</h4><p>${c.change}</p></article>
      </div>
      <h3 class="subhead">Pemilihan Artefak</h3>
      <div class="double">${artifacts}</div>
      <div class="analysis-row">
        <article class="analysis-card"><h4>Analisis Artefak</h4><p>${c.analysis}</p></article>
        <article class="analysis-card"><h4>Kaitan Praktis</h4><p>${c.practical}</p></article>
      </div>
    </div></div>
  </article>`;
}
semester1List.innerHTML=C.semester1.map(renderCourse).join("");
semester2List.innerHTML=C.semester2.map(renderCourse).join("");

educationView.textContent=C.lk3.education;
professionalView.textContent=C.lk3.professional;
rtlView.innerHTML=C.lk3.rtl.map((r,i)=>`
  <div class="rtl-item"><span>0${i+1}</span><h4>${r.title}</h4><p>${r.text}</p></div>`).join("");

document.querySelectorAll(".course").forEach(card=>{
  const btn=card.querySelector(".course-top");
  const body=card.querySelector(".course-content");
  btn.addEventListener("click",()=>{
    const open=card.classList.toggle("open");
    btn.setAttribute("aria-expanded",open);
    body.style.maxHeight=open?body.scrollHeight+"px":"0px";
  });
});

menuBtn.onclick=()=>nav.classList.toggle("open");
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));

const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}})
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));

window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progressBar.style.width=(max?scrollY/max*100:0)+"%";
});