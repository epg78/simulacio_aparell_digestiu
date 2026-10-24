const organs = {
  boca: {
    nom: "Boca",
    categoria: "Tub digestiu",
    descripcio: "És l’entrada del tub digestiu. Aquí comença la digestió.",
    funcio: "Triturar, barrejar i humitejar els aliments amb la saliva."
  },
  dents: {
    nom: "Dents",
    categoria: "Estructura associada",
    descripcio: "Són peces dures situades a la boca.",
    funcio: "Tallar i triturar els aliments. Fan digestió mecànica."
  },
  "glandules-salivals": {
    nom: "Glàndules salivals",
    categoria: "Òrgan annex",
    descripcio: "Glàndules que produeixen saliva i l’alliberen a la boca.",
    funcio: "Humitejar els aliments i iniciar la digestió dels glúcids. La saliva conté enzims com l’amilasa, que inicia la digestió del midó, un hidrat de carboni complex present en aliments d’origen vegetal (arròs, patata, blat…)."
  },
  faringe: {
    nom: "Faringe",
    categoria: "Tub digestiu",
    descripcio: "És el conducte situat darrere de la boca que comunica amb l’esòfag.",
    funcio: "Participar en la deglució i dirigir el bol alimentari cap a l’esòfag."
  },
  esofag: {
    nom: "Esòfag",
    categoria: "Tub digestiu",
    descripcio: "És el tub muscular que connecta la faringe amb l’estómac.",
    funcio: "Transportar el bol alimentari mitjançant moviments peristàltics."
  },
  estomac: {
    nom: "Estómac",
    categoria: "Tub digestiu",
    descripcio: "És un òrgan muscular amb forma de bossa.",
    funcio: "Barrejar els aliments amb els sucs gàstrics i iniciar sobretot la digestió de les proteïnes. Per això, produeix enzims digestius, com la pepsina, i àcid clorhídric (HCl), que fa baixar el pH de l’estómac fins a valors aproximats de 2."
  },
  fetge: {
    nom: "Fetge",
    categoria: "Òrgan annex",
    descripcio: "Gran òrgan situat a la part superior dreta de l’abdomen.",
    funcio: "Produir la bilis, que emulsiona els greixos i en facilita la digestió. El fetge també participa en el processament i la distribució dels nutrients i en l’eliminació de substàncies tòxiques."
  },
  "vesicula-biliar": {
    nom: "Vesícula biliar",
    categoria: "Òrgan annex",
    descripcio: "Petit sac situat sota el fetge.",
    funcio: "Emmagatzemar i alliberar la bilis, que emulsiona els greixos i en facilita la digestió, a l’intestí prim."
  },
  pancrees: {
    nom: "Pàncrees",
    categoria: "Òrgan annex",
    descripcio: "Glàndula situada darrere de l’estómac.",
    funcio: "Produir sucs pancreàtics amb enzims que ajuden a digerir glúcids, lípids i proteïnes. A més, el pàncrees també produeix les hormones relacionades amb la glucosa: la insulina i el glucagó."
  },
  "intesti-prim": {
    nom: "Intestí prim",
    categoria: "Tub digestiu",
    descripcio: "Tub llarg i estret situat després de l’estómac.",
    funcio: "Completar la digestió i absorbir la major part dels nutrients. Les parets internes estan recobertes de vellositats intestinals per facilitar l’absorció de nutrients.",
    imatge: "imatges/vellositats.jpg",
    imatgeAlt: "Il·lustració de les vellositats intestinals",
    imatgePeu: "Vellositats intestinals: augmenten la superfície d’absorció."
  },
  "intesti-gros": {
    nom: "Intestí gros",
    categoria: "Tub digestiu",
    descripcio: "Tram final llarg i més ample del tub digestiu.",
    funcio: "Absorbir aigua i formar la femta. És on es troba una gran part de la microbiota, milions de bacteris que ajuden a fermentar la fibra i a produir algunes vitamines.",
    imatge: "imatges/microbiota.jpg",
    imatgeAlt: "Il·lustració de la microbiota intestinal",
    imatgePeu: "Microbiota intestinal: comunitat de microorganismes que viu a l’intestí."
  },
  apendix: {
    nom: "Apèndix",
    categoria: "Estructura associada",
    descripcio: "Petita prolongació unida al començament de l’intestí gros.",
    funcio: "No té una funció digestiva essencial coneguda. Conté teixit relacionat amb el sistema immunitari i pot estar relacionat amb la microbiota intestinal."
  },
  recte: {
    nom: "Recte",
    categoria: "Tub digestiu",
    descripcio: "És el tram final de l’intestí gros.",
    funcio: "Emmagatzemar temporalment la femta abans de l’expulsió."
  },
  anus: {
    nom: "Anus",
    categoria: "Tub digestiu",
    descripcio: "És l’obertura final del tub digestiu.",
    funcio: "Expulsar la femta a l’exterior i controlar-ne la sortida."
  }
};

