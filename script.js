// تفعيل الوضع الليلي تلقائياً
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}

// الأسئلة
const questions = [
  {
    id: 1,
    text: "ما نوع العطر الذي تفضل؟",
    subtext: "اختر الفئة المناسبة لك",
    choices: [
      { text: "عطر نسائي 👩", points: { feminine: 3 } },
      { text: "عطر رجالي 👨", points: { masculine: 3 } },
      { text: "مشترك للجنسين ⚧️", points: { neutral: 2 } }
    ]
  },
  {
    id: 2,
    text: "ما المناسبة التي تريد العطر لأجلها؟",
    subtext: "كل مناسبة لها طابع مميز",
    choices: [
      { text: "عمل واجتماعات 💼", points: { professional: 3, light: 2 } },
      { text: "حفلات ومناسبات 🎉", points: { luxury: 3, strong: 2 } },
      { text: "الاستخدام اليومي 🌅", points: { casual: 3, moderate: 2 } },
      { text: "موعد رومانسي 💕", points: { romantic: 3, sweet: 2 } }
    ]
  },
  {
    id: 3,
    text: "أي نوع من الروائح تفضل؟",
    subtext: "اختر أقرب نوع لذوقك",
    choices: [
      { text: "حارة (عود، فانيليا، قرفة) 🔥", points: { warm: 3, spicy: 2 } },
      { text: "منعشة (ليمون، نعناع، بحر) ❄️", points: { fresh: 3, citrus: 2 } },
      { text: "زهور وأعشاب 🌸", points: { floral: 3, balanced: 2 } }
    ]
  }
];

// قائمة عطور عالمية (20 مثال)
const perfumes = [
  { name: "Chanel No.5", category: "أنثوي كلاسيكي", description: "أيقونة العطور الفرنسية.", points: { feminine:3, floral:3, luxury:2 } },
  { name: "Dior Sauvage", category: "رجالي منعش", description: "رجالي عصري قوي.", points: { masculine:3, fresh:3, strong:2 } },
  { name: "Gucci Bloom", category: "زهري ناعم", description: "زهور إيطالية عصرية.", points: { feminine:3, floral:3, soft:2 } },
  { name: "YSL Black Opium", category: "أنثوي عصري", description: "قهوة وفانيليا.", points: { feminine:3, warm:2, sweet:2 } },
  { name: "Tom Ford Oud Wood", category: "شرقي فاخر", description: "عود فاخر وعمق.", points: { luxury:3, warm:3, masculine:2 } },
  { name: "Armani Code", category: "رجالي أنيق", description: "رجولة وأناقة.", points: { masculine:3, confident:2 } },
  { name: "Versace Eros", category: "رجالي منعش", description: "انتعاش البحر والليمون.", points: { masculine:3, fresh:2, citrus:2 } },
  { name: "Jean Paul Gaultier Le Male", category: "رجالي كلاسيكي", description: "نعناع وفانيليا.", points: { masculine:3, sweet:2 } },
  { name: "Dolce & Gabbana Light Blue", category: "منعش للجنسين", description: "ليمون وزهور صيفية.", points: { neutral:3, fresh:2, citrus:2 } },
  { name: "Lancôme La Vie Est Belle", category: "أنثوي أنيق", description: "فانيليا وزهور.", points: { feminine:3, sweet:3 } },
  { name: "Creed Aventus", category: "رجالي فاخر", description: "أناناس وخشب.", points: { masculine:3, confident:3, luxury:2 } },
  { name: "Prada L'Homme", category: "رجالي ناعم", description: "أيريس وبودرة.", points: { masculine:3, soft:2 } },
  { name: "Hermès Terre d’Hermès", category: "رجالي خشبي", description: "برتقال وخشب.", points: { masculine:3, citrus:2, woody:2 } },
  { name: "Chanel Coco Mademoiselle", category: "أنثوي زهري", description: "أزهار مع لمسة عصرية.", points: { feminine:3, floral:3 } },
  { name: "Dior J'adore", category: "أنثوي زهري", description: "ياسمين وورد.", points: { feminine:3, floral:2 } },
  { name: "Paco Rabanne 1 Million", category: "رجالي فاخر", description: "جلد وتوابل.", points: { masculine:3, strong:2, warm:2 } },
  { name: "Givenchy Gentleman", category: "رجالي أنيق", description: "إيريس وأخشاب.", points: { masculine:3, confident:2 } },
  { name: "Mugler Alien", category: "أنثوي قوي", description: "ياسمين وعنبر.", points: { feminine:3, strong:2 } },
  { name: "Jo Malone Peony & Blush Suede", category: "زهري ناعم", description: "فاوانيا وتفاح.", points: { feminine:3, floral:2, neutral:2 } },
  { name: "Maison Francis Kurkdjian Baccarat Rouge 540", category: "فاخر للجنسين", description: "عنبر وخشب.", points: { luxury:3, neutral:2, strong:2 } }
];

