import request from './request'

// 获取首页banner
const banner = () => request.get('/banner')

/* 登录 */
const loginPhone = (params) => request.get('/login/cellphone', { params })          // 手机登录
const loginMail = (params) => request.get('/login', { params })                     // 邮箱登录
const logout = () => request.get('/logout')                                         // 退出登录
const loginStatus = () => request.get('/login/status')                              // 登录状态
const loginRefresh = () => request.get('/login/refresh')                            // 刷新登录

/* 歌曲 */
const search = (params) => request.get('/search', { params })                       // 搜索
const songUrl = (params) => request.get('/song/url', { params })                    // 获取歌曲url
const songDetail = (params) => request.get('/song/detail', { params })              // 获取歌曲详情
const newsong = () => request.get('/personalized/newsong')                          // 推荐新音乐

/* 歌单 */
const personalized = () => request.get('/personalized')                             // 推荐歌单
const catList = () => request.get('/playlist/catlist')                              // 歌单分类
const hotList = () => request.get('/playlist/hot')                                  // 热门歌单分类
const topPlayList = (params) => request.get('/top/playlist', { params })            // 歌单 ( 网友精选碟 )
const highList = (params) => request.get('/top/playlist/highquality', { params })   // 获取精品歌单
const relatedList = () => request.get('/related/playlist?id=1')                     // 相关歌单推荐
const detailList = (params) => request.get('/playlist/detail', { params })          // 获取歌单详情

/* 排行榜 */
const toplist = () => request.get('/toplist')                                       // 所有榜单
const topListDetail = () => request.get('/toplist/detail')                          // 所有榜单内容摘要
const artist = () => request.get('/toplist/artist')                                 // 歌手榜
const oneTopList = (params) => request.get('/top/list', { params })                 // 单个排行榜

export default {
    banner,

    loginPhone,
    loginMail,
    logout,
    loginStatus,
    loginRefresh,

    search,
    songUrl,
    songDetail,
    newsong,

    personalized,
    catList,
    hotList,
    topPlayList,
    highList,
    relatedList,
    detailList,

    toplist,
    topListDetail,
    artist,
    oneTopList,
}
