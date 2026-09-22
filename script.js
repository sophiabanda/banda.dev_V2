const items = document.querySelectorAll('.resume-item')
const h1 = document.querySelector('h1')
const enhancedBody = document.body
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')]
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)
const resumeItems = document.querySelectorAll('.resume-item')

const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
).matches

// This class gates the reveal animation so the page still works without JS.
if (enhancedBody) enhancedBody.classList.add('js-enhanced')

const backToTop = document.createElement('button')

backToTop.id = 'back-to-top'
backToTop.type = 'button'
backToTop.setAttribute('aria-label', 'Back to top')
backToTop.innerHTML = '&uarr;'

document.body.append(backToTop)

const h1Text = `Hi. I'm<br> Sophia Banda.`
let i = 0

function typeEffect() {
    if (!h1 || i >= h1Text.length) return

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

const updateActiveSection = () => {
    if (!sections.length) return

    const scrollPosition = window.scrollY
    const viewportHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const isAtBottom = scrollPosition + viewportHeight >= documentHeight - 5

    let activeSection = sections[0]

    if (isAtBottom) {
        activeSection = sections[sections.length - 1]
    } else {
        const readingLine = scrollPosition + viewportHeight * 0.25

        sections.forEach((section) => {
            const sectionTop =
                section.getBoundingClientRect().top + scrollPosition

            if (sectionTop <= readingLine) {
                activeSection = section
            }
        })
    }

    navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${activeSection.id}`

        // aria-current is both the CSS styling hook and an accessibility cue.
        link.setAttribute('aria-current', isCurrent ? 'true' : 'false')
    })
}

// Update the active nav link immediately when a nav link is clicked.
// Smooth scrolling can take a moment to reach the target, so waiting only
// for scroll position would briefly leave the previous section highlighted.
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        const target = document.querySelector(link.getAttribute('href'))

        if (!target) return

        navLinks.forEach((navLink) => {
            navLink.setAttribute(
                'aria-current',
                navLink === link ? 'true' : 'false',
            )
        })
    })
})

// Resets URL to / when the top of the site is reached either by scroll
// or by pressing the to-the-top button
const clearUrlHashAtTop = () => {
    if (window.scrollY <= 1 && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
    }
}

// Update the top progress bar, active nav link, and back-to-top button
// whenever the visitor scrolls.
const updateScrollState = () => {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight

    // Divide the current scroll position by the total scrollable distance.
    const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0

    // CSS consumes this value in body::before with transform: scaleX(...).
    document.documentElement.style.setProperty('--scroll-progress', progress)

    updateActiveSection()

    clearUrlHashAtTop()

    backToTop.classList.toggle(
        'is-visible',
        window.scrollY > window.innerHeight * 0.7,
    )
}

// passive tells the browser this listener will not cancel scrolling,
// helping scrolling stay smooth on touch devices.
window.addEventListener('scroll', updateScrollState, {
    passive: true,
})

updateScrollState()

// Scroll back to the top when the button is clicked.
backToTop.addEventListener('click', () => {
    // Avoid animated scrolling when the user has requested reduced motion.
    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth',
    })
})

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')

                revealObserver.unobserve(entry.target)
            }
        })
    },
    { threshold: 0.08 },
)

resumeItems.forEach((item) => revealObserver.observe(item))

const focusObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('in-focus', entry.isIntersecting)
        })
    },
    {
        threshold: 0.6,
    },
)

items.forEach((item) => focusObserver.observe(item))
