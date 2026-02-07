/* 
  ========================================
  GAME LOGIC & CONFIGURATION
  ========================================
*/

// EMAILJS INITIALIZATION (REQUIRED)
emailjs.init("3a_yaez1nSHZnW-Xj"); // ✅ YOUR PUBLIC KEY

// State
const state = {
  step: "hero", // hero, form, game, final
  currentQuestionIndex: 0,
  userData: {
    yourName: "",
    partnerName: "",
    yourEmail: "",
    partnerEmail: "",
  },
  // We track scores for the on-screen summary
  score: { you: 0, partner: 0 },
  // We track answers specifically for the email
  answers: [],
  emailSent: false,
};

// Questions Database
const questions = [
  {
    text: "Hum dono mein se sabse bada Drama Queen/King kaun hai? 🎭👑",
    type: "fun",
  },
  {
    text: "Baat-baat par Angry Bird banne ki aadat kiski hai? 😡🐦",
    type: "roast",
  },
  {
    text: "Sabse zyada Bad Jokes maar kar pakaane wala kaun hai? 🌽🥴",
    type: "roast",
  },
  {
    text: "Bina wajah Overthinking ka olympics kaun jeet sakta hai? 🧠🌀",
    type: "fun",
  },
  {
    text: "Relationship ki aadhi memory kiski wajah se delete hoti hai? 🧠🗑️",
    type: "fun",
  },
  {
    text: "Subah uthte hi Grumpy Zombie ki tarah kaun dikhta hai? 🧟‍♂️☕",
    type: "fun",
  },
  {
    text: "Sabse zyada Online Shopping karke bank balance khali kaun karta hai? 💸🛍️",
    type: "fun",
  },
  {
    text: "Hamari Fights mein hamesha “Sorry” bolne wala bakra kaun hai? 🐐🙏",
    type: "fun",
  },
  { text: "Kaun sabse zyada Selfie-Obsessed hai? 🤳🤳", type: "fun" },
  {
    text: "Sabse pehle Social Media par relationship update karne wala kaun tha? 📱💖",
    type: "memory",
  },
  {
    text: "Raat ko Geek/Gamer ban kar kaun jaagta rehta hai? 🎮🌙",
    type: "fun",
  },
  {
    text: "Sabse zyada Gossip aur “Tea” share karne wala partner kaun hai? ☕🐸",
    type: "fun",
  },
  {
    text: "Phone ki Gallery mein sabse zyada “Weird” photos kiski hoti hain? 🖼️🤪",
    type: "fun",
  },
  {
    text: "Bina nahaaye poora Weekend kaun nikaal sakta hai? 🚿🚫",
    type: "fun",
  },
  {
    text: "Road Trip par rasta bhool kar “Shortcut” ke naam par phasane wala kaun hai? 🗺️💀",
    type: "fun",
  },
  { text: "Hamari relationship mein Cooler Mind kiska hai? 🧊😎", type: "fun" },
  {
    text: "Sabse zyada Crying/Emotional movies dekh kar kaun rota hai? 😭🍿",
    type: "fun",
  },
  {
    text: "Kaun sabse bada Foodie hai jo doosre ki plate se bhi kha leta hai? 🍕😋",
    type: "fun",
  },
  {
    text: "Sabse zyada Lazy aur sote huye “Kharate” maarne wala kaun hai? 😴💤",
    type: "fun",
  },
  {
    text: "In the end, hum dono mein se Zyada Lucky kaun hai? 🍀😜",
    type: "fun",
  },
];

/* 
  ========================================
  DOM ELEMENTS
  ========================================
*/
const sections = {
  hero: document.getElementById("hero"),
  form: document.getElementById("formSection"),
  question: document.getElementById("questionSection"),
  final: document.getElementById("finalSection"),
};

const els = {
  heroYesBtn: document.getElementById("heroYesBtn"),
  heroNoBtn: document.getElementById("heroNoBtn"),
  tease: document.getElementById("tease"),
  form: document.getElementById("detailsForm"),
  questionText: document.getElementById("questionText"),
  optionUser: document.getElementById("optionUser"),
  optionPartner: document.getElementById("optionPartner"),
  progressBar: document.getElementById("progressBar"),
  nextBtn: document.getElementById("nextPageBtn"),
  bottomNav: document.getElementById("bottomNav"),
  emailBtn: document.getElementById("emailBtn"),
  resultSummary: document.getElementById("resultSummary"),
};

