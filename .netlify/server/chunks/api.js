function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ")
      c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}
const BASE_URL = "https://lego.agreeableplant-5f34a27d.westeurope.azurecontainerapps.io/api/v1";
function buildUrl(endpoint) {
  return `${BASE_URL}${endpoint}`;
}
async function fetchUserDetails() {
  const userId = getCookie("UserId");
  const url = buildUrl(`/user/${userId}`);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("HTTP Error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
async function fetchUserSetParts(userId) {
  const url = buildUrl(`/mySets/${userId}`);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("HTTP Error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
async function fetchSetWithParts(setNum) {
  const url = buildUrl(`/sets/${setNum}`);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("HTTP Error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
async function getMinifigByFigNum(minifigId) {
  const url = buildUrl(`/minifigs/${minifigId}`);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("HTTP Error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
export {
  fetchSetWithParts as a,
  fetchUserSetParts as b,
  getMinifigByFigNum as c,
  fetchUserDetails as f,
  getCookie as g
};
