const writeSubFunction = () => {
    const title = document.querySelector('.hero__function_typewriterJS')
    const txt = "Je suis ingénieur en développement logiciel, mais je suis surtout un fan de nouvelles technologies. "

    function typewriter(index) {
        if (index < txt.length) {
            setTimeout(() => {
                title.innerHTML = txt.slice(0, index)
                typewriter(index + 1)
            }, 40)
        }
        else {
            setTimeout(() =>
                document.querySelector('.social__button:nth-child(1)').classList.remove('hidden'),
                800)
            setTimeout(() =>
                document.querySelector('.social__button:nth-child(2)').classList.remove('hidden'),
                1050)
            setTimeout(() =>
                document.querySelector('.social__button:nth-child(3)').classList.remove('hidden'),
                1200)
            setTimeout(() =>
                document.querySelector('.social__button:nth-child(4)').classList.remove('hidden'),
                1400)
            setTimeout(() =>
                document.querySelector('.social__button:nth-child(5)').classList.remove('hidden'),
                1600)
        }
    }

    setTimeout(() => typewriter(42), 2000)
}

export default writeSubFunction;