const panelContent = document.querySelector("#panelContent");
const panelStatus = document.querySelector("#panelStatus");
const hotspots = [...document.querySelectorAll(".hotspot")];
const highlights = [...document.querySelectorAll(".organ-highlight")];
const exploreButton = document.querySelector("#exploreButton");
const quizButton = document.querySelector("#quizButton");
let selectedId = null;
let mode = "explore";
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let sessionQuestions = [];
let lastSessionSignature = "";

const quizQuestions = [
  { type: "identify", organ: "boca", question: "Assenyala a la imatge l’entrada de l’aparell digestiu." },
  { type: "choice", question: "Quina és la funció principal de les dents?", options: ["Absorbir nutrients", "Tallar i triturar els aliments", "Produir bilis", "Emmagatzemar la femta"], answer: 1 },
  { type: "choice", question: "Quin enzim de la saliva inicia la digestió del midó?", options: ["La pepsina", "L’amilasa", "La insulina", "El glucagó"], answer: 1 },
  { type: "identify", organ: "glandules-salivals", question: "Assenyala les glàndules que produeixen la saliva." },
  { type: "identify", organ: "esofag", question: "Assenyala el conducte que transporta el bol alimentari fins a l’estómac." },
  { type: "choice", question: "Què és la peristalsi?", options: ["La producció de bilis", "Una sèrie de contraccions que fan avançar el bol alimentari", "L’absorció d’aigua", "La trituració dels aliments amb les dents"], answer: 1 },
  { type: "choice", question: "Quin òrgan produeix la bilis?", options: ["La vesícula biliar", "El pàncrees", "El fetge", "L’intestí gros"], answer: 2 },
  { type: "identify", organ: "estomac", question: "Assenyala l’òrgan muscular on l’aliment es barreja amb els sucs gàstrics." },
  { type: "choice", question: "Per què l’estómac té un pH àcid?", options: ["Per facilitar l’acció dels sucs gàstrics i la pepsina", "Per produir saliva", "Per absorbir tota l’aigua", "Per fabricar la femta"], answer: 0 },
  { type: "choice", question: "On s’emmagatzema la bilis abans d’arribar a l’intestí prim?", options: ["A l’estómac", "A la vesícula biliar", "Al pàncrees", "Al recte"], answer: 1 },
  { type: "choice", question: "On s’absorbeix la major part dels nutrients?", options: ["A la boca", "A l’intestí prim", "A l’intestí gros", "A l’anus"], answer: 1 },
  { type: "identify", organ: "fetge", question: "Assenyala l’òrgan que produeix la bilis i participa en altres funcions metabòliques." },
  { type: "choice", question: "Quina altra funció té el pàncrees, a més de produir sucs pancreàtics?", options: ["Produir insulina i glucagó", "Emmagatzemar la femta", "Produir dents", "Absorbir l’aigua de la femta"], answer: 0 },
  { type: "choice", question: "Quina funció té principalment l’intestí gros?", options: ["Absorbir aigua i formar la femta", "Iniciar la digestió dels glúcids", "Produir saliva", "Transportar el bol alimentari"], answer: 0 },
  { type: "identify", organ: "intesti-prim", question: "Assenyala l’òrgan on es completa gran part de la digestió i s’absorbeixen nutrients." },
  { type: "choice", question: "Per a què serveixen principalment les vellositats intestinals?", options: ["Per augmentar la superfície d’absorció", "Per triturar els aliments", "Per produir bilis", "Per controlar l’expulsió de la femta"], answer: 0 },
  { type: "choice", question: "Què és la microbiota intestinal?", options: ["Un conjunt de bacteris que viuen a l’intestí", "Un tipus de suc gàstric", "Una glàndula del fetge", "El moviment de l’esòfag"], answer: 0 },
  { type: "choice", question: "Quina substància ajuda a emulsionar els greixos?", options: ["La bilis", "La saliva", "La femta", "El bol alimentari"], answer: 0 },
  { type: "identify", organ: "intesti-gros", question: "Assenyala el tram final i més ample del tub digestiu." },
  { type: "choice", question: "Quina afirmació sobre l’apèndix és correcta?", options: ["Produeix la bilis", "Conté teixit relacionat amb el sistema immunitari", "És on s’absorbeixen la majoria dels nutrients", "És l’obertura final del tub digestiu"], answer: 1 },
  { type: "identify", organ: "recte", question: "Assenyala el tram on s’emmagatzema temporalment la femta abans de l’expulsió." },
  { type: "choice", question: "Per on s’expulsa la femta a l’exterior?", options: ["Per la faringe", "Per l’esòfag", "Per l’anus", "Per la vesícula biliar"], answer: 2 },
  { type: "choice", question: "Quins òrgans de l’aparell digestiu funcionen com a glàndules annexes?", options: ["El fetge, el pàncrees i les glàndules salivals", "L’esòfag, el recte i l’anus", "Les dents, la faringe i l’estómac", "L’intestí prim i l’intestí gros"], answer: 0 },
  { type: "choice", question: "On es troba principalment la microbiota intestinal?", options: ["A l’intestí gros", "A la boca", "A l’esòfag", "A la vesícula biliar"], answer: 0 },
  { type: "identify", organ: "faringe", question: "Assenyala el conducte que participa en la deglució i comunica la boca amb l’esòfag." },
  { type: "identify", organ: "vesicula-biliar", question: "Assenyala el petit sac que emmagatzema la bilis sota el fetge." },
  { type: "identify", organ: "pancrees", question: "Assenyala la glàndula situada darrere de l’estómac que produeix sucs pancreàtics." },
  { type: "identify", organ: "apendix", question: "Assenyala la petita prolongació unida al començament de l’intestí gros." },
  { type: "identify", organ: "anus", question: "Assenyala l’obertura final del tub digestiu." },
  { type: "choice", question: "Quina diferència hi ha entre digestió mecànica i digestió química?", options: ["La mecànica tritura i la química transforma els aliments amb enzims i sucs", "La mecànica només passa a l’intestí i la química només a la boca", "La mecànica produeix hormones i la química produeix femta", "No hi ha cap diferència"], answer: 0 },
  { type: "choice", question: "Com s’anomena la massa d’aliment mastegat i barrejat amb saliva?", options: ["Bilis", "Bol alimentari", "Femta", "Quim"], answer: 1 },
  { type: "choice", question: "Quin nutrient comença a digerir-se a la boca gràcies a l’amilasa?", options: ["Els lípids", "Les proteïnes", "El midó", "Les vitamines"], answer: 2 },
  { type: "choice", question: "Sobre quin tipus de nutrient actua principalment la bilis?", options: ["Sobre els greixos", "Sobre les vitamines", "Sobre l’aigua", "Sobre les sals minerals"], answer: 0 },
  { type: "choice", question: "La bilis és un enzim digestiu?", options: ["Sí, digereix directament les proteïnes", "No, emulsiona els greixos i en facilita la digestió", "Sí, transforma l’aigua en nutrients", "No, només serveix per formar la femta"], answer: 1 },
  { type: "choice", question: "Quin òrgan produeix els sucs pancreàtics?", options: ["El fetge", "El pàncrees", "La vesícula biliar", "L’intestí gros"], answer: 1 },
  { type: "choice", question: "Quines substàncies produeix el pàncrees per ajudar a regular la glucosa?", options: ["La pepsina i l’amilasa", "La insulina i el glucagó", "La bilis i l’àcid clorhídric", "La saliva i la mucosa"], answer: 1 },
  { type: "choice", question: "Quin és l’ordre correcte del recorregut de l’aliment?", options: ["Boca, esòfag, faringe, estómac", "Boca, faringe, esòfag, estómac", "Faringe, boca, estómac, esòfag", "Boca, estómac, faringe, esòfag"], answer: 1 },
  { type: "choice", question: "Quin òrgan és més llarg habitualment?", options: ["L’intestí prim", "L’intestí gros", "L’esòfag", "El recte"], answer: 0 },
  { type: "choice", question: "Què absorbeix principalment l’intestí gros?", options: ["Aigua", "Oxigen", "Bilis", "Saliva"], answer: 0 },
  { type: "choice", question: "Quina és una funció de la microbiota intestinal?", options: ["Fermentar part de la fibra i produir algunes vitamines", "Produir les dents", "Transportar el bol per l’esòfag", "Emmagatzemar la bilis"], answer: 0 },
  { type: "choice", question: "Quina estructura augmenta la superfície interna de l’intestí prim?", options: ["Les vellositats intestinals", "Els esfínters de l’anus", "Les dents", "La vesícula biliar"], answer: 0 },
  { type: "choice", question: "Quina funció té el recte?", options: ["Emmagatzemar temporalment la femta", "Produir bilis", "Iniciar la digestió dels glúcids", "Absorbir la majoria dels nutrients"], answer: 0 },
  { type: "choice", question: "Quina afirmació sobre l’apèndix és més adequada?", options: ["No té una funció digestiva essencial coneguda", "És el lloc principal d’absorció de nutrients", "Produeix els sucs gàstrics", "Emmagatzema la bilis"], answer: 0 },
  { type: "choice", question: "Quina substància fa baixar el pH de l’estómac?", options: ["L’àcid clorhídric", "La bilis", "La insulina", "La femta"], answer: 0 },
  { type: "choice", question: "Quin nutrient es digereix principalment a l’estómac?", options: ["Les proteïnes", "Les vitamines", "L’aigua", "Les sals minerals"], answer: 0 },
  { type: "choice", question: "Quina funció NO correspon al fetge?", options: ["Produir bilis", "Participar en el processament dels nutrients", "Eliminar determinades substàncies tòxiques", "Empènyer el bol alimentari amb moviments peristàltics"], answer: 3 },
  { type: "choice", question: "Quin òrgan allibera la bilis a l’intestí prim?", options: ["La vesícula biliar", "Les dents", "El recte", "La faringe"], answer: 0 },
  { type: "choice", question: "Què passa amb l’aliment durant la deglució?", options: ["És dirigit des de la faringe cap a l’esòfag", "Es transforma directament en femta", "S’emmagatzema a la vesícula", "Passa als pulmons"], answer: 0 },
  { type: "choice", question: "Quina estructura controla la sortida de la femta?", options: ["L’anus i els seus esfínters", "Les glàndules salivals", "El pàncrees", "El fetge"], answer: 0 },
  { type: "choice", question: "Quin òrgan és un tub muscular que connecta la faringe amb l’estómac?", options: ["L’esòfag", "El recte", "El fetge", "La vesícula biliar"], answer: 0 }
];

