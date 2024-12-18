document.getElementById('showFormButton').addEventListener('click', () => {
    const formPopupWrapper = document.getElementById('formPopupWrapper');
    formPopupWrapper.style.display = formPopupWrapper.style.display === 'none' || formPopupWrapper.style.display === '' ? 'flex' : 'none';


});

document.getElementById('textToggle').addEventListener('change', function () {
    const languageSelectGroup = document.getElementById('languageSelectGroup');
    languageSelectGroup.style.display = this.value === 'code' ? 'block' : 'none';
});
document.getElementById('addCardForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(event.target);
    const name = formData.get('cardName');
    const code = formData.get('cardCode');
    const contentType = document.getElementById('textToggle').value;
    const language = contentType === 'code' ? document.getElementById('languageSelect').value : '';

    console.log(`Name: ${name}, Code: ${code}, ContentType: ${contentType}, Language: ${language}`);

    const response = await fetch('https://cards-production-308b.up.railway.app/addCard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, code, contentType, language })
    });

    if (response.ok) {
        event.target.reset();
        console.log('Card added successfully');
        document.getElementById('formPopupWrapper').style.display = 'none';
        await populateCardGrid();
    } else {
        console.log('Failed to add card');
        alert('Failed to add card');
    }

});

document.getElementById('deleteSelectedButton').addEventListener('click', async () => {
    const selectedIds = Array.from(document.querySelectorAll('.myCard input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    console.log('Selected IDs:', selectedIds); // Debugging statement

    const response = await fetch('https://cards-production-308b.up.railway.app/deleteCards', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedIds)
    });

    if (response.ok) {
        console.log('Cards deleted successfully');
        await populateCardGrid();
    } else {
        console.log('Failed to delete cards');
        alert('Failed to delete cards');
    }
});

async function populateCardGrid() {
    const cards = await getCards();
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = '';
    cards.forEach((card) => {
        const cardElement = createCard(card);
        cardGrid.appendChild(cardElement);
    });
}



function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-item';
    cardElement.innerHTML = `
                <div class="card-header">
                    <input type="checkbox" class="card-checkbox" value="${card.idAsString}">
                    <h3>${card.name}</h3>
                    <span class="delete-icon">🗑️</span>
                </div>
            `;

    cardElement.querySelector('.card-header').addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            openCardModal(card);
        }
    });
    cardElement.querySelector('.delete-icon').addEventListener('click', async (e) => {
        e.stopPropagation();
        const selectedIds = [card.idAsString];

        const response = await fetch('https://cards-production-308b.up.railway.app/deleteCards', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedIds)
        });

        if (response.ok) {
            cardElement.remove();
        } else {
            alert('Failed to delete card');
        }
    });

    return cardElement;
}
function openCardModal(card) {
    const modal = document.getElementById('cardModal');
    const frontTitle = document.getElementById('modalFrontTitle');
    const backContent = document.getElementById('modalBackContent');

    // Reset modal state
    modal.classList.remove('flipped');

    frontTitle.textContent = card.name;

    if (card.contentType === 'code') {
        backContent.innerHTML = `
                    <pre><code class="language-${card.language}">${card.code}</code></pre>
                `;
        Prism.highlightElement(backContent.querySelector('code'));
    } else {
        backContent.innerHTML = `<pre>${card.code}</pre>`;
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('flipped');
    }, 1000);
}
document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.getElementById('cardModal');
    modal.classList.remove('flipped');
    modal.style.display = 'none';
});

document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.getElementById('cardModal');
    modal.classList.remove('flipped');
    modal.style.display = 'none';
});


async function getCards() {
    const response = await fetch('https://cards-production-308b.up.railway.app/cards');
    if (response.ok) {
        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } else {
        console.error('Failed to fetch cards');
        return [];
    }
}

async function populateCardList() {
    const cards = await getCards();
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = '';
    cards.forEach((card) => {
        const cardElement = createCard(card);
        cardList.appendChild(cardElement);
    });
}

document.addEventListener('DOMContentLoaded', () => populateCardList());