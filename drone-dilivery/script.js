document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Hide form and show map
  document.getElementById("orderForm").style.display = "none";
  const status = document.getElementById("status");
  status.classList.remove("hidden");

  // Initialize the map (Addis Ababa example location)
  const map = L.map('map').setView([8.9806, 38.7578], 13);

  // Load map tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  // Add drone marker (starting point)
  const startPoint = [8.9806, 38.7578]; // Café location
  const destination = [8.9850, 38.7700]; // House location

  const droneMarker = L.marker(startPoint).addTo(map)
    .bindPopup("🚁 Drone starting from café")
    .openPopup();

  const userMarker = L.marker(destination).addTo(map)
    .bindPopup("🏠 Your house");

  // Move drone step by step
  let step = 0;
  const steps = 20;
  const latDiff = (destination[0] - startPoint[0]) / steps;
  const lonDiff = (destination[1] - startPoint[1]) / steps;

  const moveDrone = setInterval(() => {
    step++;
    const newLat = startPoint[0] + latDiff * step;
    const newLon = startPoint[1] + lonDiff * step;
    droneMarker.setLatLng([newLat, newLon]);
    map.panTo([newLat, newLon]);

    if (step >= steps) {
      clearInterval(moveDrone);
      document.getElementById("status").innerHTML = "<p>📢 The drone has arrived at your house!</p>";
      droneMarker.bindPopup("📦 Arrived!").openPopup();
    }
  }, 500);
});