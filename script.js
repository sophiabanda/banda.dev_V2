document.addEventListener('DOMContentLoaded', function () {
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
})
