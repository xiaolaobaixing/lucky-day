
let currentTime = new Date() // new Date()
render(currentTime)

g('#prevMonth').onclick = () => {
  const 月初 = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
  render(new Date(月初 - 86400 * 1000))
}
g('#nextMonth').onclick = () => {
  const 下月初 = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1)
  render(下月初)
}
g('#today').onclick = () => {
  render(new Date())
}

// 帮助函数
function g(selector) {
  return document.querySelector(selector)
}
function gs(selector) {
  return document.querySelectorAll(selector)
}

function render(time) {
  const year = time.getFullYear()
  const month = time.getMonth() + 1

  initTime()
  generateDays()
  currentTime = time
  // 帮助函数
  function initTime() {
    const time = g('#time')
    time.textContent = `${year}年${month}月`
  }
  function generateDays() {
    const 月初 = new Date(year, month - 1, 1)
    const 月初星期几 = 月初.getDay()
    const 月末 = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
    const 月末几号 = 月末.getDate()
    const 月末星期几 = 月末.getDay()

    const days = g('#days')
    days.innerHTML = ""
    const fragment = document.createDocumentFragment()
    let n = 0
    for (let i = 1; i < 月初星期几; i++) {
      const li = document.createElement('li')
      const d = new Date(月初 - 86400 * 1000 * i)
      li.textContent = d.getDate()
      li.classList.add('calendar-days-disabled')
      fragment.prepend(li)
      n += 1
    }

    const 这个月多少天 = 月末几号
    const now = new Date()
    let selectedLi
    for (let i = 1; i <= 这个月多少天; i++) {
      const li = document.createElement('li')
      li.textContent = i
      if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
        li.classList.add("calendar-days-today")
      }
      li.onclick = () => {
        if (selectedLi) { selectedLi.classList.remove('calendar-days-selected') }
        li.classList.add("calendar-days-selected")
        selectedLi = li
        if (events) {
          const fragment = document.createDocumentFragment()
          events.map(event => {
            const div = document.createElement('div')
            div.classList.add('events-item')
            div.textContent = event
            fragment.append(div)
          })
          g('#events').innerHTML = ""
          g('#events').append(fragment)
        } else {
          g('#events').innerHTML = "<div>无</div>"
        }
      }
      const key = `${year}-${month}-${i}`
      const events = window.data[key]
      if (events) {
        li.classList.add('calendar-days-hasEvents')
      }
      fragment.append(li)
      n += 1
    }
    let i = 月末星期几 + 1
    for (let j = 0; j < 42 - n; j++) {
      const delta = i - 月末星期几
      const li = document.createElement('li')
      const d = new Date(月末 - 0 + 86400 * 1000 * delta)
      li.textContent = d.getDate()
      fragment.append(li)
      li.classList.add('calendar-days-disabled')
      i++
    }
    days.append(fragment)
  }
}
