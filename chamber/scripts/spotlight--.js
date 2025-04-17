// Function to fetch and display spotlight members
async function fetchSpotlightMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const spotlightContainer = document.getElementById("spotlight-container");

    if (!data || data.length === 0) {
      console.error("No member data found.");
      return; // Just return without showing any message
    }

    const eligibleMembers = data.filter(
      (member) => member.membershipLevel === 2 || member.membershipLevel === 3
    );

    if (eligibleMembers.length === 0) {
      return; // Just return without showing any message
    }

    // Select 3 random eligible members
    const spotlightMembers = [];
    while (spotlightMembers.length < 3 && eligibleMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
      spotlightMembers.push(eligibleMembers.splice(randomIndex, 1)[0]);
    }

    // Clear the container (which is already empty)
    spotlightContainer.innerHTML = "";

    // Create and append the member cards
    spotlightMembers.forEach((member) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2 class="act-title">${member.name}</h2>
        <figure class="act-image">
          <img src="images/${member.image}" alt="${member.name}" width="100" height="100" loading="lazy"
               onerror="this.src='images/missing.png'">
        </figure>
        <address class="act-address">${member.address}</address>
        <p class="act-description">${member.description}</p>
        <button>Learn More...</button>
      `;

      const button = card.querySelector("button");
      button.addEventListener("click", () => {
        window.open(member.website, "_blank");
      });

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading spotlight members:", error);
    // Don't show any error message in the UI
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", fetchSpotlightMembers);