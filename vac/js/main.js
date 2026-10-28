/* LinguaForge — shared site behaviour */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- cursor spotlight on cards ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    var spots = document.querySelectorAll(".cell, .plan, .stack-card, .panel, .member");
    spots.forEach(function (el) {
      el.classList.add("spot");
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- hero language cycle ---------- */
  var cycleHost = document.querySelector("[data-cycle]");
  if (cycleHost) {
    var words = (cycleHost.getAttribute("data-cycle") || "").split("|").filter(Boolean);
    if (words.length > 1 && !reduceMotion) {
      var i = 0;
      var span = document.createElement("span");
      span.className = "cycle-word";
      span.textContent = words[0];
      cycleHost.textContent = "";
      cycleHost.appendChild(span);
      setInterval(function () {
        i = (i + 1) % words.length;
        var next = document.createElement("span");
        next.className = "cycle-word";
        next.textContent = words[i];
        cycleHost.replaceChild(next, span);
        span = next;
      }, 2200);
    } else if (words.length) {
      cycleHost.textContent = words[0];
    }
  }

  /* ---------- marquee duplication ---------- */
  var track = document.querySelector(".marquee-track");
  if (track) {
    track.innerHTML = track.innerHTML + track.innerHTML;
    if (reduceMotion) track.style.animation = "none";
  }

  /* ---------- rotating quote stage ---------- */
  var stage = document.querySelector("[data-quotes]");
  if (stage) {
    var slides = stage.querySelectorAll(".quote-slide");
    var dots = stage.querySelectorAll(".quote-dot");
    var qi = 0;
    var qTimer = null;

    function showQuote(n) {
      qi = (n + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle("active", idx === qi); });
      dots.forEach(function (d, idx) { d.setAttribute("aria-selected", idx === qi ? "true" : "false"); });
    }
    dots.forEach(function (d, idx) {
      d.addEventListener("click", function () {
        showQuote(idx);
        if (qTimer) { clearInterval(qTimer); qTimer = null; }
      });
    });
    showQuote(0);
    if (!reduceMotion && slides.length > 1) {
      qTimer = setInterval(function () { showQuote(qi + 1); }, 6000);
    }
  }

  /* ---------- hero mini demo ---------- */
  var mini = document.querySelector("[data-mini-demo]");
  if (mini) {
    var phrases = [
      { source: "Welcome to your dashboard.", outputs: {
        es: "Bienvenido a tu panel.", fr: "Bienvenue sur votre tableau de bord.",
        de: "Willkommen in Ihrem Dashboard.", ja: "ダッシュボードへようこそ。",
        ar: "مرحباً بك في لوحة التحكم.", hi: "आपके डैशबोर्ड में आपका स्वागत है।",
        pt: "Bem-vindo ao seu painel.", zh: "欢迎来到您的仪表板。"
      }},
      { source: "Your order has shipped.", outputs: {
        es: "Tu pedido ha sido enviado.", fr: "Votre commande a été expédiée.",
        de: "Ihre Bestellung wurde versandt.", ja: "ご注文の商品は発送されました。",
        ar: "تم شحن طلبك.", hi: "आपका ऑर्डर भेज दिया गया है।",
        pt: "O seu pedido foi enviado.", zh: "您的订单已发货。"
      }},
      { source: "Please update your payment method.", outputs: {
        es: "Actualiza tu método de pago.", fr: "Veuillez mettre à jour votre moyen de paiement.",
        de: "Bitte aktualisieren Sie Ihre Zahlungsmethode.", ja: "お支払い方法を更新してください。",
        ar: "يرجى تحديث طريقة الدفع.", hi: "कृपया अपना भुगतान विधि अपडेट करें।",
        pt: "Atualize o seu método de pagamento.", zh: "请更新您的付款方式。"
      }}
    ];
    var chips = mini.querySelectorAll(".lang-chip");
    var out = mini.querySelector("[data-mini-output]");
    var srcEl = mini.querySelector("[data-mini-source]");
    var pi = 0, lang = "es", typer = null;

    function pickPhrase() {
      pi = (pi + 1) % phrases.length;
      srcEl.textContent = phrases[pi].source;
      render();
    }
    function render() {
      var text = phrases[pi].outputs[lang] || phrases[pi].outputs.es;
      clearInterval(typer);
      if (reduceMotion) { out.textContent = text; return; }
      var n = 0;
      out.textContent = "";
      var caret = document.createElement("span");
      caret.className = "caret";
      out.appendChild(caret);
      typer = setInterval(function () {
        n++;
        out.textContent = text.slice(0, n);
        out.appendChild(caret);
        if (n >= text.length) clearInterval(typer);
      }, 28);
    }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        lang = chip.getAttribute("data-lang");
        render();
      });
    });
    srcEl.textContent = phrases[0].source;
    render();
    setInterval(pickPhrase, 6500);
  }
})();
