document.addEventListener("DOMContentLoaded", function () {

  const seriesSelect = document.getElementById("seriesSelect");
  let series = '';
  let jsonData = '';

  seriesSelect.addEventListener('change', function () {
    series = seriesSelect.value;
    if (series == 'Cybertron') {
      jsonData = './src/json/transformersCybertron.json'
    } else if (series == 'Energon') {
      jsonData = './src/json/transformersEnergon.json'
    } else {
      console.log('No Data Available for this series')
    }
  })

  const fetchJSONData = () => {
    fetch(jsonData)
      .then((res) => {
        if (!res.ok) {
          throw new Error
            (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        let output;
        data.toyData.forEach(function (item) {
          output += `
          <ul>
            <li>Name: ${item.name}</li>
            <ul>
              <li>Series: ${item.series}</li>
              <li>Year Released: ${item.yearReleased}</li>
              <li>Subgroup: ${item.subgroup}</li>
            </ul>
          </ul>
        `
        })
        document.getElementById("transformersList").innerHTML = output

      })
      .catch((error) =>
        console.error("Unable to fetch data:", error));
  }

  document.getElementById("queryButton").addEventListener("click", fetchJSONData);

});