const items = document.querySelectorAll('.resume-item')
const h1 = document.querySelector('h1')

const h1Text = `Hi. I'm<br> Sophia Banda.`
let i = 0

function typeEffect() {
    if (i >= h1Text.length) return

    const currentChar = h1Text.charAt(i)

    if (h1Text.substring(i, i + 4) === '<br>') {
        h1.innerHTML += '<br>'
        i += 4
    } else {
        h1.innerHTML += currentChar
        i++
    }

    setTimeout(typeEffect, 100)
}

typeEffect()

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('in-focus', entry.isIntersecting)
        })
    },
    {
        threshold: 0.6,
    },
)

items.forEach((item) => observer.observe(item))
