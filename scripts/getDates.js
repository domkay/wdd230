// Get the current year and update the footer
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("currentYear");
if (yearElement) {
  yearElement.textContent = currentYear;
}

// Get the last modified date of the document
const lastModified = document.lastModified;
const lastModifiedElement = document.getElementById("lastModified");

// Ensure the element exists before modifying content
if (lastModifiedElement) {
  lastModifiedElement.textContent = ` Last Modified: ${lastModified}`;
}
