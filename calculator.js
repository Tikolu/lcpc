const subjectList = document.getElementById("subject-list");
const subjectSelect = document.getElementById("subject-select");
const subjectIDs = [];

const counter = document.getElementById("points-counter");

var chosenSubjects = JSON.parse(localStorage.getItem("cao_subjects") || "{}");
var currentPoints = {};
var totalPoints = 0;

const saveData = () => localStorage.setItem("cao_subjects", JSON.stringify(chosenSubjects));

const id = text => text.toLowerCase().replaceAll("&", "and").replaceAll(" ", "");

const calculatePoints = () => {
	let array = [];
	for(subject in currentPoints) array.push([subject, currentPoints[subject]]);
	array = array.sort((a, b) => b[1] - a[1]).filter((s, i) => i < 6);
	totalPoints = array.reduce((p, c) => p + c[1], 0);
	for(subject in currentPoints) {
		let pointCounter = document.querySelector(`#${subject} .subject-points`);
		pointCounter.classList.toggle("inactive", !array.find(s => s[0] == subject));
	}
	if(!counter.interval) {
		counter.innerText = totalPoints || "";
		counter.interval = setInterval(() => {
			if(!chosenSubjects || Object.keys(chosenSubjects).length == 0) counter.innerText = "";
			else {
				if(totalPoints > counter.innerText) counter.innerText++;
				if(totalPoints < counter.innerText) counter.innerText--;
			}
		}, 10);
	}
}

const pointsString = p => `${p == 0 ? "" : "+"}${p} points`;

const renderSubjectList = () => {
	saveData();
	subjectList.innerHTML = "";
	currentPoints = {};
	for(subject in chosenSubjects) {
		let subjectData = subjects[subjectIDs.indexOf(subject)];
		let customSubject = false;
		if(!subjectData) {
			subjectData = [subject, 2];
			customSubject = true;
		}
		currentPoints[subject] = points[chosenSubjects[subject]];
		if(subject == "maths" && chosenSubjects[subject].startsWith("h") && chosenSubjects[subject][1] < 7) currentPoints[subject] += 25;
		let element = document.createElement("div");
		element.id = subject;
		if(newSubject && newSubject == subject) {
			element.classList.add("new");
			newSubject = "";
		}
		let html = `
			<button class="remove-subject" title="Remove ${customSubject ? "subject" : subjectData[0]}">✕</button>
			<h3>${subjectData[0]}</h3>
			<div class="grade-buttons">
		`;
		if(subjectData[1] == 0) html += `
			<button class="grade${chosenSubjects[subject]=="distinction"?" selected":""}">Distinction</button>
			<button class="grade${chosenSubjects[subject]=="merit"?" selected":""}">Merit</button>
			<button class="grade${chosenSubjects[subject]=="pass"?" selected":""}">Pass</button>
		`;
		else {
			html += Array.from(Array(8)).map((g, i) => `<button class="hl grade${chosenSubjects[subject]=="h"+(i+1)?" selected":""}" title="${percentages[i]}">H${i+1}</button>`).join("") + "<br>";
			if(subjectData[1] == 2) html += Array.from(Array(8)).map((g, i) => `<button class="ol grade${chosenSubjects[subject]=="o"+(i+1)?" selected":""}" title="${percentages[i]}">O${i+1}</button>`).join("");
		}
		html += `</div>`;
		html += `<div class="subject-points">${pointsString(currentPoints[subject])}</div>`;
		element.innerHTML = html;
		subjectList.appendChild(element);
	}
	if(subjectList.childElementCount == 0) {
		subjectList.innerHTML = "<h2><span>Leaving Cert Point Calculator</span><span>by Tikolu</span></h2><h3>To get started, add your subjects below:</h3>"
	}
	calculatePoints();
}

const option = (id, text, selected) => `<option value="${id}"${selected ? " selected" : ""}>${text}</option>`;
subjectSelect.innerHTML = option("none", "", true);
commonSubjects.forEach(subject => {
	subjectSelect.innerHTML += option(subject, subjects.find(s => id(s[0]) == subject)[0]);
});
let group = "<optgroup label=\"All subjects (A-Z)\">";
subjects.forEach(subject => {
	let subjectID = id(subject[0]);
	subjectIDs.push(subjectID);
	group += option(subjectID, subject[0]);
});
group += "</optgroup>";
subjectSelect.innerHTML += group;
subjectSelect.innerHTML += `<optgroup label=\"Other\">${option("other", "Custom subject")}</optgroup>`;
var newSubject = "";
subjectSelect.onchange = () => {
	let selection = subjectSelect.value;
	subjectSelect.blur();
	subjectSelect.value = "";
	if(selection == "other") {
		selection = id(prompt("Enter subject name:"));
		if(!selection) return;
	} else if(!subjectIDs.includes(selection)) return;
	if(chosenSubjects[selection]) return alert(`Subject already selected`);
	chosenSubjects[selection] = (selection == "lcvp" ? "merit" : "h1");
	newSubject = selection;
	renderSubjectList();
}

subjectList.onclick = event => {
	if(event.target.classList.contains("remove-subject")) {
		event.target.parentElement.classList.add("delete");
		delete chosenSubjects[event.target.parentElement.id];
		return setTimeout(renderSubjectList, 500);
	}
	if(event.target.classList.contains("grade")) {
		event.target.parentElement.childNodes.forEach(grade => grade?.classList?.remove("selected"));
		event.target.classList.add("selected");
		let subject = event.target.parentElement.parentElement.id;
		let prevPoints = currentPoints[subject];
		chosenSubjects[subject] = event.target.innerText.toLowerCase();
		currentPoints[subject] = points[chosenSubjects[subject]];
		if(subject == "maths" && chosenSubjects[subject].startsWith("h") && chosenSubjects[subject][1] < 7) currentPoints[subject] += 25;
		calculatePoints();
		if(prevPoints != currentPoints[subject]) {
			let pointCounter = event.target.parentElement.parentElement.children[3];
			pointCounter.classList.add("fade");
			setTimeout(() => {
				pointCounter.innerText = pointsString(currentPoints[subject]);
				pointCounter.classList.remove("fade");
			}, 500);
		}
		navigator.vibrate?.(25);
		return saveData();
	}
}

const resetData = () => {
	let amount = Object.keys(chosenSubjects).length;
	if(amount > 1 && !confirm(`Remove ${amount == 2 ? "both" : `all ${amount}`} subjects?`)) return;
	chosenSubjects = {};
	renderSubjectList();
}

const closeOverlay = () => {
	if(window.history.length <= 2) window.location.href = "#";
	else window.history.back();
}

document.getElementById("grade-table").innerHTML += percentages.reduce((p, c, i) => `
	${p}
	<div>H${i+1}</div>
	<div>${c}</div>
	<div>O${i+1}</div>
`, "");

document.oncontextmenu = event => event.preventDefault();

renderSubjectList();

document.getElementById("error")?.remove();

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments) }
gtag("js", new Date());
gtag("config", "UA-131586815-2");