// New function to populate tabs with restaurant data
function populateTabs(restaurants) {
  const homeTab = document.getElementById("pills-home");
  const profileTab = document.getElementById("pills-profile");
  const contactTab = document.getElementById("pills-contact");

  // Clear existing content
  homeTab.innerHTML = "";
  profileTab.innerHTML = "";
  contactTab.innerHTML = "";

  // Populate home tab with a spinner
  homeTab.textContent = "Spinner";

  // Populate profile tab with restaurant names
  restaurants.forEach((restaurant) => {
    const item = document.createElement("p");
    item.textContent = restaurant;
    profileTab.appendChild(item);
  });

  // Populate contact tab with a random restaurant
  const randomRestaurant = randomize(restaurants); // Assuming randomize returns a random restaurant
  contactTab.textContent = `Random Restaurant: ${randomRestaurant}`;
}

export function randomize(restaurants) {
  const randomRestaurant =
    restaurants[Math.floor(Math.random() * restaurants.length)];
  contactTab.textContent = `Random Restaurant Picked: ${randomRestaurant}`;
  restaurants.forEach((restaurant) => {
    const item = document.createElement("p");
    item.textContent = restaurant;
    contactTab.appendChild(item);
  });
}