function playTone(result) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  const correct = result === "correct";
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(correct ? 660 : 220, now);
  oscillator.frequency.exponentialRampToValueAtTime(correct ? 880 : 165, now + 0.12);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.055, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.18);
  oscillator.addEventListener("ended", () => audioContext.close(), { once: true });
}

function startQuizSession() {
  let candidate;
  let signature;
  do {
    candidate = [...quizQuestions];
    for (let index = candidate.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [candidate[index], candidate[randomIndex]] = [candidate[randomIndex], candidate[index]];
    }
    candidate = candidate.slice(0, 10);
    signature = candidate.map((question) => question.question).join("|");
  } while (signature === lastSessionSignature && quizQuestions.length > 10);
  sessionQuestions = candidate;
  lastSessionSignature = signature;
}

function setHighlight(id, mode = "preview") {
  highlights.forEach((highlight) => {
    const active = highlight.dataset.highlight === id;
    highlight.classList.toggle("is-active", active && mode === "preview");
    highlight.classList.toggle("is-selected", active && mode === "selected");
  });
}

function renderOrgan(id, mode = "selected") {
  const organ = organs[id];
  if (!organ) return;
  panelStatus.textContent = mode === "preview" ? "Vista prèvia" : "Òrgan seleccionat";
  const supportingImage = organ.imatge ? `<figure class="supporting-figure"><img src="${organ.imatge}" alt="${organ.imatgeAlt}"><figcaption>${organ.imatgePeu}</figcaption></figure>` : "";
  panelContent.innerHTML = `
    <p class="panel-kicker">${organ.categoria}</p>
    <h2>${organ.nom}</h2>
    <div class="info-block">
      <p class="info-label">Descripció</p>
      <p>${organ.descripcio}</p>
    </div>
    <div class="info-block">
      <p class="info-label">Funció principal</p>
      <p>${organ.funcio}</p>
    </div>
    ${supportingImage}
    <span class="category-pill">${organ.categoria}</span>
  `;
}

