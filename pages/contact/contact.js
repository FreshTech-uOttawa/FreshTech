(function(){
  const TEAM_EMAIL = "Freshtech@gmail.com";
  const form = document.getElementById("contactForm");
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const subjEl = document.getElementById("subject");
  const msgEl = document.getElementById("msg");
  const mailtoA = document.getElementById("mailtoLink");
  const copyBtn = document.getElementById("copyBtn");
  const copiedLbl = document.getElementById("copied");
  const toast = document.getElementById("toast");

  let toastTimer = null;

  // normalize email and validate
  function normalizeEmail(v){
    return (v || "")
      .normalize("NFKC")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .trim();
  }

  function isValidEmail(v){
    if(!v) return false;
    if(v.includes("..") || v.endsWith(".")) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
  }

  function buildMailto(name,email,subject,msg){
    const sub = subject && subject.trim() ? subject.trim() : "POLARIS — Contact";
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`;
    return `mailto:${TEAM_EMAIL}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
  }

  // show temporary message (toast)
  function showToast(text){
    clearTimeout(toastTimer);
    toast.textContent = text;
    toast.classList.add("show");
    toast.style.display = "block";

    // After 6 seconds: hide toast + clear input fields
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      toast.style.display = "none";
      form.reset(); // clear all fields
    }, 6000);
  }

  function hideToast(){
    clearTimeout(toastTimer);
    toast.classList.remove("show");
    toast.style.display = "none";
  }

  // copy email helper
  copyBtn.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(TEAM_EMAIL);
      copiedLbl.textContent = "Copied ✔";
      setTimeout(()=>copiedLbl.textContent="",1800);
    }catch{
      copiedLbl.textContent = "Copy failed — email: " + TEAM_EMAIL;
    }
  });

  // hide toast when typing again
  [nameEl,emailEl,subjEl,msgEl].forEach(el=>el.addEventListener("input", hideToast));

  // form submit
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    hideToast();

    const name = nameEl.value.trim();
    const email = normalizeEmail(emailEl.value);
    const sub = subjEl.value.trim();
    const msg = msgEl.value.trim();

    if(!name || !email || !msg){ showToast("Please fill name, email and message."); return; }
    if(!isValidEmail(email)){ showToast("Please enter a valid email address."); return; }

    const link = buildMailto(name,email,sub,msg);
    mailtoA.href = link;
    try { window.location.assign(link); } catch(_) {}
    setTimeout(()=>{ try{ mailtoA.click(); }catch(_){} }, 50);

    showToast("Message ready in your email app. We typically reply within 48 hours.");
  });
})();