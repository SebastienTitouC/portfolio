const transformDate = (date) => {
    const today = new Date(date)

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
        clone.querySelector('.articles__content').innerHTML = "Il n'y a pas encore de contenue, mais cela viendra. <br><br>Restez à l'écoute.  <br><br>Merci."
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
    const articles = [
        {
            "id": 1,
            "title": "Un équilibre précaire : Sport, technologie et Papa à plein temps.",
            "content": "Entre mes sessions de course à pied pour préparer des marathons, mes séances de renforcement musculaire et mon rôle de papa d'une petite fille pleine d'énergie, chaque jour est un vrai défi d'équilibre. Être parent, c’est parfois ne pas avoir une minute pour soi, mais je trouve toujours le moyen d’intégrer mes passions dans mon quotidien. Le sport me permet de me ressourcer, de rester en forme et de gérer le stress. Etre indépendant me prend du temps, mais j'espère que ma fille sera fière de son papa : celui qui a eu le courage de créer son entreprise, de se lancer dans des projets et de poursuivre ses rêves, tout en étant là pour elle chaque jour.",
            "category": "autre",
            "date_created": "2025-01-28 13:00:12.044897+00"
        },
        {
            "id": 2,
            "title": "De Thales à auto-entrepreneur : un pari risqué.",
            "content": "Quitter Thales, un groupe mondialement reconnu, pour me lancer en freelance a été une décision audacieuse, pleine de défis et de sacrifices. Après des années de confort et de stabilité, j'ai choisi de m'affranchir des contraintes d'une grande entreprise pour retrouver ma liberté créative et mon autonomie. Cela implique des risques, des doutes et des journées parfois longues, mais chaque projet réalisé et chaque client satisfait me rappellent que j'ai fait le bon choix. Être freelance, c’est aussi accepter de porter seul la responsabilité, mais c’est aussi le prix de la liberté et de la satisfaction d’aller au bout de ses passions.",
            "category": "personnel",
            "date_created": "2025-01-28 13:56:24.751176+00"
        },
        {
            "id": 3,
            "title": "Quelles technologies et pourquoi ?",
            "content": "J’aime coder en HTML, CSS et JavaScript/TypeScript parce que cela me permet de garder un contrôle total sur chaque détail de votre site. Ces technologies sont simples, efficaces et parfaites pour créer des expériences web rapides et réactives. Pour des projets plus complexes, je me tourne vers Node.js, qui est idéal pour des sites dynamiques et performants. Pour les projets encore plus ambitieux, j’utilise Django ou Next.js, qui offrent robustesse et flexibilité. Chaque choix technologique est pensé pour répondre au mieux à vos besoins et garantir une performance optimale.",
            "category": "développement",
            "date_created": "2025-01-28 13:57:01.202237+00"
        },
        {
            "id": 4,
            "title": "Système de gestion de contenue ou développeur ?",
            "content": "WordPress, Squarespace, Joomla ou Wix, si ces outils sont pratiques, rien ne vaut une solution sur-mesure pour répondre à des besoins spécifiques et garantir des performances optimales. Contrairement aux CMS qui nécessitent des mises à jour régulières et des ajustements constants pour rester fonctionnels, une solution sur-mesure est pérenne et évolutive, capable de suivre la croissance de votre entreprise sans les contraintes des systèmes préfabriqués.",
            "category": "développement",
            "date_created": "2025-01-28 13:57:24.499362+00"
        },
        {
            "id": 5,
            "title": "Toulouse : Pourquoi me choisir pour vos projets web ?",
            "content": "En tant qu'artisan du code, je mets tout mon savoir-faire à votre service pour créer des solutions web sur-mesure, sans intermédiaire et directement avec vous. Mon approche ? Un travail de qualité, rapide et flexible, en parfaite adéquation avec vos besoins. Vous bénéficiez de l'expertise d'un développeur passionné, proche de chez vous (Tournefeuille), toujours à l'écoute et réactif. Chaque projet est une collaboration unique, où je mets tout en œuvre pour vous offrir un résultat à la hauteur de vos attentes.",
            "category": "entreprise",
            "date_created": "2025-01-28 13:57:49.925432+00"
        }
    ]
    if (category)
        displayArticles(articles.filter((a) => {return a.category === category }))
    else 
        displayArticles(articles)
    /* try {
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
    } */
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