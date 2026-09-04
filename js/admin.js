import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const isAdmin = localStorage.getItem("isAdmin") === "true";
if (!isAdmin) {
  alert("Access denied");
  location.href = "feedback.html";
}

async function renderReviews() {
  const snapshot = await getDocs(collection(db, "reviews"));
  const reviewsDiv = document.getElementById("reviews");
  reviewsDiv.innerHTML = "";

  snapshot.forEach(docSnap => {
    const r = docSnap.data();

    const div = document.createElement("div");
    div.className = "review";

    div.innerHTML = `
      <input type="checkbox" class="review-check" data-id="${docSnap.id}">
      <b>${r.name}</b><br>
      ⭐ ${r.rating}<br>
      ${r.text}
    `;

    reviewsDiv.appendChild(div);
  });

  document.getElementById("delete-selected").style.display = "inline-block";
}

document.getElementById("delete-selected").onclick = async () => {
  const checked = document.querySelectorAll(".review-check:checked");

  if (checked.length === 0) {
    alert("IchizaIčizaϑat vibor načuj.");
    return;
  }

  if (!confirm(`Udalit ${checked.length} отзыв(-en)?`)) return;

  for (const cb of checked) {
    await deleteDoc(doc(db, "reviews", cb.dataset.id));
  }

  renderReviews();
};

renderReviews();

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("isAdmin");
    alert("Naẋtêyê az admin režimo?");
    location.href = "feedback.html"; 
  };
}
const selectAllBtn = document.getElementById("select-all");

if (selectAllBtn) {
  selectAllBtn.onclick = () => {
    const checkboxes = document.querySelectorAll(".review-check");

    const allChecked = [...checkboxes].every(cb => cb.checked);

    checkboxes.forEach(cb => {
      cb.checked = !allChecked;
    });

    selectAllBtn.textContent = allChecked
      ? "☑ Fukaϑ vibor čido"
      : "☐ Videlenien δar čido ";
  };
}
