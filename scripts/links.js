// Configuration
const baseURL = "https://domkay.github.io/wdd230/";
const linksURL = "data/links.json";

// DOM Element
const activitiesList = document.getElementById('learning-activities');

// Main function to fetch and display links
async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) throw new Error("Network response was not OK");
        const data = await response.json();
        displayLinks(data.weeks);
    } catch (error) {
        console.error('Error fetching links:', error);
        activitiesList.innerHTML = '<li>Error loading learning activities. Please try again later.</li>';
    }
}

// Function to display links
function displayLinks(weeks) {
    weeks.forEach(week => {
        // Create week list item
        const weekItem = document.createElement('li');
        
        // Create week heading text
        const weekText = document.createTextNode(`${week.week}: `);
        weekItem.appendChild(weekText);
        
        // Process each link
        week.links.forEach((link, index) => {
            // Create link element
            const linkElement = document.createElement('a');
            linkElement.href = link.url.startsWith('http') ? link.url : baseURL + link.url;
            linkElement.textContent = link.title;
            linkElement.target = link.url.startsWith('http') ? '_blank' : '_self';
            
            // Add to week item
            weekItem.appendChild(linkElement);
            
            // Add separator if not last link
            if (index < week.links.length - 1) {
                weekItem.appendChild(document.createTextNode(' | '));
            }
        });
        
        // Add week to list
        activitiesList.appendChild(weekItem);
    });
}

// Initialize
getLinks();