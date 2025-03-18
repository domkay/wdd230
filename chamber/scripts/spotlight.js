const businesses = [
  {
    name: "Business A",
    description: "Description of Business A",
    image: "images/business_a.jpg",
  },
  {
    name: "Business B",
    description: "Description of Business B",
    image: "images/business_b.jpg",
  },
  {
    name: "Business C",
    description: "Description of Business C",
    image: "images/business_c.jpg",
  },
];

const spotlightContainer = document.getElementById("spotlight-container");
spotlightContainer.innerHTML = businesses
  .map(
    (business) => `
    <div class="spotlight-item">
        <img src="${business.image}" alt="${business.name}">
        <h4>${business.name}</h4>
        <p>${business.description}</p>
    </div>
`
  )
  .join("");
