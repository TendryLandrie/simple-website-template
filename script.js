const form = document.getElementById("activity-form");
const tbody = document.querySelector("#activity-table tbody");
const totalTodaySpan = document.getElementById("total-today");

let activities = JSON.parse(localStorage.getItem("activities") || "[]");

function save() {
  localStorage.setItem("activities", JSON.stringify(activities));
}

function render() {
  tbody.innerHTML = "";
  const today = new Date().toISOString().slice(0, 10);
  let totalToday = 0;

  activities.forEach((act, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${act.date}</td>
      <td>${act.title}</td>
      <td>${act.minutes}</td>
      <td><button class="delete" data-index="${index}">X</button></td>
    `;
    tbody.appendChild(tr);
    if (act.date === today) totalToday += act.minutes;
  });

  totalTodaySpan.textContent = totalToday;

  document.querySelectorAll(".delete").forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.dataset.index);
      activities.splice(i, 1);
      save();
      render();
    };
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const minutes = Number(document.getElementById("minutes").value);
  const date = document.getElementById("date").value;

  activities.push({ title, minutes, date });
  save();
  render();
  form.reset();
});

render();
