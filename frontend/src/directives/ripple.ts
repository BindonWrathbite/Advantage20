const ripple = {
  beforeMount(el: HTMLElement) {
    el.addEventListener('click', function (e: MouseEvent) {
      const ripple = document.createElement('span')
      const size = Math.max(el.clientWidth, el.clientHeight)
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.classList.add('ripple')

      el.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  },
}

export default ripple
