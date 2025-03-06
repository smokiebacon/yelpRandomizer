//Create Spinner
export function initiateSpinner(restaurants) {
  console.log("hiii");
  const wheelContainer = document.createElement("div");
  wheelContainer.id = "wheel-container";
  wheelContainer.style.cssText = `
                            width: 600px;
                            height: 600px;
                            position: relative;
                            margin: 20px auto;
                          `;

  // Create wheel
  const wheel = document.createElement("div");
  wheel.id = "wheel";
  wheel.style.cssText = `
                            width: 100%;
                            height: 100%;
                            position: relative;
                            border-radius: 50%;
                            border: 10px solid #333;
                            transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
                            transform: rotate(0deg);
                            overflow: visible;
                          `;

  // Create segments based on restaurant data
  const numRestaurants = restaurants.length;
  const segmentAngle = 360 / numRestaurants;

  restaurantData.restaurants.forEach((restaurant, index) => {
    const segment = document.createElement("div");
    segment.className = "wheel-segment";

    // Calculate the angles for the clip-path
    const startAngle = index * segmentAngle;
    const endAngle = (index + 1) * segmentAngle;

    // Convert angles to radians and calculate coordinates
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const startX = 50 + 50 * Math.cos(startRad);
    const startY = 50 + 50 * Math.sin(startRad);
    const endX = 50 + 50 * Math.cos(endRad);
    const endY = 50 + 50 * Math.sin(endRad);

    const text = document.createElement("div");
    text.textContent = restaurant;
    text.style.cssText = `
                              position: absolute;
                              left: 50%;
                              top: 50%;
                              transform-origin: center;
                              transform: 
                                rotate(${startAngle + segmentAngle / 10}deg)
                                translateY(-250px)
                                rotate(${-startAngle - segmentAngle / 5}deg);
                              font-size: 14px;
                              font-weight: bold;
                              color: white;
                              text-shadow: 
                                -1px -1px 0 #000,
                                1px -1px 0 #000,
                                -1px 1px 0 #000,
                                1px 1px 0 #000;
                              white-space: nowrap;
                              text-align: center;
                              pointer-events: none;
                              z-index: 10;
                            `;

    // Add a container for better text positioning
    const textContainer = document.createElement("div");
    textContainer.style.cssText = `
                              position: absolute;
                              width: 100%;
                              height: 100%;
                              top: 0;
                              left: 0;
                              z-index: 2;
                            `;
    textContainer.appendChild(text);
    segment.appendChild(textContainer);

    segment.style.cssText = `
                              position: absolute;
                              width: 100%;
                              height: 100%;
                              clip-path: polygon(50% 50%, ${startX}% ${startY}%, ${endX}% ${endY}%);
                              background: hsl(${
                                (index * 360) / numRestaurants
                              }, 70%, 50%);
                            `;

    wheel.appendChild(segment);
  });

  // Create spinner arrow
  const arrow = document.createElement("div");
  arrow.style.cssText = `
                            position: absolute;
                            top: -30px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 0;
                            height: 0;
                            border-left: 20px solid transparent;
                            border-right: 20px solid transparent;
                            border-top: 40px solid #333;
                            z-index: 2;
                          `;

  // Create spin button
  const spinButton = document.createElement("button");
  spinButton.textContent = "SPIN!";
  spinButton.style.cssText = `
                            display: block;
                            margin: 20px auto;
                            padding: 15px 30px;
                            font-size: 24px;
                            font-weight: bold;
                            background: #e74c3c;
                            color: white;
                            border: none;
                            border-radius: 25px;
                            cursor: pointer;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            transition: all 0.3s ease;
                            z-index: 3;
                          `;

  // Add hover effect
  spinButton.addEventListener("mouseover", () => {
    spinButton.style.transform = "scale(1.05)";
    spinButton.style.background = "#c0392b";
  });

  spinButton.addEventListener("mouseout", () => {
    spinButton.style.transform = "scale(1)";
    spinButton.style.background = "#e74c3c";
  });

  // Add active effect
  spinButton.addEventListener("mousedown", () => {
    spinButton.style.transform = "scale(0.95)";
  });

  spinButton.addEventListener("click", () => {
    const spins = 5; // Number of full rotations
    const randomDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = spins * 360 + randomDegrees;

    wheel.style.transform = `rotate(${totalDegrees}deg)`;

    // Calculate winning restaurant after spin
    setTimeout(() => {
      const normalizedDegree = 360 - (totalDegrees % 360);
      const winningIndex = Math.floor(normalizedDegree / segmentAngle);
      const winner = restaurantData.restaurants[winningIndex];
      alert(`You should eat at: ${winner}!`);
    }, 4000);
  });

  // Remove existing wheel if present
  const existingWheel = document.getElementById("wheel-container");
  if (existingWheel) {
    existingWheel.remove();
  }

  // Assemble and append wheel
  wheelContainer.appendChild(wheel);
  wheelContainer.appendChild(arrow);
  document.querySelector(".column").appendChild(wheelContainer);
  document.querySelector(".column").appendChild(spinButton);
  // Create and display restaurant list
  const restaurantList = document.createElement("div");
  restaurantList.id = "restaurant-list";

  restaurantData.restaurants.forEach((restaurant) => {
    const item = document.createElement("p");
    item.textContent = restaurant;
    restaurantList.appendChild(item);
  });

  // Remove existing list if present
  const existingList = document.getElementById("restaurant-list");
  if (existingList) {
    existingList.remove();
  }

  document.querySelector(".column").appendChild(restaurantList);
}