function setPreview(id) {
  hotspots.forEach((hotspot) => hotspot.classList.toggle("is-preview", hotspot.dataset.organ === id));
  setHighlight(id, "preview");
  if (mode === "quiz") return;
  if (id && id !== selectedId) renderOrgan(id, "preview");
}

function clearPreview() {
  hotspots.forEach((hotspot) => hotspot.classList.remove("is-preview"));
  if (mode === "quiz") return;
  if (selectedId) {
    setHighlight(selectedId, "selected");
    renderOrgan(selectedId, "selected");
  }
  else {
    highlights.forEach((highlight) => highlight.classList.remove("is-active", "is-selected"));
    panelStatus.textContent = "Exploració guiada";
    panelContent.innerHTML = `<p class="panel-kicker">APARELL DIGESTIU</p><h2>Tria una part del dibuix</h2><p>Quan seleccionis un òrgan, aquí hi trobaràs el seu nom, una descripció i la seva funció principal.</p>`;
  }
}

function selectOrgan(id) {
  if (mode === "quiz") {
    if (sessionQuestions[quizIndex]?.type === "identify") answerIdentify(id);
    return;
  }
  selectedId = id;
  hotspots.forEach((hotspot) => hotspot.classList.toggle("is-selected", hotspot.dataset.organ === id));
  setHighlight(id, "selected");
  renderOrgan(id, "selected");
}

