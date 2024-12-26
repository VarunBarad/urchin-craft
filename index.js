const handleBaseUrlInput = () => {
	const baseUrl = document.getElementById("base-url").value.trim();

	if (baseUrl) {
		populateFields();
	} else {
		clearFields();
	}
}

const populateFields = () => {
	const baseUrl = document.getElementById("base-url").value.trim();
	if (!baseUrl) return;

	try {
		const url = new URL(baseUrl);

		// Get existing UTM values and populate fields if they exist
		document.getElementById("utm_campaign").value = url.searchParams.get("utm_campaign") || "";
		document.getElementById("utm_source").value = url.searchParams.get("utm_source") || "";
		document.getElementById("utm_medium").value = url.searchParams.get("utm_medium") || "";
		document.getElementById("utm_term").value = url.searchParams.get("utm_term") || "";
		document.getElementById("utm_content").value = url.searchParams.get("utm_content") || "";

		// Update the result URL display
		updateURL();
	} catch (e) {
		document.getElementById("result").innerText = "Please enter a valid URL.";
	}
}

const updateURL = () => {
	const baseUrl = document.getElementById("base-url").value.trim();
	const utmParams = {
		utm_campaign: document.getElementById("utm_campaign").value.trim(),
		utm_source: document.getElementById("utm_source").value.trim(),
		utm_medium: document.getElementById("utm_medium").value.trim(),
		utm_term: document.getElementById("utm_term").value.trim(),
		utm_content: document.getElementById("utm_content").value.trim()
	};

	if (!baseUrl) {
		document.getElementById("result").innerText = "Please enter a base URL.";
		return;
	}

	const url = new URL(baseUrl);
	Object.keys(utmParams).forEach(key => {
		if (utmParams[key]) {
			url.searchParams.set(key, utmParams[key]);
		} else {
			url.searchParams.delete(key); // Remove the parameter if empty
		}
	});

	document.getElementById("result").innerText = url.toString();
}

const copyURL = (event) => {
	event.preventDefault();

	const resultText = document.getElementById("result").innerText;
	if (resultText) {
		navigator.clipboard.writeText(resultText)
			.then(() => showMessage("URL copied to clipboard!", "success"))
			.catch(() => showMessage("Failed to copy URL. Please try again.", "error"));
	}
};

const showMessage = (message, type) => {
	const statusMessage = document.getElementById("status-message");
	statusMessage.innerText = message;
	statusMessage.className = type; // Apply "success" or "error" class
	statusMessage.style.visibility = 'visible';
	statusMessage.style.opacity = '1';

	setTimeout(() => {
		statusMessage.style.visibility = 'hidden';
		statusMessage.style.opacity = '0';
	}, 2000);
};

const clearFields = () => {
	document.getElementById("utm_campaign").value = "";
	document.getElementById("utm_source").value = "";
	document.getElementById("utm_medium").value = "";
	document.getElementById("utm_term").value = "";
	document.getElementById("utm_content").value = "";
	document.getElementById("result").innerText = "";
};

const main = () => {
	document.getElementById('base-url').addEventListener('input', handleBaseUrlInput);
	document.getElementById('utm_campaign').addEventListener('input', updateURL);
	document.getElementById('utm_source').addEventListener('input', updateURL);
	document.getElementById('utm_medium').addEventListener('input', updateURL);
	document.getElementById('utm_term').addEventListener('input', updateURL);
	document.getElementById('utm_content').addEventListener('input', updateURL);
	document.getElementById('url-form').addEventListener('submit', copyURL);
};
window.addEventListener('load', main);
