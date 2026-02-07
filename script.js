/* 
  ========================================
  1. VALENTINE'S DYNAMIC THEME ENGINE
  ========================================
*/

const today = new Date();
const day = today.getDate(); 
// const day = 14; // <--- UNCOMMENT THIS LINE TO TEST SPECIFIC DAYS (e.g., change to 8 for Propose Day)
const month = today.getMonth() + 1; // February is 2

// Unified Data: Titles, Messages, CSS Classes, GIFs, and Emojis
const themeData = {
  7: {
    title: "Rose Day 🌹",
    message: "A rose speaks when words fall silent.\nMy heart blooms for you 💐",
    class: "theme-rose",
    gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2I3bmRmczJ1dTVndzJ3cnoxYzc2MGtsdm9kb3BkeThmd3V5Z3NzayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wvYNSqBAMDVx8CEYkt/giphy.gif",
    emojis: ["🌹", "🌸", "💖", "💐"]
  },
  8: {
    title: "Propose Day 💍",
    message: "Every love story starts with courage.\nThis is mine 💖",
    class: "theme-propose",
    gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Z4b2JjYzR0am4wMThiNDdpNGh2NXJxY2N1NXluMzhrNW5rdnlnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/orU4txbRZIp6vJheJ9/giphy.gif",
    emojis: ["💍", "💖", "✨", "💘"]
  },
  9: {
    title: "Chocolate Day 🍫",
    message: "Sweet moments melt hearts.\nLet’s share happiness 🍫",
    class: "theme-chocolate",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXFvbGZwcGhmZHRxbXF3cGVqN2dpZ3ljM2dnb3QzY2lleHRmbm9ieiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mFVSpheDwTeOLIKpd0/giphy.gif",
    emojis: ["🍫", "🤎", "😍", "🍩"]
  },
  10: {
    title: "Teddy Day 🧸",
    message: "A hug that never leaves.\nJust like my feelings 🤍",
    class: "theme-teddy",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2pkcHhtbDgycGRtaDZ4eTIybzg0dmUzbGVlZGg2aXlqcW51ZjRhcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VIPdgcooFJHtC/giphy.gif",
    emojis: ["🧸", "🤍", "✨", "🐻"]
  },
  11: {
    title: "Promise Day 🤞",
    message: "A promise kept is a heart captured.\nForever starts now 💍",
    class: "theme-promise",
    gif: "https://media.tenor.com/sUgI-MlZ-kIAAAAi/promised-assure.gif",
    emojis: ["🤞", "💍", "💫", "🔑"]
  },
  12: {
    title: "Hug Day 🤗",
    message: "Wrapped in warmth.\nLet’s the world fade 💞",
    class: "theme-hug",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJzcTd6a25wemM0b3o2aGZqbWtua2lmdGowaW91emQ5NTcxbDd6MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/x90dwDUuUx9Ys/giphy.gif",
    emojis: ["🤗", "💞", "✨", "🫂"]
  },
  13: {
    title: "Kiss Day 💋",
    message: "A kiss seals unspoken love.\nRight here 💋",
    class: "theme-kiss",
    gif: "https://media1.tenor.com/m/iGOU08nTk_sAAAAd/cat-kiss-alydn.gif",
    emojis: ["💋", "❤️", "🔥", "💏"]
  },
  14: {
    title: "Valentine’s Day ❤️",
    message: "Today love wears your name.\nAlways ❤️",
    class: "theme-valentine",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJzcTd6a25wemM0b3o2aGZqbWtua2lmdGowaW91emQ5NTcxbDd6MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rT7WPCciy8oETxLmUV/giphy.gif",
    emojis: ["❤️", "👑", "✨", "💌"]
  }
};

// DOM Elements
const titleEl = document.getElementById("dayTitle");
const messageEl = document.getElementById("dayMessage");
const gifEl = document.querySelector(".hero-gif");
const floatingLayer = document.querySelector(".floating-layer");

// Apply Theme Logic
if (month === 2 && themeData[day]) {
  const theme = themeData[day];

  // 1. Update Text
  if (titleEl) titleEl.innerText = theme.title;
  if (messageEl) messageEl.innerText = theme.message;

  // 2. Update Body Class (for specific CSS themes if you have them)
  if (theme.class) document.body.classList.add(theme.class);

  // 3. Update GIF
  if (gifEl) {
    gifEl.src = theme.gif;
    gifEl.style.opacity = "0"; // Small fade effect
    setTimeout(() => gifEl.style.opacity = "1", 300);
  }

  // 4. Update Floating Emojis
  if (floatingLayer) {
    floatingLayer.innerHTML = theme.emojis.map(emoji => `<span>${emoji}</span>`).join("");
  }

} else {
  // Default Fallback (If not Feb 7-14)
  if (titleEl) titleEl.innerText = "Love is Coming 💞";
  if (messageEl) messageEl.innerText = "Something beautiful is on the way.\nEvery heartbeat waits 💗";
}


/* 
  ========================================
  2. INTERACTION LOGIC (Runaway Button & Music)
  ========================================
*/

/* Runaway NO Button */
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  function escape() {
    // Random position calculation (keeps it relatively on screen)
    const randomX = Math.random() * 240 + "px";
    const randomY = Math.random() * 40 + "px";

    noBtn.style.position = "absolute";
    noBtn.style.left = randomX;
    noBtn.style.top = randomY;
  }
  noBtn.addEventListener("mouseover", escape);
  noBtn.addEventListener("touchstart", escape); // For mobile
}

/* YES Button (Confetti Effect) */
const yesBtn = document.getElementById("yesBtn");
if (yesBtn) {
  yesBtn.onclick = () => {
    // Trigger Confetti
    if (typeof confetti === "function") {
      confetti({ particleCount: 350, spread: 200, origin: { y: 0.6 } });
    }

    // Hide Proposal, Show Success
    document.getElementById("proposal").classList.add("hidden");
    document.getElementById("success").classList.remove("hidden");
  };
}

/* Music Toggle */
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (musicBtn && music) {
  musicBtn.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        musicBtn.innerText = "⏸ Music";
      } else {
        music.pause();
        musicBtn.innerText = "🎵 Music";
      }
    } catch (e) {
      console.error("Music error:", e);
      // Fallback for browsers blocking autoplay
      alert("Please interact with the page first to enable music 🎵");
    }
  });
}