function setMode(nextMode) {
  mode = nextMode;
  exploreButton.classList.toggle("active", mode === "explore");
  quizButton.classList.toggle("active", mode === "quiz");
  if (mode === "quiz") {
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    startQuizSession();
    renderQuizQuestion();
  } else {
    panelStatus.textContent = "Exploració guiada";
    clearPreview();
  }
}

function renderQuizQuestion() {
  const item = sessionQuestions[quizIndex];
  quizAnswered = false;
  hotspots.forEach((hotspot) => hotspot.classList.remove("is-selected", "is-preview"));
  highlights.forEach((highlight) => highlight.classList.remove("is-selected", "is-active"));
  panelStatus.textContent = "Posa’t a prova";
  const progress = `<p class="quiz-progress">Pregunta ${quizIndex + 1} de ${sessionQuestions.length} · Puntuació: ${quizScore}</p>`;
  if (item.type === "identify") {
    panelContent.innerHTML = `${progress}<p class="panel-kicker">IDENTIFICACIÓ</p><h2 class="quiz-question">${item.question}</h2><p>Fes clic sobre el punt de l’òrgan que consideris correcte.</p>`;
    return;
  }
  const options = item.options.map((option, index) => `<button class="quiz-option" type="button" data-option="${index}">${option}</button>`).join("");
  panelContent.innerHTML = `${progress}<p class="panel-kicker">PREGUNTA TEST</p><h2 class="quiz-question">${item.question}</h2><div class="quiz-options">${options}</div>`;
  panelContent.querySelectorAll(".quiz-option").forEach((option) => option.addEventListener("click", () => answerChoice(Number(option.dataset.option))));
}

