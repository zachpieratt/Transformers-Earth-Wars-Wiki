document.addEventListener("DOMContentLoaded", function () {
    const factionsDropdown = document.getElementById("factions");

    const fetchFactionData = () => {
        const selectedFaction = factionsDropdown.value;
        let jsonFile;

        if (selectedFaction == 'Autobots') {
            jsonFile = "/src/json/autobots.json";
        } else if (selectedFaction == 'Decepticons') {
            jsonFile = "/src/json/decepticons.json";
        } else {
            console.error("Invalid faction selected.");
            return;
        }

        fetch(jsonFile)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP Error ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                let output = '';
                data.units.forEach(function (unit) {
                    output += `
                    <div>
                    <div>${unit.name}</div>
                    <div>${unit.class}</div>
                    </div>
                    `
                })
                document.getElementById("gridContainer").innerHTML = output;
                console.log(output)

            })
            .catch((error) => {
                console.error("Error fetching faction data:", error);
            });
    };

    factionsDropdown.addEventListener("change", fetchFactionData);
});
