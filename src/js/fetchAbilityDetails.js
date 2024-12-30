const FetchAbilities = (ability1, ability2) => {


    let abilities = [ability1, ability2]
    fetch('/src/json/abilities.json')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP Error ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const abilities = data.abilities;
            const output = abilities.filter(a => (a.name == ability1) || (a.name == ability2));
            generateAbilityDetails(output);
        })
        .catch((error) => {
            console.error("Error fetching ability data:", error);
        });

    const generateAbilityDetails = (output) => {
        const abilityElement = document.getElementById("abilityDetails");
        let ab1 = output[0];
        let ab2 = output[1] ? output[1] : {};
        abilityElement.innerHTML = `
            <h1>Ability Details</h1>
            <div><strong>Ability 1:</strong> ${ab1.name}</div>
            <img class="abilityIcon" src=${ab1.icon}>
        `;
    }


}


export default FetchAbilities;