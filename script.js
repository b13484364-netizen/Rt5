document.getElementById("perfumeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const gender = form.gender.value;
  const age = form.age.value;
  const personality = form.personality.value;
  const style = form.style.value;
  const occasion = form.occasion.value;

  let recommendations = [];

  // أمثلة مخصصة للسوق الخليجي
  if (gender === "male" && style === "oriental") {
    recommendations.push("عود الماجد الملكي");
    recommendations.push("عبدالصمد القرشي - عطر العود الأزرق");
  }

  if (gender === "female" && style === "western" && occasion === "evening") {
    recommendations.push("YSL Black Opium");
    recommendations.push("Lancôme La Vie Est Belle");
  }

  if (personality === "romantic") {
    recommendations.push("Chanel Chance Eau Tendre");
  }

  if (style === "fresh" && age === "teen") {
    recommendations.push("Davidoff Cool Water");
  }

  if (occasion === "gift") {
    recommendations.push("فابيان - عطر الورد الملكي");
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <h2>🌟 العطور المقترحة لك:</h2>
    <ul>
      ${recommendations.map(name => `<li>${name} + عبوة هدية 🎁</li>`).join("")}
    </ul>
    <p>اختر ما يناسبك، وستحصل على عبوتين من العطر المختار واحدة كهدية!</p>
  `;
});
