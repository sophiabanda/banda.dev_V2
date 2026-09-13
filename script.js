document.addEventListener('DOMContentLoaded', function () {
    const focusArea = document.getElementsByTagName('div')
    const h1Text = `Hi. I'm<br> Sophia Banda.`
    let i = 0

    window.addEventListener('load', function typeEffect() {
        if (i < h1Text.length) {
            const currentChar = h1Text.charAt(i)
            if (currentChar === '<') {
                const brTag = h1Text.substring(i, i + 4)
                if (brTag === '<br>') {
                    this.document.querySelector('h1').innerHTML += '<br>'
                    i += 4
                }
            } else {
                this.document.querySelector('h1').innerHTML += currentChar
                i++
            }
            this.setTimeout(typeEffect, 100)
        }
    })

    focusArea.addEventListener('click', (e) => {
        focusArea.classList.add('focus-section')
    })
})

window.addEventListener(
    'mousemove',
    function (e) {
        const arr = [1, 0.9, 0.8, 0.5, 0.2]

        arr.forEach(function (i) {
            var x = (1 - i) * 75
            var star = document.createElement('div')

            star.className = 'star'
            star.style.top =
                e.pageY + Math.round(Math.random() * x - x / 2) + 'px'
            star.style.left =
                e.pageX + Math.round(Math.random() * x - x / 2) + 'px'

            document.body.appendChild(star)

            window.setTimeout(
                function () {
                    document.body.removeChild(star)
                },
                Math.round(Math.random() * i * 600),
            )
        })
    },
    false,
)
