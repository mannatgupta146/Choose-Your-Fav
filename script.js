let customOptions = [];

function addOption() {
  const input = document.getElementById("newOption");
  const optionText = input.value.trim();

  if (!optionText) {
    alert("Option cannot be empty!");
    return;
  }

  if (customOptions.some((option) => option.text === optionText)) {
    alert("Option already exists!");
    return;
  }

  const newOption = { id: `option${customOptions.length + 1}`, text: optionText, votes: 0 };
  customOptions.push(newOption);

  const optionList = document.getElementById("optionList");
  const optionItem = document.createElement("div");
  optionItem.textContent = optionText;
  optionItem.className = "option-item";  // No padding now, just cursor pointer
  optionList.appendChild(optionItem);

  input.value = "";
  document.getElementById("createPollButton").disabled = false;
}

function createPoll() {
  if (customOptions.length < 2) {
    alert("Please add at least two options.");
    return;
  }

  const pollDiv = document.getElementById("poll");
  const pollOptions = document.getElementById("pollOptions");
  pollOptions.innerHTML = "";

  customOptions.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option";
    optionDiv.innerHTML = `
      <input type="radio" id="${option.id}" name="poll" value="${option.id}" />
      <label for="${option.id}">${option.text}</label>
    `;
    pollOptions.appendChild(optionDiv);
  });

  pollDiv.style.display = "block";
  document.getElementById("optionList").style.display = "none";
  document.querySelector(".poll-creator").style.display = "none";
  document.getElementById("createPollButton").style.display = "none";
}

function submitVote() {
  const selectedOption = document.querySelector('input[name="poll"]:checked');

  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }

  const optionId = selectedOption.value;
  const selectedOptionObj = customOptions.find((option) => option.id === optionId);

  if (selectedOptionObj) {
    selectedOptionObj.votes++;
    displayResult();
  }
}

function displayResult() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  customOptions.forEach((option) => {
    const percentage = ((option.votes / getTotalVotes()) * 100).toFixed(2) || 0;
    const barWidth = percentage > 0 ? `${percentage}%` : "0%";

    const optionResult = document.createElement("div");
    optionResult.className = "option-result";
    optionResult.innerHTML = `
      <span class="option-text">${option.text}</span>
      <div class="bar-container">
        <div class="bar" style="width: ${barWidth};"></div>
      </div>
      <span class="percentage">${percentage}%</span>
    `;
    resultDiv.appendChild(optionResult);
  });
}

function getTotalVotes() {
  return customOptions.reduce((total, option) => total + option.votes, 0);
}