/* 
  ========================================
  EVENT LISTENERS
  ========================================
*/

// 1. Hero "No" Button Logic (Runaway Effect)
els.heroNoBtn.addEventListener("click", (e) => {
  els.tease.classList.remove("hidden");

  // Move the button to a random position
  const container = document.querySelector(".hero-buttons");
  const containerRect = container.getBoundingClientRect();
  const btnRect = els.heroNoBtn.getBoundingClientRect();

  // Calculate random coordinates within the container
  const randomX = Math.floor(Math.random() * 80);
  const randomY = Math.floor(Math.random() * 80);

  // Change text
  els.heroNoBtn.innerText = "Try Again! 😜";

  // Change Background Color randomly (Fun colors)
  const colors = ["#ff9999", "#99ff99", "#99ccff", "#ffff99", "#ff99cc"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  els.heroNoBtn.style.background = randomColor;
  els.heroNoBtn.style.borderColor = randomColor;

  // Apply positioning
  els.heroNoBtn.style.position = "absolute";
  els.heroNoBtn.style.left = `${randomX}%`;
  els.heroNoBtn.style.top = `${randomY}%`;

  // Add class to indicate it has moved
  els.heroNoBtn.classList.add("moved");
});

els.heroYesBtn.addEventListener("click", () => goToSection("form"));

// 2. Form Submission
els.form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Capture Data
  state.userData.yourName = document.getElementById("yourName").value;
  state.userData.partnerName = document.getElementById("partnerName").value;
  state.userData.yourEmail = document.getElementById("yourEmail").value;
  state.userData.partnerEmail = document.getElementById("partnerEmail").value;

  startGame();
});

// 3. Question Navigation
els.optionUser.addEventListener("click", () => handleAnswer("user"));
els.optionPartner.addEventListener("click", () => handleAnswer("partner"));

// 4. The "Next Page" Button Logic
els.nextBtn.addEventListener("click", () => {
  if (state.step === "hero") {
    goToSection("form");
  } else if (state.step === "form") {
    // Form validation check before skipping
    if (els.form.checkValidity()) {
      els.form.dispatchEvent(new Event("submit"));
    } else {
      els.form.reportValidity();
    }
  } else if (state.step === "final") {
    if (!state.emailSent) {
      // If on final page and email not sent, Next Button sends email
      sendEmail();
    } else {
      // If email IS sent, Next Button restarts the game
      location.reload();
    }
  }
});

// 5. Email Sending
els.emailBtn.addEventListener("click", sendEmail);

/* 
  ========================================
  FUNCTIONS
  ========================================
*/

function goToSection(target) {
  // Hide all sections
  Object.values(sections).forEach((sec) => sec.classList.add("hidden"));

  // Show target section
  sections[target].classList.remove("hidden");
  sections[target].classList.add("fade-in");

  // Update State
  state.step = target;

  // Handle "Next" button visibility
  if (target === "hero") {
    els.bottomNav.classList.add("visible");
    els.nextBtn.innerText = "Next Page ➡️";
  } else if (target === "form") {
    els.bottomNav.classList.add("visible");
    els.nextBtn.innerText = "Next Page ➡️";
  } else if (target === "final") {
    els.bottomNav.classList.add("visible");
    els.nextBtn.innerText = "Send Report 💌";
    generateSummary();
  } else {
    els.bottomNav.classList.remove("visible");
  }
}

function startGame() {
  state.currentQuestionIndex = 0;
  state.score = { you: 0, partner: 0 };
  state.answers = []; // Clear previous answers
  state.emailSent = false;
  loadQuestion();
  goToSection("question");
}

function loadQuestion() {
  const q = questions[state.currentQuestionIndex];

  // Update UI text with names
  els.questionText.innerText = q.text;
  els.optionUser.innerText = `${state.userData.yourName}`;
  els.optionPartner.innerText = `${state.userData.partnerName}`;

  // Update Progress
  const progress = (state.currentQuestionIndex / questions.length) * 100;
  els.progressBar.style.width = `${progress}%`;
}

