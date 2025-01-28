const transformDate = (date) => {
    let today;
    if (date) {
        today = new Date(date.replace(' ', 'T'));
    } else {
        today = new Date()
    }

    // Formater la date avec `toLocaleDateString` en français
    return today.toLocaleDateString('fr-FR', {
        day: '2-digit',    // Affiche le jour avec 2 chiffres
        month: 'long',     // Affiche le mois en texte long (ex : "Janvier")
        year: 'numeric'    // Affiche l'année complète (ex : "2025")
    });
}


const setColorCategory = (category, clone) => {
    /* category : entreprise développement personnel autre */
    if (category.toLocaleLowerCase() === "entreprise")
        clone.style.backgroundColor = "var(--clr-sky)"
    else if (category.toLocaleLowerCase() === "développement")
        clone.style.backgroundColor = "var(--clr-purple)"
    else if (category.toLocaleLowerCase() === "personnel")
        clone.style.backgroundColor = "var(--clr-orange600)"
    else if (category.toLocaleLowerCase() === "autre")
        clone.style.backgroundColor = "var(--clr-emerald)"

}
const displayArticles = (articles) => {
    const container = document.querySelector('.articles-wrapper2')
    const template = document.querySelector('#articles-template')

    container.innerHTML = '';

    if (articles.length === 0) {
        let clone = document.importNode(template.content, true);
        clone.querySelector('.articles__title').textContent = "Aucun article pour le moment."
        clone.querySelector('.articles__img').src = new URL("webp/6.webp", window.location.origin)
        clone.querySelector('.articles__img').style.display = "block"
        clone.querySelector('.articles__content').innerHTML = "In n'y a pas encore de contenue, mais cela viendra. <br><br>Restez à l'écoute.  <br><br>Merci."
        clone.querySelector('.articles__createdDate').textContent = transformDate()
        clone.querySelector('.articles__category').textContent = "Erreur"
        clone.querySelector('.articles__category').style.backgroundColor = "var(--clr-red800)"
        container.appendChild(clone)
    }
    else {
        articles.forEach(article => {
            let clone = document.importNode(template.content, true);
            clone.querySelector('.articles__title').textContent = article.title
            clone.querySelector('.articles__content').textContent = article.content
            clone.querySelector('.articles__createdDate').textContent = transformDate(article.date_created)
            clone.querySelector('.articles__category').textContent = article.category
            setColorCategory(article.category, clone.querySelector('.articles__category'))
            container.appendChild(clone)
        });
    }
}

const fetchArticles = async (category) => {
    try {
        document.querySelector('.articles-wrapper2').innerHTML = ""
        let url = "http://localhost/api/items"
        if (category)
            url = url + '?category=' + category

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Réponse du serveur:", data);
            data.sort((a, b) => { return new Date(b.date_created.replace(' ', 'T')) - new Date(a.date_created.replace(' ', 'T')) })
            displayArticles(data)
        } else {
            const errorData = await response.json();
            console.error("Erreur du serveur:", errorData.message);
            alert('Erreur: ' + errorData.message);
            displayArticles(data)
        }
    } catch (error) {
        displayArticles([])
        console.error("Erreur de requête:", error);
    }
}

const addCategoryFilter = () => {
    document.querySelector('.articles__button-all').addEventListener('click', () => { fetchArticles(); toggleFilterMenu(); })
    document.querySelector('.articles__button-enterprise').addEventListener('click', () => { fetchArticles('entreprise'); toggleFilterMenu(); })
    document.querySelector('.articles__button-perso').addEventListener('click', () => { fetchArticles('personnel'); toggleFilterMenu(); })
    document.querySelector('.articles__button-dev').addEventListener('click', () => { fetchArticles('développement'); toggleFilterMenu(); })
    document.querySelector('.articles__button-other').addEventListener('click', () => { fetchArticles('autre'); toggleFilterMenu(); })
}

const toggleFilterMenu = () => {
    const filter = document.querySelector('.articles__filter')
    const dropup = document.querySelector('.articles__filter-dropup')
    if (dropup.style.visibility === 'visible') {
        dropup.style.visibility = 'hidden'
    } else {
        dropup.style.visibility = 'visible'
    }
    filter.classList.toggle("articles__filter-hover")

}
const displayFilterMenu = () => {

    document.querySelector('#articles__filter-btn').addEventListener('click', toggleFilterMenu)
}

export { fetchArticles, addCategoryFilter, displayFilterMenu };