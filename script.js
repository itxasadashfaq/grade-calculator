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