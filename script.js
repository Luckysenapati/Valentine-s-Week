/* Date-based Theme */
const themes = {
  7: [
    "Rose Day 🌹",
    "A rose speaks when words fall silent.\nMy heart blooms for you 💐",
  ],
  8: [
    "Propose Day 💍",
    "Every love story starts with courage.\nThis is mine 💖",
  ],
  9: [
    "Chocolate Day 🍫",
    "Sweet moments melt hearts.\nLet’s share happiness 🍫",
  ],
  10: ["Teddy Day 🧸", "A hug that never leaves.\nJust like my feelings 🤍"],
  11: [
    "Promise Day 🤞",
    "A promise kept is a heart captured.\nForever starts now 💍",
  ],
  12: ["Hug Day 🤗", "Wrapped in warmth.\nLet the world fade 💞"],
  13: ["Kiss Day 💋", "A kiss seals unspoken love.\nRight here 💋"],
  14: ["Valentine’s Day ❤️", "Today love wears your name.\nAlways ❤️"],
};

const today = new Date();
const day = today.getDate();
// const day = 14;
console.log(day);
const month = today.getMonth() + 1;

const title = document.getElementById("dayTitle");
const message = document.getElementById("dayMessage");

if (month === 2 && day >= 7 && day <= 14) {
  title.innerText = themes[day][0];
  message.innerText = themes[day][1];
} else {
  title.innerText = "Love is Coming 💞";
  message.innerText =
    "Something beautiful is on the way.\nEvery heartbeat waits 💗";
}

/* Runaway NO Button */
const noBtn = document.getElementById("noBtn");
function escape() {
  noBtn.style.left = Math.random() * 240 + "px";
  noBtn.style.top = Math.random() * 40 + "px";
}
noBtn.addEventListener("mouseover", escape);
noBtn.addEventListener("touchstart", escape);

/* YES Button (UNCHANGED behavior) */
document.getElementById("yesBtn").onclick = () => {
  confetti({ particleCount: 350, spread: 200, origin: { y: 0.6 } });
  document.getElementById("proposal").classList.add("hidden");
  document.getElementById("success").classList.remove("hidden");
};

/* Music Toggle */
// const music = document.getElementById("bgMusic");
// document.getElementById("musicBtn").onclick = () =>
//   music.paused ? music.play() : music.pause();

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

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
    alert("Click again to allow music 🎵");
  }
});


// --------------------------------------------------------------------------------------------

/* Extended Theme Engine */
const themeData = {
  7: {
    class: "theme-rose",
    gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2I3bmRmczJ1dTVndzJ3cnoxYzc2MGtsdm9kb3BkeThmd3V5Z3NzayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wvYNSqBAMDVx8CEYkt/giphy.gif",
    emoji: "🌹🌸💖💐",
    text: "A rose speaks the language of the heart 🌹\nToday, love blooms beautifully 💐",
  },
  8: {
    class: "theme-propose",
    gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Z4b2JjYzR0am4wMThiNDdpNGh2NXJxY2N1NXluMzhrNW5rdnlnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/orU4txbRZIp6vJheJ9/giphy.gif",
    emoji: "💍💖✨💘",
    text: "Every love story begins with courage 💍\nHere is mine 💖",
  },
  9: {
    class: "theme-chocolate",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXFvbGZwcGhmZHRxbXF3cGVqN2dpZ3ljM2dnb3QzY2lleHRmbm9ieiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mFVSpheDwTeOLIKpd0/giphy.gif",
    emoji: "🍫🤎😍🍩",
    text: "Sweet moments melt hearts 🍫\nLet love taste sweeter today 🤎",
  },
  10: {
    class: "theme-teddy",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2pkcHhtbDgycGRtaDZ4eTIybzg0dmUzbGVlZGg2aXlqcW51ZjRhcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VIPdgcooFJHtC/giphy.gif",
    emoji: "🧸🤍✨🐻",
    text: "A hug you can always return to 🧸\nSoft, warm, and forever 🤍",
  },
  11: {
    class: "theme-promise",
    gif: "https://media.tenor.com/sUgI-MlZ-kIAAAAi/promised-assure.gif",
    emoji: "🤞💍💫🔑",
    text: "A promise made is a future secured 🤞\nI choose you, always 💍",
  },
  12: {
    class: "theme-hug",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJzcTd6a25wemM0b3o2aGZqbWtua2lmdGowaW91emQ5NTcxbDd6MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/x90dwDUuUx9Ys/giphy.gif",
    emoji: "🤗💞✨🫂",
    text: "Wrapped in warmth 🤗\nNothing else matters 💞",
  },
  13: {
    class: "theme-kiss",
    gif: "https://media1.tenor.com/m/iGOU08nTk_sAAAAd/cat-kiss-alydn.gif",
    emoji: "💋❤️🔥💏",
    text: "A kiss seals every unspoken feeling 💋\nRight here ❤️",
  },
  14: {
    class: "theme-valentine",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJzcTd6a25wemM0b3o2aGZqbWtua2lmdGowaW91emQ5NTcxbDd6MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rT7WPCciy8oETxLmUV/giphy.gif",
    emoji: "❤️👑✨💌",
    text: "Today, love wears your name ❤️\nForever starts now 👑",
  },
};

const heroGif = document.querySelector(".hero-gif");
const floatingLayer = document.querySelector(".floating-layer");

if (month === 2 && themeData[day]) {
  document.body.classList.add(themeData[day].class);
  heroGif.src = themeData[day].gif;
  message.innerText = themeData[day].text;

  const emojis = Array.from(themeData[day].emoji);

  floatingLayer.innerHTML = `
    <span>${emojis[0]}</span>
    <span>${emojis[1]}</span>
    <span>${emojis[2]}</span>
    <span>${emojis[3]}</span>
  `;
}
