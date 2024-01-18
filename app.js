const errorBorder = "2px solid hsl(0, 100%, 67%)";
const correctBorder = "2px solid hsl(259, 100%, 65%)";
const errorColor = "hsl(0, 100%, 67%)";
const correctColor = "hsl(0, 1%, 44%)";
//selecting input group spans
const dayMark = document.querySelector(".day");
const monthMark = document.querySelector(".month");
const yearMark = document.querySelector(".year");
// Selecting all input fields
const dateInput = document.getElementById("date");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
// Selecting all errors
const dayError = document.querySelector(".day-error");
const monthError = document.querySelector(".month-error");
const yearError = document.querySelector(".year-error");
// Selecting output spans
const outputYears = document.querySelector(".years-count");
const outputMonths = document.querySelector(".months-count");
const outputDays = document.querySelector(".days-count");

const currentDate = new Date();

let validDate = false;
let validMonth = false;
let validYear = false;

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const validateDate = () => {
  const inputDate = dateInput.value.trim(); // Trim to handle whitespace
  const inputMonth = monthInput.value;
  const inputYear = yearInput.value;

  if (inputDate === "") {
    dayError.textContent = "This field is required";
    dayMark.style.color = errorColor;
    dateInput.style.border = errorBorder;
    dayError.style.visibility = "visible";
    validDate = false;
  } else if (
    isNaN(inputDate) ||
    inputDate < 1 ||
    inputDate > getMaxDaysInMonth(inputMonth, inputYear, isLeapYear(inputYear))
  ) {
    dayError.textContent = "Invalid day";
    dateInput.style.border = errorBorder;
    dayMark.style.color = errorColor;
    dayError.style.visibility = "visible";
    validDate = false;
  } else {
    dayError.style.visibility = "hidden";
    dateInput.style.border = correctBorder;
    dayMark.style.color = correctColor;
    validDate = true;
  }
};

const validateMonth = () => {
  const inputMonth = monthInput.value;
  if (inputMonth === "") {
    monthError.textContent = "This field is required";
    monthInput.style.border = errorBorder;
    monthMark.style.color = errorColor;
    monthError.style.visibility = "visible";
    validMonth = false;
  } else if (inputMonth < 1 || inputMonth > 12 || isNaN(inputMonth)) {
    monthError.textContent = "Invalid month";
    monthInput.style.border = errorBorder;
    monthMark.style.color = errorColor;
    monthError.style.visibility = "visible";
    validMonth = false;
  } else {
    // Update the max attribute of dateInput based on the selected month
    updateMaxDaysInDateInput(
      inputMonth,
      yearInput.value,
      isLeapYear(yearInput.value)
    );

    monthError.style.visibility = "hidden";
    monthInput.style.border = correctBorder;
    monthMark.style.color = correctColor;
    validMonth = true;
  }
};

const validateYear = () => {
  const inputYear = yearInput.value;
  if (inputYear === "") {
    yearError.textContent = "This field is required";
    yearInput.style.border = errorBorder;
    yearMark.style.color = errorColor;
    yearError.style.visibility = "visible";
    validYear = false;
  } else if (inputYear < currentDate.getFullYear() - 100 || isNaN(inputYear)) {
    yearError.textContent = "Invalid year";
    yearInput.style.border = errorBorder;
    yearMark.style.color = errorColor;
    yearError.style.visibility = "visible";
    validYear = false;
  } else {
    yearError.style.visibility = "hidden";
    yearInput.style.border = correctBorder;
    yearMark.style.color = correctColor;
    validYear = true;
  }
};

const calculateAge = () => {
  if (validDate && validMonth && validYear) {
    const birthDate = new Date(
      yearInput.value,
      monthInput.value - 1,
      dateInput.value
    );

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    // Adjust age calculation if necessary:
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      const prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        0
      );
      ageDays += prevMonth.getDate();
      ageMonths--;
    }
    outputYears.textContent = ageYears;
    outputMonths.textContent = ageMonths;
    outputDays.textContent = ageDays;
  } else {
    // Set placeholders when validation fails
    outputYears.textContent = "- -";
    outputMonths.textContent = "- -";
    outputDays.textContent = "- -";
  }
};

const updateMaxDaysInDateInput = (month, year, isLeap) => {
  // Update the max attribute of dateInput based on the selected month and leap year
  const maxDays = getMaxDaysInMonth(month, year, isLeap);
  // dateInput.setAttribute("max", maxDays);
};

const getMaxDaysInMonth = (month, year, isLeap) => {
  return isLeap && month === 2 ? 29 : new Date(year, month, 0).getDate();
};

// Event listeners for input fields
dateInput.addEventListener("input", () => {
  validateDate();
  calculateAge();
});
monthInput.addEventListener("input", () => {
  validateMonth();
  validateDate(); // Validate date when month changes
  calculateAge();
});
yearInput.addEventListener("input", () => {
  validateYear();
  validateDate(); // Validate date when year changes
  calculateAge();
});