function handleAnswer(winner) {
  // Update score
  if (winner === "user") state.score.you++;
  else state.score.partner++;

  // Get chosen name
  const choiceText =
    winner === "user" ? state.userData.yourName : state.userData.partnerName;

  // 🔥 FIX: USE .text, NOT THE OBJECT
  const questionText = questions[state.currentQuestionIndex].text;

  state.answers.push(`💖 ${questionText}\n👉 Answer: ${choiceText}`);

  state.currentQuestionIndex++;

  if (state.currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    finishGame();
  }
}

function finishGame() {
  els.progressBar.style.width = "100%";
  setTimeout(() => goToSection("final"), 500);
}

function generateSummary() {
  const u = state.userData.yourName;
  const p = state.userData.partnerName;

  let resultHTML = "";
  if (state.score.you > state.score.partner) {
    resultHTML = `${u} wins! 🏆 But we all know ${p} is the real prize. 😉`;
  } else if (state.score.partner > state.score.you) {
    resultHTML = `${p} wins! 🏆 ${u}, you better step up your game! 😜`;
  } else {
    resultHTML = `It's a Tie! 💖 Perfect match made in heaven. ✨`;
  }

  els.resultSummary.innerText = resultHTML;
}

function sendEmail() {
  if (state.emailSent) return;

  const btn = els.emailBtn;
  const nextBtn = els.nextBtn;

  // Button loading animation
  btn.disabled = true;
  btn.innerHTML = "Sending 💌...";
  btn.classList.add("sending");

  nextBtn.innerHTML = "Sending... ✨";
  nextBtn.classList.add("sending");

  // PREPARE MESSAGE CONTENT (Fix applied here)
  const finalMessage = `
  Hope this little love game brought a big smile to your faces 😊  
  Relationships are made of laughter, silly fights, inside jokes, memories,
  and moments that only two hearts truly understand 💑

  So here it is — your **Valentine Love Report** 💌  
  A fun mix of honesty, drama, roasting, and lots of pyaar 😜❤️

  ──────────────── 💕 ────────────────

  ${state.answers.join("\n\n")}

  ──────────────── 💕 ────────────────

  Whether you won, lost, or tied — remember one thing 🌹  
  You both already won at love 💞  
  Keep laughing together, teasing each other,
  and choosing each other every single day ✨

  Sending you hugs, smiles, and lots of good vibes 💫  
  May your love story keep getting sweeter with time 🍯💖

  With all the love in the world 💌  
  Your Valentine Love Game 🎭💕
  `;

  const templateParams = {
    to_email: state.userData.yourEmail,
    partner_email: state.userData.partnerEmail,
    message: finalMessage, // Sending the actual answers string
    user_name: state.userData.yourName,
    partner_name: state.userData.partnerName,
    reply_to: state.userData.yourEmail,
  };

  // ACTUAL EMAILJS CALL (Using your keys)
  emailjs
    .send(
      "service_2qdd95w", // ✅ SERVICE ID
      "template_hos6569", // ✅ TEMPLATE ID
      templateParams,
    )
    .then(() => {
      successState(btn, nextBtn);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);

      // Reset buttons on error
      btn.disabled = false;
      btn.innerHTML = "❌ Failed. Try Again";
      btn.classList.remove("sending");

      nextBtn.innerHTML = "Try Again ❌";
      nextBtn.classList.remove("sending");
    });
}

function successState(btn, nextBtn) {
  state.emailSent = true;

  // Update Main Email Button
  btn.disabled = false; // Keep clickable for show, or set to false if you want it read-only
  btn.classList.remove("sending");
  btn.classList.add("sent");
  btn.innerText = "✅ Sent Successfully 💖";

  // Update Bottom Next Button -> "Play Again"
  nextBtn.classList.remove("sending");
  nextBtn.innerText = "Play Again 🔄";
  nextBtn.style.background = "#fff";
  nextBtn.style.color = "#28a745";

  // Show a cute alert
  setTimeout(() => {
    alert("Check your inboxes! The love report has landed 💌");
  }, 500);
}

// Initialize visibility
els.bottomNav.classList.add("visible");
