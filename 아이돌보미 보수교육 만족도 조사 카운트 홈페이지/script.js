const counts = {
  "매우 그렇지 않다": 0,
  "그렇지 않다": 0,
  "보통": 0,
  "그렇다": 0,
  "매우 그렇다": 0
};

const ageCounts = {
  "20대": 0,
  "30대": 0,
  "40대": 0,
  "50대": 0,
  "60대": 0,
  "70대 이상": 0
};

const experienceCounts = {
  "1년 미만": 0,
  "1년~3년 미만": 0,
  "3년~6년 미만": 0,
  "6년~9년 미만": 0,
  "9년 이상": 0
};

let opinions = [];
let difficulties = [];

document.addEventListener("DOMContentLoaded", function() {
  // 모든 라디오 버튼에 클릭 이벤트 추가
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(radio => {
      radio.addEventListener("click", function() {
          if (this.previous) {
              this.checked = false;
              this.previous = false;
          } else {
              this.previous = true;
          }
      });
  });
});

function addResponse() {
  // 연령대 카운트
  const ageGroupRadios = document.getElementsByName("age-group");
  ageGroupRadios.forEach(radio => {
      if (radio.checked) {
          ageCounts[radio.value]++;
      }
  });

  // 경력 카운트
  const experienceRadios = document.getElementsByName("experience");
  experienceRadios.forEach(radio => {
      if (radio.checked) {
          experienceCounts[radio.value]++;
      }
  });

  // 설문 항목 카운트
  const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14"];
  questions.forEach(q => {
      const radios = document.getElementsByName(q);
      radios.forEach(radio => {
          if (radio.checked) {
              counts[radio.value]++;
          }
      });
  });

  // 기타 의견 및 고충 추가
  const opinion = document.getElementById("opinion").value;
  if (opinion) {
      opinions.push(opinion);
      document.getElementById("opinion").value = "";
  }

  const difficulty = document.getElementById("difficulty").value;
  if (difficulty) {
      difficulties.push(difficulty);
      document.getElementById("difficulty").value = "";
  }

  updateCounts();
}

function updateCounts() {
  // 연령대 결과 업데이트
  document.getElementById("age-group-results").innerHTML = Object.keys(ageCounts).map(age => `<li>${age}: ${ageCounts[age]}</li>`).join("");

  // 경력 결과 업데이트
  document.getElementById("experience-results").innerHTML = Object.keys(experienceCounts).map(exp => `<li>${exp}: ${experienceCounts[exp]}</li>`).join("");

  // 설문 항목 결과 업데이트
  document.getElementById("very-unsatisfied-count").textContent = counts["매우 그렇지 않다"];
  document.getElementById("unsatisfied-count").textContent = counts["그렇지 않다"];
  document.getElementById("neutral-count").textContent = counts["보통"];
  document.getElementById("satisfied-count").textContent = counts["그렇다"];
  document.getElementById("very-satisfied-count").textContent = counts["매우 그렇다"];

  // 기타 의견 및 고충 업데이트
  document.getElementById("opinion-results").innerHTML = opinions.map(opinion => `<li>${opinion}</li>`).join("");
  document.getElementById("difficulty-results").innerHTML = difficulties.map(difficulty => `<li>${difficulty}</li>`).join("");
}
