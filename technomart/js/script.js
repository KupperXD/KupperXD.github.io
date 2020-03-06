var link = document.querySelector(".contacts-company .button");
var popup = document.querySelector(".modal-main-communication");
var close = document.querySelector(".modal-main-communication .close-modal-button");
var form = popup.querySelector("form");
var username = popup.querySelector("[name=user-name]");
var email = popup.querySelector("[name=user-email]");
var linkMap = document.querySelector(".map-link");
var popupMap = document.querySelector(".modal-full-map");
var closeMap = document.querySelector(".modal-full-map .close-modal-button");

var isStorageSupport = true;
var storage = "";

try {
	storage = localStorage.getItem("username");
} catch (err) {
	isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
	evt.preventDefault();
 	popup.classList.add("modal-active");

 	if(storage) {
 		username.value = storage;
 		email.focus();
 	} else {
 		username.focus();
 	}

 });

close.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.remove("modal-active");
	popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
	if (!username.value || !email.value) {
		evt.preventDefault();
		popup.classList.remove("modal-error");
		popup.offsetWidth = popup.offsetWidth;
		popup.classList.add("modal-error");
	} else {
		if (isStorageSupport) {
		localStorage.setItem("username", username.value);
		}
	}
});

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (popup.classList.contains("modal-active") || popupMap.classList.contains("modal-active")) {
			popup.classList.remove("modal-active");
			popup.classList.remove("modal-error");
			popupMap.classList.remove("modal-active");
		}
	}	
});

linkMap.addEventListener("click", function (evt) {
	evt.preventDefault();
 	popupMap.classList.add("modal-active");
 });

closeMap.addEventListener("click", function (evt) {
	evt.preventDefault();
	popupMap.classList.remove("modal-active");
});
