/* LinguaForge — simulated localisation demo (no network calls) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var GLOSSARY = {
    "dashboard": { es: "panel", fr: "tableau de bord", de: "Dashboard", ja: "ダッシュボード", pt: "painel", zh: "仪表板", hi: "डैशबोर्ड", ar: "لوحة التحكم" },
    "order": { es: "pedido", fr: "commande", de: "Bestellung", ja: "注文", pt: "pedido", zh: "订单", hi: "ऑर्डर", ar: "الطلب" },
    "payment": { es: "pago", fr: "paiement", de: "Zahlung", ja: "お支払い", pt: "pagamento", zh: "付款", hi: "भुगतान", ar: "الدفع" },
    "free trial": { es: "prueba gratuita", fr: "essai gratuit", de: "kostenlose Testversion", ja: "無料トライアル", pt: "teste grátis", zh: "免费试用", hi: "निःशुल्क ट्रायल", ar: "تجربة مجانية" },
    "welcome": { es: "bienvenido", fr: "bienvenue", de: "willkommen", ja: "ようこそ", pt: "bem-vindo", zh: "欢迎", hi: "स्वागत", ar: "مرحباً" },
    "account": { es: "cuenta", fr: "compte", de: "Konto", ja: "アカウント", pt: "conta", zh: "账户", hi: "खाता", ar: "الحساب" },
    "password": { es: "contraseña", fr: "mot de passe", de: "Passwort", ja: "パスワード", pt: "palavra-passe", zh: "密码", hi: "पासवर्ड", ar: "كلمة المرور" },
    "download": { es: "descargar", fr: "télécharger", de: "herunterladen", ja: "ダウンロード", pt: "descarregar", zh: "下载", hi: "डाउनलोड", ar: "تنزيل" }
  };

  var SAMPLES = [
    "Welcome back! Your free trial ends in 3 days.",
    "Please update your payment method to keep your account active.",
    "Your order has shipped and will arrive on 12/03/2026.",
    "Download the report or share it with your team."
  ];

  var PHRASES = {
    es: {
      "welcome back! your free trial ends in 3 days.": "¡Bienvenido de nuevo! Tu prueba gratuita termina en 3 días.",
      "please update your payment method to keep your account active.": "Actualiza tu método de pago para mantener tu cuenta activa.",
      "your order has shipped and will arrive on 12/03/2026.": "Tu pedido ha sido enviado y llegará el 12/03/2026.",
      "download the report or share it with your team.": "Descarga el informe o compártelo con tu equipo."
    },
    fr: {
      "welcome back! your free trial ends in 3 days.": "Bon retour ! Votre essai gratuit se termine dans 3 jours.",
      "please update your payment method to keep your account active.": "Veuillez mettre à jour votre moyen de paiement pour garder votre compte actif.",
      "your order has shipped and will arrive on 12/03/2026.": "Votre commande a été expédiée et arrivera le 12/03/2026.",
      "download the report or share it with your team.": "Téléchargez le rapport ou partagez-le avec votre équipe."
    },
    de: {
      "welcome back! your free trial ends in 3 days.": "Willkommen zurück! Ihre kostenlose Testversion endet in 3 Tagen.",
      "please update your payment method to keep your account active.": "Bitte aktualisieren Sie Ihre Zahlungsmethode, um Ihr Konto aktiv zu halten.",
      "your order has shipped and will arrive on 12/03/2026.": "Ihre Bestellung wurde versandt und kommt am 12.03.2026 an.",
      "download the report or share it with your team.": "Laden Sie den Bericht herunter oder teilen Sie ihn mit Ihrem Team."
    },
    ja: {
      "welcome back! your free trial ends in 3 days.": "おかえりなさい！無料トライアルは 3 日で終了します。",
      "please update your payment method to keep your account active.": "アカウントを有効に保つため、お支払い方法を更新してください。",
      "your order has shipped and will arrive on 12/03/2026.": "ご注文の商品は発送済みで、2026/03/12 に到着予定です。",
      "download the report or share it with your team.": "レポートをダウンロードするか、チームと共有してください。"
    },
    pt: {
      "welcome back! your free trial ends in 3 days.": "Bem-vindo de novo! O seu teste grátis termina em 3 dias.",
      "please update your payment method to keep your account active.": "Atualize o seu método de pagamento para manter a sua conta ativa.",
      "your order has shipped and will arrive on 12/03/2026.": "O seu pedido foi enviado e chegará em 12/03/2026.",
      "download the report or share it with your team.": "Descarregue o relatório ou partilhe-o com a sua equipa."
    },
    zh: {
      "welcome back! your free trial ends in 3 days.": "欢迎回来！您的免费试用将在 3 天后结束。",
      "please update your payment method to keep your account active.": "请更新您的付款方式以保持账户有效。",
      "your order has shipped and will arrive on 12/03/2026.": "您的订单已发货，预计于 2026/03/12 送达。",
      "download the report or share it with your team.": "下载报告或与您的团队共享。"
    },
    hi: {
      "welcome back! your free trial ends in 3 days.": "वापसी पर स्वागत है! आपका निःशुल्क ट्रायल 3 दिनों में समाप्त हो रहा है।",
      "please update your payment method to keep your account active.": "अपना खाता सक्रिय रखने के लिए कृपया अपना भुगतान विधि अपडेट करें।",
      "your order has shipped and will arrive on 12/03/2026.": "आपका ऑर्डर भेज दिया गया है और 12/03/2026 को पहुँचेगा।",
      "download the report or share it with your team.": "रिपोर्ट डाउनलोड करें या अपनी टीम के साथ साझा करें।"
    },
    ar: {
      "welcome back! your free trial ends in 3 days.": "مرحباً بعودتك! تنتهي تجربتك المجانية خلال 3 أيام.",
      "please update your payment method to keep your account active.": "يرجى تحديث طريقة الدفع للحفاظ على نشاط حسابك.",
      "your order has shipped and will arrive on 12/03/2026.": "تم شحن طلبك وسيصل في 12/03/2026.",
      "download the report or share it with your team.": "حمّل التقرير أو شاركه مع فريقك."
    }
  };

  var LOCALE_NOTES = {
    es: ["Date format: DD/MM/YYYY", "Formal address: use «usted» in formal tone"],
    fr: ["Date format: DD/MM/YYYY", "Non-breaking space before ! and ?"],
    de: ["Date format: DD.MM.YYYY", "Compound nouns need correct capitalisation"],
    ja: ["Full-width punctuation required", "Keigo (polite) register applied"],
    pt: ["Date format: DD/MM/YYYY", "pt-PT vs pt-BR vocabulary diverges"],
    zh: ["Simplified script (zh-CN) selected", "Full-width punctuation required"],
    hi: ["Devanagari script — no manual line breaks", "Respect danda (।) sentence endings"],
    ar: ["Right-to-left — mirror layout in UI", "Arabic-Indic digits optional per market"]
  };

  var DETECT_MAP = [
    { re: /\b(hello|welcome|please|your|the|download|order|update)\b/i, lang: "English" },
    { re: /\b(hola|bienvenido|por favor|pedido|cuenta)\b/i, lang: "Spanish" },
    { re: /\b(bonjour|merci|commande|compte|veuillez)\b/i, lang: "French" },
    { re: /[\u3040-\u30ff]/, lang: "Japanese" },
    { re: /[\u4e00-\u9fff]/, lang: "Chinese" },
    { re: /[\u0600-\u06ff]/, lang: "Arabic" },
    { re: /[\u0900-\u097f]/, lang: "Hindi" }
  ];

  var input = document.getElementById("source-text");
  var targetSel = document.getElementById("target-lang");
  var toneSel = document.getElementById("tone");
  var outBox = document.getElementById("output-text");
  var metaStrip = document.getElementById("meta-strip");
  var form = document.getElementById("demo-form");
  var statusEl = document.getElementById("demo-status");
  var sampleWrap = document.getElementById("sample-btns");
  var charCount = document.getElementById("char-count");
  var detectEl = document.getElementById("detected-lang");

  if (!input || !form) return;

  SAMPLES.forEach(function (s) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "sample-btn";
    b.textContent = s.length > 42 ? s.slice(0, 40) + "…" : s;
    b.addEventListener("click", function () {
      input.value = s;
      updateCount();
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit", { cancelable: true }));
    });
    sampleWrap.appendChild(b);
  });

  function updateCount() {
    charCount.textContent = input.value.length + " / 500 chars";
    detectEl.textContent = detect(input.value);
  }

  function detect(text) {
    if (!text.trim()) return "—";
    for (var i = 0; i < DETECT_MAP.length; i++) {
      if (DETECT_MAP[i].re.test(text)) return DETECT_MAP[i].lang;
    }
    return "English (assumed)";
  }

  function pill(text, warn) {
    var s = document.createElement("span");
    s.className = "meta-pill" + (warn ? " warn" : "");
    s.textContent = text;
    return s;
  }

  function pseudoTranslate(text, lang) {
    var key = text.trim().toLowerCase().replace(/\s+/g, " ");
    var exact = (PHRASES[lang] || {})[key];
    if (exact) return { text: exact, confidence: 0.97, simulated: false };

    var result = text;
    var hits = 0;
    Object.keys(GLOSSARY).forEach(function (term) {
      var re = new RegExp("\\b" + term.replace(/ /g, "\\s+") + "\\b", "gi");
      if (re.test(result)) {
        hits++;
        result = result.replace(re, GLOSSARY[term][lang] || term);
      }
    });
    var confidence = hits ? 0.72 + Math.min(hits * 0.04, 0.15) : 0.55;
    return {
      text: result,
      confidence: confidence,
      simulated: true,
      glossaryHits: hits
    };
  }

  function applyTone(text, tone) {
    if (tone === "formal") return text.replace(/!\s*$/, ".").replace(/\byour\b/gi, "your").replace(/^([a-zà-ÿ])/, function (m) { return m.toUpperCase(); });
    if (tone === "marketing") return text.replace(/\.$/, "!").replace(/\.(\s|$)/g, " — ");
    return text;
  }

  function typeOut(finalText, done) {
    if (reduceMotion) { outBox.textContent = finalText; done(); return; }
    var n = 0;
    outBox.textContent = "";
    var caret = document.createElement("span");
    caret.className = "caret";
    outBox.appendChild(caret);
    var step = Math.max(8, Math.floor(finalText.length / 90));
    var t = setInterval(function () {
      n = Math.min(finalText.length, n + step);
      outBox.textContent = finalText.slice(0, n);
      outBox.appendChild(caret);
      if (n >= finalText.length) { clearInterval(t); done(); }
    }, 16);
  }

  var busy = false;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;

    var text = input.value.trim();
    var lang = targetSel.value;
    var tone = toneSel.value;
    metaStrip.innerHTML = "";
    outBox.classList.remove("error");

    if (!text) {
      outBox.classList.add("error");
      outBox.textContent = "Please enter some source text first.";
      metaStrip.appendChild(pill("error: empty input", true));
      return;
    }
    if (text.length > 500) {
      outBox.classList.add("error");
      outBox.textContent = "Demo limit is 500 characters — shorten your text.";
      metaStrip.appendChild(pill("error: over limit", true));
      return;
    }

    busy = true;
    statusEl.innerHTML = '<span class="spinner" aria-hidden="true"></span> Analysing segments…';
    outBox.classList.remove("placeholder");
    outBox.textContent = "";

    setTimeout(function () {
      statusEl.innerHTML = '<span class="spinner" aria-hidden="true"></span> Translating with glossary &amp; tone profile…';

      setTimeout(function () {
        var res = pseudoTranslate(text, lang);
        var finalText = applyTone(res.text, tone);

        metaStrip.appendChild(pill("detected: " + detect(text)));
        metaStrip.appendChild(pill("target: " + targetSel.options[targetSel.selectedIndex].text));
        metaStrip.appendChild(pill("tone: " + tone));
        metaStrip.appendChild(pill("confidence " + res.confidence.toFixed(2)));
        if (res.simulated) metaStrip.appendChild(pill("glossary-assisted fallback", true));
        (LOCALE_NOTES[lang] || []).forEach(function (n) { metaStrip.appendChild(pill(n, true)); });

        statusEl.innerHTML = '<span class="spinner" aria-hidden="true"></span> Rendering output…';
        typeOut(finalText, function () {
          statusEl.textContent = "Done — simulated translation complete.";
          busy = false;
        });
      }, 700);
    }, 500);
  });

  input.addEventListener("input", updateCount);
  updateCount();
  outBox.classList.add("placeholder");
  outBox.textContent = "Translated text will appear here.";
})();
