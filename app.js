import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDwVE37nGf_koRSuOc01wTweaw0paoCyn0",
	authDomain: "market-941b7.firebaseapp.com",
	databaseURL: "https://market-941b7-default-rtdb.firebaseio.com",
	projectId: "market-941b7",
	storageBucket: "market-941b7.firebasestorage.app",
	messagingSenderId: "10597433838",
	appId: "1:10597433838:web:a523cb38473df479a5ceff",
};

// Firebase Başlatma
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListRef = ref(database, "shoppingList");

// HTML Elemanlarını Seç
const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

// Veritabanına Veri Ekle
addButton.addEventListener("click", () => {
	const inputValue = inputField.value.trim();

	if (inputValue) {
		push(shoppingListRef, inputValue);
		inputField.value = ""; // Giriş alanını temizle
	} else {
		alert("Lütfen bir ürün girin!");
	}
});
// Verileri Listele
onValue(shoppingListRef, (snapshot) => {
	shoppingList.innerHTML = ""; // Listeyi temizle
	if (snapshot.exists()) {
		const items = snapshot.val();
		Object.entries(items).forEach(([key, value]) => {
			const listItem = document.createElement("li");
			listItem.textContent = value;

			// Silme Butonu Ekle
			const deleteButton = document.createElement("button");
			deleteButton.textContent = "Sil";
			deleteButton.addEventListener("click", () =>
				remove(ref(database, `shoppingList/${key}`))
			);

			listItem.appendChild(deleteButton);
			shoppingList.appendChild(listItem);
		});
	} else {
		shoppingList.textContent = "Liste boş.";
	}
});
