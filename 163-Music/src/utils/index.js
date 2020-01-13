
// 格式化播放时间
export function formatTime(time) {
    if(typeof time!='number'&&time<0) return;
    let ti = parseInt(time),
        m, M, s, S
    if(ti/(60*60) < 1) {
        m = parseInt(ti/60)
        M = m<10 ? '0'+m : m
        s = m==0 ? ti : ti%m
        S = s<10 ? '0'+s : s
    } else {
        // 预留:处理长度超过一个小时的歌曲的时长
    }
    return M + ':' + S
}

export function downloadMusic(path) {
    // console.log(path)
    var elForm = document.createElement('form')
    elForm.method = 'get'
    elForm.setAttribute('action', path)
    document.body.appendChild(elForm)
    elForm.submit()
    setTimeout(() => {
        elForm.remove()
    }, 2000)
}

// sessionStorage
