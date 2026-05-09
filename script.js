
const GEJALA_INFO = {
  G01: "Menggunakan gadget >6 jam/hari",
  G02: "Waktu gadget > aktivitas akademik",
  G03: "Cemas berpisah dari gadget (Nomophobia)",
  G04: "Marah saat gadget diambil",
  G05: "Lebih sering interaksi dengan gadget (Phubbing)",
  G06: "Malas kuliah karena gadget",
  G07: "Gugup saat tidak ada internet",
  G08: "Tidak mau berhenti pakai gadget",
  G09: "Pakai gadget saat makan/belajar/jalan",
  G10: "Tidur dengan gadget di dekat",
  G11: "Sangat bahagia saat pakai gadget",
  G12: "Selalu bawa charger ke mana pun",
  G13: "Interaksi sosial singkat karena gadget",
  G14: "Gadget sebagai pelarian dari tugas",
  G15: "Cek gadget meski tidak ada notif",
  G16: "FOMO – takut ketinggalan info",
  G17: "Panik saat baterai hampir habis (Low Battery Anxiety)",
  G18: "Phantom Vibration",
  G19: "Nilai akademik menurun",
  G20: "Pola tidur terganggu",
};

const RULES = [
  {
    conditions: [
      "G01",
      "G02",
      "G03",
      "G04",
      "G05",
      "G06",
      "G08",
      "G09",
      "G10",
      "G17",
      "G19",
      "G20",
    ],
    result: "BERAT",
  },
  {
    conditions: ["G01", "G02", "G05", "G06", "G07", "G13", "G14", "G16"],
    result: "BERAT",
  },
  { conditions: ["G01", "G02", "G03", "G04", "G17", "G20"], result: "SEDANG" },
  {
    conditions: ["G01", "G02", "G09", "G10", "G11", "G12", "G15", "G18"],
    result: "SEDANG",
  },
  { conditions: ["G01", "G02", "G05", "G06", "G13"], result: "SEDANG" },
  { conditions: ["G01", "G02", "G14", "G15"], result: "RINGAN" },
  { conditions: ["G01", "G11", "G13"], result: "RINGAN" },
  { conditions: ["G01"], result: "RINGAN" },
];

const HASIL_DATA = {
  RINGAN: {
    icon: "🟢",
    title: "Kecanduan Ringan",
    subtitle:
      "Penggunaan gadget Anda masih dalam batas yang dapat dikendalikan.",
    level: "ringan",
    pct: 30,
    desc: "Anda menunjukkan beberapa perilaku penggunaan gadget berlebihan, namun masih dalam tahap awal. Perubahan kecil pada kebiasaan sudah cukup efektif untuk mengatasi kondisi ini.",
    rekomendasi: [
      "Buat jadwal penggunaan gadget harian maksimal 4 jam di luar kebutuhan akademik.",
      "Isi waktu luang dengan aktivitas positif: olahraga, membaca, atau bergabung dengan organisasi kampus.",
      "Aktifkan fitur Screen Time / Digital Wellbeing di gadget untuk memantau durasi penggunaan.",
      "Letakkan gadget di tempat yang tidak mudah dijangkau saat belajar atau sebelum tidur.",
      "Tetapkan zona bebas gadget: saat makan, saat ibadah, dan 1 jam sebelum tidur.",
    ],
  },
  SEDANG: {
    icon: "🟡",
    title: "Kecanduan Sedang",
    subtitle:
      "Penggunaan gadget Anda sudah mulai mengganggu aktivitas sehari-hari.",
    level: "sedang",
    pct: 62,
    desc: "Anda menunjukkan pola kecanduan gadget tingkat sedang. Dampak sudah mulai terasa pada produktivitas akademik dan interaksi sosial. Diperlukan langkah aktif untuk perubahan.",
    rekomendasi: [
      "Batasi durasi penggunaan gadget maksimal 4 jam per hari dan kurangi 30 menit setiap minggu.",
      "Nonaktifkan notifikasi media sosial selama jam kuliah dan jam belajar.",
      "Bergabung dengan komunitas atau organisasi kampus untuk meningkatkan interaksi sosial nyata.",
      "Minta bantuan teman dekat atau keluarga untuk saling mengingatkan penggunaan gadget.",
      "Konsultasikan kebiasaan Anda dengan konselor akademik atau Unit Kegiatan Mahasiswa terkait.",
      "Terapkan teknik Pomodoro: 25 menit belajar tanpa gadget, 5 menit istirahat.",
    ],
  },
  BERAT: {
    icon: "🔴",
    title: "Kecanduan Berat",
    subtitle:
      "Penggunaan gadget Anda sudah berdampak serius pada kehidupan akademik dan sosial.",
    level: "berat",
    pct: 90,
    desc: "Anda menunjukkan pola kecanduan gadget tingkat berat. Kondisi ini memerlukan perhatian serius dan penanganan segera dari profesional untuk mencegah dampak yang lebih parah.",
    rekomendasi: [
      "Segera konsultasikan kondisi Anda dengan psikolog atau konselor kampus.",
      "Ikuti program detoksifikasi digital: mulai dengan 1 hari per minggu tanpa media sosial.",
      "Minta dukungan keluarga dan teman dekat untuk membantu pengawasan penggunaan gadget.",
      "Pertimbangkan untuk menggunakan ponsel sederhana sementara waktu untuk mengurangi ketergantungan.",
      "Catat secara harian perasaan Anda saat tidak menggunakan gadget untuk memantau perkembangan.",
      "Ikuti kegiatan fisik atau komunitas tatap muka untuk mengisi waktu yang biasa digunakan dengan gadget.",
    ],
  },
};

let selectedGejala = new Set();
let userData = {};

