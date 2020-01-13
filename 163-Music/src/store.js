import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import api from "./utils/api"

// if(sessionStorage.getItem('isPlay')==null) sessionStorage.setItem('isPlay', false)
export default new Vuex.Store({
    state: {
        showPlayer: false,
        isPlay: false,
        playPath: '',
        songList: {}
    },
    mutations: {
        toggle_player: (state, bol) => {
            state.showPlayer = bol
            // if (state.showPlayer) {
            //     document.body.style.overflowY = 'hidden'
            // } else {
            //     document.body.style.overflowY = 'auto'
            // }
        },
        toggle_play: (state, bol) => {
            state.isPlay = bol
            sessionStorage.setItem('isPlay', bol)
        },
        set_path: (state, path) => {
            state.playPath = path
        }
    },
    actions: {
        togglePlayer({ commit }, bol) {
            commit('toggle_player', bol)
        },
        togglePlay({ commit }, bol) {
            commit('toggle_play', bol)
        },
        Play({ commit }, id) {
            return new Promise((resolve, reject) => {
                api.songUrl({ id }).then(res => {
                    // console.log(res.data)
                    commit('set_path', res.data[0].url)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
});
