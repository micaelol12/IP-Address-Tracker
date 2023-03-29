const API_KEY = "at_Fc1JBaCsSNwiV4HUuon7OMjXxjeJl";
const API_URL = "https://geo.ipify.org/api/v2/country,city,vpn"

const ipShow = document.getElementById("ip_show");
const locationShow = document.getElementById("location_show");
const timezoneShow = document.getElementById("timezone_show");
const domainShow = document.getElementById("domain_show");

let map;

const search = async () => {
  const searchValue = document.getElementById("address_tracker").value;
  updateMap(searchValue)
  console.log(response);
};

const getIpAddressRequest = async (ipAddress) => {
  if (ipAddress) {
    return axios.get(
      `${API_URL}?apiKey=${API_KEY}&ipAddress=${ipAddress}`
    );
  } else
    return axios.get(
      `${API_URL}?apiKey=${API_KEY}`
    );
};

const printData = (ip, location, timezone, domain) => {
  ipShow.innerHTML = ip;
  locationShow.innerHTML = location;
  timezoneShow.innerHTML = timezone;
  domainShow.innerHTML = domain;
}

const getIpAddressData = async (ipAddress) => {
  response = await getIpAddressRequest(ipAddress);
  const data = response.data;
  return {
    lat: data.location.lat,
    lng: data.location.lng,
    ip: data.ip,
    location: data.as.name,
    timezone: data.location.timezone,
    domain: data.as.domain
  }

};

const setLocation = (lat, lng, zoom) => {
  console.log("zoom:", map.getZoom())
  map.flyTo([lat, lng], zoom ?? map.getZoom(), {
    duration: 6
  });
};

const updateMap = async (ipAddress) => {
  const ipData = await getIpAddressData(ipAddress);
  setLocation(ipData.lat, ipData.lng)
  printData(ipData.ip, ipData.location, ipData.timezone, ipData.domain)
}

const startMap = async () => {
  const ipData = await getIpAddressData();
  console.log('teste', ipData)
  map = L.map("map", {
    center: [ipData.lat, ipData.lng],
    zoom: 13
  })
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  printData(ipData.ip, ipData.location, ipData.timezone, ipData.domain)
}

startMap();