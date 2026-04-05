// GC-3: Add Subject & Marks Input Feature

let subjects = [];
let counter = 1;

document.getElementById("addBtn").addEventListener("click", addSubject);

function addSubject() {
  const subjectInput = document.getElementById("subjectInput");
  const marksInput = document.getElementById("marksInput");

  const subject = subjectInput.value.trim();
  const marks = parseInt(marksInput.value);

  if (subject === "") {
    alert("⚠️ Please enter a subject name!");
    return;
  }

  if (isNaN(marks) || marks < 0 || marks > 100) {
    alert("⚠️ Please enter valid marks between 0 and 100!");
    return;
  }

  const grade = getGrade(marks);

  subjects.push({ id: counter, subject, marks, grade });

  const tbody = document.getElementById("tableBody");
  const row = document.createElement("tr");
  row.id = `row-${counter}`;
  row.innerHTML = `
    <td>${counter}</td>
    <td>${subject}</td>
    <td>${marks}</td>
    <td class="grade-${grade[0]}">${grade}</td>
    <td><button onclick="deleteSubject(${counter})">Remove</button></td>
  `;
  tbody.appendChild(row);

  subjectInput.value = "";
  marksInput.value = "";
  subjectInput.focus();
  counter++;

  document.getElementById("result").style.display = "none";
}

function getGrade(marks) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}
// GC-4: Calculate Grade & GPA Feature

document.getElementById("calculateBtn").addEventListener("click", calculateGPA);
document.getElementById("clearBtn").addEventListener("click", clearAll);

function calculateGPA() {
  if (subjects.length === 0) {
    alert("⚠️ Please add at least one subject!");
    return;
  }

  const total = subjects.reduce((sum, s) => sum + s.marks, 0);
  const average = (total / subjects.length).toFixed(2);
  const overallGrade = getGrade(average);

  let gpa = 0;
  if (average >= 90) gpa = 4.0;
  else if (average >= 80) gpa = 3.5;
  else if (average >= 70) gpa = 3.0;
  else if (average >= 60) gpa = 2.5;
  else if (average >= 50) gpa = 2.0;
  else gpa = 0.0;

  const result = document.getElementById("result");
  result.style.display = "block";
  result.innerHTML = `
    📊 Total Subjects: ${subjects.length} |
    📈 Average Marks: ${average}% |
    🎓 Overall Grade: ${overallGrade} |
    ⭐ GPA: ${gpa}
  `;
}

function deleteSubject(id) {
  subjects = subjects.filter(s => s.id !== id);
  const row = document.getElementById(`row-${id}`);
  if (row) row.remove();
  document.getElementById("result").style.display = "none";
}

function clearAll() {
  subjects = [];
  counter = 1;
  document.getElementById("tableBody").innerHTML = "";
  document.getElementById("result").style.display = "none";
}