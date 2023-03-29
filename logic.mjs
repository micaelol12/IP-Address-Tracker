const API_KEY = "at_Fc1JBaCsSNwiV4HUuon7OMjXxjeJl";

const ipShow = document.getElementById("ip_show");
const locationShow = document.getElementById("location_show");
const timezone = document.getElementById("timezone_show");
const domain = document.getElementById("domain_show");

const map = L.map("map", {
  center: [51.505, -0.09],
  zoom: 13
})

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const search = async () => {
  const searchValue = document.getElementById("address_tracker").value;
  const response = await getIpAddress(searchValue);
  console.log(response);
};

const getIpAddressRequest = async (ipAddress) => {
  if (ipAddress) {
    return axios.get(
      `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}&ipAddress=${ipAddress}`
    );
  } else
    return axios.get(
      `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}`
    );
};

const getIpAddress = async (ipAddress) => {
  response = await getIpAddressRequest(ipAddress);
  const data = response.data;
  console.log(data);
  const lat = data.location.lat;
  const lng = data.location.lng;
  ipShow.innerHTML = data.ip;
  locationShow.innerHTML = data.as.name;
  timezone.innerHTML = data.location.timezone;
  domain.innerHTML = data.as.domain;
  setLocation(lat, lng, 13);
};

const setLocation = (lat, lng, zoom) => {
  console.log("zoom:", map.getZoom())
  map.flyTo([lat, lng], zoom ?? map.getZoom(), {
    duration: 6
  });
};

getIpAddress();