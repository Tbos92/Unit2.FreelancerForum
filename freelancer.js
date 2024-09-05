// create arrays for various names, occupations, and rates for freelancers
const names = [
  "Alice",
  "Tim",
  "Sarah",
  "Steve",
  "Jenny",
  "Nicole",
  "Andrea",
  "Mike",
  "Bob",
  "Jay",
  "Rich",
  "Samantha",
  "Melinda",
  "Corina",
  "Becca",
  "Carol",
];
const occupations = [
  "Teacher",
  "Web Developer",
  "Android Engineer",
  "Doctor",
  "Chef",
  "Editor",
  "Writer",
  "Copywriter",
  "Legal Aid",
  "Data Analyst",
  "Programmer",
];
const rates = [
  "$30",
  "$35",
  "$45",
  "$50",
  "$55",
  "$65",
  "$70",
  "$80",
];
const maxFreelancers = 15

// set initial freelancers in an object
const Freelancers = [
  { name: "Alice", occupation: "Writer", rate: "$30" },
  { name: "Bob", occupation: "Teacher", rate: "$50" },
];

// Call addFreelancer with setInterval every 4000 miliseconds (4 seconds)
// return an interval ID that can be used to stop the interval later using clearInterval

const addFreelancerIntervalId = setInterval(addFreelancer, 4000);

// Call render function to render the initial state
// added window.onload because otherwise for some reason the initial Freelancers Alice, Bob, and Carol
// would only populate after the 2 second delay along with the 4th freelancer
window.onload = () => {
  render();
};

// Function to convert rate from string to number, removing $
function convertRateToNumber(rate) {
  return parseFloat(rate.replace("$", ""));
}

// Function to calculate average rate with parsed number
function calculateAverageRate(freelancers) {
  const totalRates = freelancers.reduce((sum, freelancer) => {
    return sum + convertRateToNumber(freelancer.rate);
  }, 0);

  return totalRates / freelancers.length;
}

// Function to dynamically update average rate on the HTML page
function updateAverageRate() {
    const averageRateElement = document.querySelector("#averagerate");
    const averageRate = calculateAverageRate(Freelancers);
    averageRateElement.textContent = `$${averageRate.toFixed(2)}`;
}

// Update DOM to reflect the current state
function render() {
  const freelancersTable = document.querySelector("#freelancers tbody");
  // Clear existing rows
  while (freelancersTable.firstChild) {
    freelancersTable.removeChild(freelancersTable.firstChild);
  }
  // Add new rows for new freelancers
  Freelancers.forEach((freelancer) => {
    const row = document.createElement("tr");
    // Add name for freelancer to relevant cell
    const nameCell = document.createElement("td");
    nameCell.textContent = freelancer.name;
    row.appendChild(nameCell);
    // Add occupation for freelancer to relevant cell
    const occupationCell = document.createElement("td");
    occupationCell.textContent = freelancer.occupation;
    row.appendChild(occupationCell);
    // Add rate for freelancer to relevant cell
    const rateCell = document.createElement("td");
    rateCell.textContent = freelancer.rate;
    row.appendChild(rateCell);

    freelancersTable.appendChild(row);
  });
  //   update average rate after rendering
  updateAverageRate();
}

// add a new random freelancer to the initialFreelancers array by picking random name, occupation, and rate
function addFreelancer() {
  const name = names[Math.floor(Math.random() * names.length)];
  const occupation =
    occupations[Math.floor(Math.random() * occupations.length)];
  const rate = rates[Math.floor(Math.random() * rates.length)];

  Freelancers.push({ name, occupation, rate });
  render();

//   stop adding freelancers at maxFreelancer
if (Freelancers.length >= maxFreelancers) {
    clearInterval(addFreelancerIntervalId);
}
}
