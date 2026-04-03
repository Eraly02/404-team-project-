function openPopup(){

document.getElementById("popup").style.display = "flex";

}

function closePopup(){

document.getElementById("popup").style.display = "none";

}


new Chart(document.getElementById("tempChart"), {
    type: 'line',
    data: {
        labels: ["29.03","30.03","31.03","1.04","2.04","3.04","4.04"],
        datasets: [
            {
                label: "Температура",
                data: [20,19,18,18,19,17,21],
                borderColor: "#6c63ff",
                fill: false
            },
            {
                label: "Влажность",
                data: [45,44,43,42,43,41,46],
                borderColor: "#00c853",
                fill: false
            }
        ]
    }
});

new Chart(document.getElementById("pieChart"), {
    type: 'doughnut',
    data: {
        labels: ["Ауэзовский","Медеуский","Бостандыкский","Алмалинский"],
        datasets: [{
            data: [15,20,25,40],
            backgroundColor: ["#4c47a3","#ff9800","#f44336","#9e9e9e"]
        }]
    }
});