function toggleGejala(el) {
  const id = el.dataset.id;
  selectedGejala.has(id) ? selectedGejala.delete(id) : selectedGejala.add(id);
  el.classList.toggle("checked", selectedGejala.has(id));
  updateProgress();
}
function updateProgress() {
  const cnt = selectedGejala.size;
  const pct = Math.round((cnt / 20) * 100);
  document.getElementById("cntLabel").textContent = cnt;
  document.getElementById("cntBadge").textContent = cnt;
  document.getElementById("progPct").textContent = pct + "%";
  document.getElementById("progressFill").style.width = pct + "%";
}
function resetGejala() {
  selectedGejala.clear();
  document
    .querySelectorAll(".gejala-item.checked")
    .forEach((el) => el.classList.remove("checked"));
  updateProgress();
  document.getElementById("warn2").classList.remove("show");
}
function goPage2() {
  const nama = document.getElementById("nama").value.trim();
  const nim = document.getElementById("nim").value.trim();
  const usia = document.getElementById("usia").value.trim();
  const jk = document.getElementById("jk").value;
  const prodi = document.getElementById("prodi").value.trim();
  const semester = document.getElementById("semester").value;
  if (!nama || !nim || !usia || !jk || !prodi || !semester) {
    document.getElementById("warn1").classList.add("show");
    return;
  }
  document.getElementById("warn1").classList.remove("show");
  userData = { nama, nim, usia, jk, prodi, semester };
  showPage("page2");
  setStep(2);
}
function goPage1Back() {
  showPage("page1");
  setStep(1);
}
function goPage2Back() {
  showPage("page2");
  setStep(2);
}

// code old
// function diagnosa() {
//   if (selectedGejala.size === 0) {
//     document.getElementById("warn2").classList.add("show");
//     return;
//   }
//   document.getElementById("warn2").classList.remove("show");
//   let hasil = "RINGAN";
//   for (const rule of RULES) {
//     if (rule.conditions.every((c) => selectedGejala.has(c))) {
//       hasil = rule.result;
//       break;
//     }
//   }
//   const cnt = selectedGejala.size;
//   if (cnt >= 14) hasil = "BERAT";
//   else if (cnt >= 7 && hasil !== "BERAT") hasil = "SEDANG";
//   renderHasil(hasil, Array.from(selectedGejala));
//   showPage("page3");
//   setStep(3);
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }

// code new
function diagnosa() {
  if (selectedGejala.size === 0) {
    document.getElementById("warn2").classList.add("show");
    return;
  }
  document.getElementById("warn2").classList.remove("show");

  // Forward Chaining murni — rule yang terpenuhi pertama = hasil
  let hasil = "RINGAN"; // default jika tidak ada rule yang cocok
  for (const rule of RULES) {
    if (rule.conditions.every((c) => selectedGejala.has(c))) {
      hasil = rule.result;
      break;
    }
  }

  renderHasil(hasil, Array.from(selectedGejala));
  showPage("page3");
  setStep(3);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHasil(level, gejalaArr) {
  const data = HASIL_DATA[level];
  const hero = document.getElementById("hasilHero");
  hero.className = "hasil-hero " + data.level;
  document.getElementById("hasilIcon").textContent = data.icon;
  document.getElementById("hasilTitle").textContent = data.title;
  document.getElementById("hasilSubtitle").textContent = data.subtitle;

  document.getElementById("userInfoRow").innerHTML = `
    <div class="info-chip"><span>Nama</span>${userData.nama}</div>
    <div class="info-chip"><span>NIM / NPM</span>${userData.nim}</div>
    <div class="info-chip"><span>Usia</span>${userData.usia} tahun</div>
    <div class="info-chip"><span>Jenis Kelamin</span>${userData.jk}</div>
    <div class="info-chip"><span>Program Studi</span>${userData.prodi}</div>
    <div class="info-chip"><span>Semester</span>Semester ${userData.semester}</div>`;

  const mf = document.getElementById("meterFill");
  mf.className = "meter-fill " + data.level;
  setTimeout(() => {
    mf.style.width = data.pct + "%";
  }, 200);
  document.getElementById("meterPct").textContent = data.pct + "%";
  document.getElementById("meterDesc").textContent = data.desc;

  document.getElementById("gejalaCnt").textContent = gejalaArr.length;
  document.getElementById("gejalaTags").innerHTML = gejalaArr
    .map((g) => `<span class="gejala-tag">${g}: ${GEJALA_INFO[g] || g}</span>`)
    .join("");

  document.getElementById("rekomendasiList").innerHTML = data.rekomendasi
    .map((r) => `<li>${r}</li>`)
    .join("");

  // Prep print metadata
  const now = new Date();
  const tgl = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const jam = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const docId =
    "SPG-" +
    now.getFullYear() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    "-" +
    Math.floor(Math.random() * 9000 + 1000);
  document.getElementById("printDate").textContent = tgl + " — " + jam + " WIB";
  document.getElementById("printDocId").textContent = "No. Dokumen: " + docId;
  document.getElementById("printFooterRight").textContent = "Dicetak: " + tgl;
}

function cetakHasil() {
  window.print();
}

function showPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function setStep(n) {
  [1, 2, 3].forEach((i) => {
    const s = document.getElementById("s" + i);
    s.classList.remove("active", "done");
    if (i < n) s.classList.add("done");
    else if (i === n) s.classList.add("active");
  });
  [1, 2].forEach((i) =>
    document.getElementById("l" + i).classList.toggle("done", i < n),
  );
}
function restart() {
  resetGejala();
  ["nama", "nim", "usia", "prodi"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  document.getElementById("jk").value = "";
  document.getElementById("semester").value = "";
  userData = {};
  showPage("page1");
  setStep(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