let currentQuestion = 0;
let userPoints = {};

function startQuiz() {
  document.getElementById('welcomeScreen').classList.add('hidden');
  document.getElementById('quizContainer').classList.remove('hidden');
  showQuestion(0);
}

function showQuestion(index) {
  const q = questions[index];
  document.getElementById('questionNumber').textContent = `السؤال ${index+1} من ${questions.length}`;
  document.getElementById('questionText').textContent = q.text;
  document.getElementById('questionSubtext').textContent = q.subtext;

  const container = document.getElementById('choicesContainer');
  container.innerHTML = '';
  q.choices.forEach(choice => {
    let btn = document.createElement('button');
    btn.className = "choice-btn bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl text-lg w-full";
    btn.textContent = choice.text;
    btn.onclick = () => selectChoice(choice.points);
    container.appendChild(btn);
  });
}

function selectChoice(points) {
  for (const [k,v] of Object.entries(points)) {
    userPoints[k] = (userPoints[k] || 0) + v;
  }
  if (currentQuestion < questions.length-1) {
    currentQuestion++;
    showQuestion(currentQuestion);
    updateProgress();
  } else {
    showResults();
  }
}

function updateProgress() {
  const progress = ((currentQuestion+1)/questions.length)*100;
  document.getElementById('progressBar').style.width = progress+'%';
}

function showResults() {
  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('resultsScreen').classList.remove('hidden');

  // احسب أفضل 3 عطور
  let ranked = perfumes.map(p => {
    let score=0;
    for (const [k,v] of Object.entries(p.points)) {
      if (userPoints[k]) score += userPoints[k]*v;
    }
    return {...p, score};
  }).sort((a,b)=>b.score-a.score).slice(0,3);

  const topDiv = document.getElementById('topPerfumes');
  topDiv.innerHTML='';
  ranked.forEach(p=>{
    topDiv.innerHTML += `<div class="bg-white/20 p-4 rounded-xl"><h4 class="text-2xl font-bold">${p.name}</h4><p class="opacity-80">${p.category}</p><p class="mt-2">${p.description}</p></div>`;
  });

  const blend = document.getElementById('blendContainer');
  blend.innerHTML='';
  ranked.forEach((p,i)=>{
    blend.innerHTML += `
      <div>
        <label class="font-bold text-gray-700 dark:text-gray-200">${p.name}</label>
        <input type="range" id="blend${i}" min="0" max="100" value="${i===0?60:20}" class="w-full accent-primary">
      </div>`;
  });
  document.getElementById('progressBar').style.width='100%';
}

function generateBlend() {
  let sliders = document.querySelectorAll('[id^=blend]');
  let total=0; sliders.forEach(s=> total+=parseInt(s.value));
  let result=[];
  sliders.forEach(s=>{
    let percent = Math.round(parseInt(s.value)/total*100);
    let name = s.previousElementSibling.textContent;
    result.push(`${percent}% ${name}`);
  });
  document.getElementById('blendResult').textContent = "🔅 توليفتك الخاصة: "+result.join(" + ");
}

function restartQuiz() {
  currentQuestion=0; userPoints={};
  document.getElementById('resultsScreen').classList.add('hidden');
  document.getElementById('welcomeScreen').classList.remove('hidden');
  document.getElementById('progressBar').style.width='0%';
}
