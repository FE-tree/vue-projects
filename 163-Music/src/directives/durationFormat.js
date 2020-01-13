function formatDuration(time) {
    if(typeof time!='number'&&time<0) return;
    let ti = Number.isInteger(time) ? parseInt(time/1000) : parseInt(time),
        m, M, s, S
    if(time==0) return '00:00'
    if(ti/(60*60) < 1) {
        m = parseInt(ti / 60)
        M = m<10 ? '0'+m : m
        s = m==0 ? ti : ti%m
        S = s<10 ? '0'+s : s
    } else {
        // console.log(time, ti, ti/(60*60) < 1)
        // 预留:处理长度超过一个小时的歌曲的时长
    }

    return M + ':' + S
}

export default function(el, data) {
    el.innerHTML = formatDuration(data.value)
}
