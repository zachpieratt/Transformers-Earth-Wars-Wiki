document.addEventListener("DOMContentLoaded", function () {

  let jsonData = "./src/json/transformersEnergon.json";

  const fetchJSONData = () => {
    fetch(jsonData)
      .then((res) => {
        if (!res.ok) {
          throw new Error
            (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) =>
        console.log(data))
      .catch((error) =>
        console.error("Unable to fetch data:", error));
  }
  const searchButton = document.getElementById("queryButton").addEventListener("click", fetchJSONData);

});