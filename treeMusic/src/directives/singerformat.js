function formatSinger(singers) {
    if(!singers) return;
    if(singers.length==0) return '';
    let str = ''
    singers.forEach((a, i) => {
        if(i==singers.length-1) {
            str += a.name
        } else {
            str += a.name + '/'
        }
    })
    return str
}

export default function(el, data) {
    el.innerHTML = formatSinger(data.value)
}
