document.addEventListener("DOMContentLoaded", function () {
    const scheduleUrl = 'schedule.json';

    // Зареждаме графика от JSON файл
    fetch(scheduleUrl)
        .then(response => response.json())
        .then(data => {
            renderSchedule(data.halls);
        })
        .catch(error => {
            console.error("Не можа да се зареди графиката:", error);
        });

    // Пример за партньори
    const partners = [
        {
            name: "Дюкян на хорото",
            logo: "https://www.skarpini.com/media/91/2932.png",
            discount: "10%",
            description: "Отстъпки за обувки."
        },
        {
            name: "Grand Optics",
            logo: "https://grandoptics-bg.com/web/images/logo_grand_black.png",
            discount: "15%",
            description: "Отстъпки за всички оптични услуги и продукти."
        },
        {
            name: "Joy Optics",
            logo: "https://joyoptics.bg/path/to/logo.png",
            discount: "20%",
            description: "Отстъпка за закупуване на нови очила и контактни лещи."
        },
        {
            name: "The Corner of Health",
            logo: "https://www.facebook.com/Thecornerofhealth/path/to/logo.png",
            discount: "10%",
            description: "Отстъпка за медикаменти и здравни продукти."
        }
    ];

    // Функция за рендиране на партньори
    function renderPartners(partners) {
        const partnerCardsContainer = document.getElementById("partner-cards-container");

        partners.forEach(partner => {
            const partnerCard = document.createElement("div");
            partnerCard.classList.add("partner-card");

            partnerCard.innerHTML = `
                <img src="${partner.logo}" alt="${partner.name}">
                <p><strong>${partner.name}</strong></p>
                <p>Отстъпка: ${partner.discount}</p>
                <p>${partner.description}</p>
            `;
            partnerCardsContainer.appendChild(partnerCard);
        });
    }

    renderPartners(partners);

    // Рендиране на графика
    function renderSchedule(halls) {
        const scheduleContainer = document.getElementById("schedule-container");

        halls.forEach(hall => {
            const section = document.createElement("div");
            section.classList.add("schedule-section");

            const title = document.createElement("h3");
            title.textContent = hall.name;
            section.appendChild(title);

            // Създаваме съдържанието на графика
            const table = document.createElement("table");
            table.innerHTML = `
                <thead>
                    <tr><th>Ден</th><th>Час</th><th>Групи</th></tr>
                </thead>
                <tbody>
                    ${hall.schedule.map(session => `
                        <tr>
                            <td>${session.day}</td>
                            <td>${session.times.join('<br>')}</td>
                            <td>${session.groups.join('<br>')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            section.appendChild(table);
            scheduleContainer.appendChild(section);

            // Добавяме обработчик за кликане върху заглавието (акордеон)
            title.addEventListener("click", function () {
                const isVisible = table.style.display === "table"; 
                table.style.display = isVisible ? "none" : "table";
            });
        });
    }
});