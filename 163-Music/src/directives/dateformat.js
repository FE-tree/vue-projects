function formatDate(timeStamp) {
    const date = new Date(timeStamp)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    let h = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    m = m < 10 ? ('0' + m) : m
    d = d < 10 ? ('0' + d) : d
    h = h < 10 ? ('0' + h) : h
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute
    return `${y}-${m}-${d} ${h}:${minute}:${second}`
}

export default function(el, data) {
    el.innerHTML = formatDate(data.value)
}
