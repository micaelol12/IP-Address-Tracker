const API_KEY = "at_Fc1JBaCsSNwiV4HUuon7OMjXxjeJl";

const ipShow = document.getElementById("ip_show");
const locationShow = document.getElementById("location_show");
const timezone = document.getElementById("timezone_show");
const domain = document.getElementById("domain_show");

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
  setLocation(lat, lng);
};

const setLocation = (lat, lng) => {
  console.log(lat, lng);
  var map = L.map("map").setView([lat, lng], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
};

getIpAddress();