function showQuizFeedback(correct, explanation) {
  const feedback = document.createElement("div");
  feedback.className = "quiz-feedback";
  feedback.innerHTML = `<strong>${correct ? "Correcte!" : "Encara no."}</strong><br>${explanation}`;
  panelContent.append(feedback);
  const next = document.createElement("button");
  next.className = "quiz-next";
  next.type = "button";
  next.textContent = quizIndex === sessionQuestions.length - 1 ? "Veure resultat" : "Següent pregunta";
  next.addEventListener("click", nextQuizQuestion);
  panelContent.append(next);
}

function answerIdentify(id) {
  if (quizAnswered) return;
  const item = sessionQuestions[quizIndex];
  if (item.type !== "identify") return;
  quizAnswered = true;
  const correct = id === item.organ;
  if (correct) quizScore += 1;
  playTone(correct ? "correct" : "wrong");
  hotspots.forEach((hotspot) => hotspot.classList.toggle("is-selected", hotspot.dataset.organ === item.organ));
  setHighlight(item.organ, "selected");
  showQuizFeedback(correct, correct ? `Has identificat correctament ${organs[item.organ].nom.toLowerCase()}.` : `La resposta correcta era ${organs[item.organ].nom}.`);
}

function answerChoice(index) {
  if (quizAnswered) return;
  const item = sessionQuestions[quizIndex];
  quizAnswered = true;
  const correct = index === item.answer;
  if (correct) quizScore += 1;
  playTone(correct ? "correct" : "wrong");
  panelContent.querySelectorAll(".quiz-option").forEach((option, optionIndex) => {
    option.disabled = true;
    if (optionIndex === item.answer) option.classList.add("is-correct");
    else if (optionIndex === index) option.classList.add("is-wrong");
  });
  showQuizFeedback(correct, correct ? "La resposta és correcta." : `La resposta correcta és: ${item.options[item.answer]}.`);
}

function nextQuizQuestion() {
  if (quizIndex === sessionQuestions.length - 1) {
    panelStatus.textContent = "Resultat final";
    panelContent.innerHTML = `<div class="quiz-score"><p class="panel-kicker">RESULTAT</p><h2>Has acabat la prova</h2><p>Has encertat <strong>${quizScore} de ${sessionQuestions.length}</strong> preguntes.</p><button class="quiz-next" type="button" id="restartQuiz">Nova prova aleatòria</button></div>`;
    panelContent.querySelector("#restartQuiz").addEventListener("click", () => { quizIndex = 0; quizScore = 0; startQuizSession(); renderQuizQuestion(); });
    return;
  }
  quizIndex += 1;
  renderQuizQuestion();
}

exploreButton.addEventListener("click", () => setMode("explore"));
quizButton.addEventListener("click", () => setMode("quiz"));

hotspots.forEach((hotspot) => {
  const id = hotspot.dataset.organ;
  hotspot.addEventListener("mouseenter", () => setPreview(id));
  hotspot.addEventListener("mouseleave", clearPreview);
  hotspot.addEventListener("focus", () => setPreview(id));
  hotspot.addEventListener("blur", clearPreview);
  hotspot.addEventListener("click", () => selectOrgan(id));
});
