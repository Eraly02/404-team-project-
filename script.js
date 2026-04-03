function openPopup(){

document.getElementById("popup").style.display = "flex";

}

function closePopup(){

document.getElementById("popup").style.display = "none";

}



// assets/script.js
DG.then(function () {
    var map = DG.map('map', {
        center: [43.238949, 76.889709], // центр города
        zoom: 11
    });

    // Функция для обновления данных
    function updateTransportData() {
        fetch('get_transport.php')
            .then(response => response.json())
            .then(data => {
                // Очистка таблицы (кроме заголовка)
                const table = document.getElementById('accidents-table');
                table.querySelectorAll('tr:not(:first-child)').forEach(tr => tr.remove());

                // Вставка новых данных
                data.forEach(item => {
                    const row = table.insertRow();
                    row.insertCell().textContent = item.hour;
                    row.insertCell().textContent = item.speeding_percent;
                    row.insertCell().textContent = item.violation_percent;
                    row.insertCell().textContent = item.weather_percent;
                    row.insertCell().textContent = item.technical_percent;

                    // Маркер на карте (пример случайного смещения для демонстрации)
                    DG.marker([43.238949 + Math.random() * 0.01, 76.889709 + Math.random() * 0.01])
                      .addTo(map)
                      .bindPopup(`Время: ${item.hour}<br>Превышение скорости: ${item.speeding_percent}%`);
                });
            });
    }

    // Первичная загрузка данных
    updateTransportData();

    // Обновление каждые 30 секунд
    setInterval(updateTransportData, 30000);
});