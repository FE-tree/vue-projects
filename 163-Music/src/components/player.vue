<template>
    <mu-scale-transition>
        <div class="player" v-show="showPlayer">
            <mu-appbar class="navbar">
                <mu-button icon slot="left" @click="closePlay">
                    <mu-icon value="close" left></mu-icon>
                </mu-button>
                <div class="title">
                    <p>{{ title }}</p>
                    <span>双笙</span>
                </div>
                <mu-button icon flat slot="right">
                    <mu-icon size="30" value="music_note" left></mu-icon>
                </mu-button>
            </mu-appbar>

            <div class="player-main">
                <div class="pic" :class="{change: isPlay}">
                    <div class="pic-bg"></div>
                    <img :src="songInfo.al.picUrl" class="pic-img">
                </div>
            </div>

            <div class="player-ctrl">
                <div class="ctrl-top">
                    <!--<mu-icon value="favorite"></mu-icon>-->
                    <div class="t-item">
                        <mu-icon value="favorite_border"></mu-icon>
                    </div>
                    <div class="t-item">
                        <mu-icon value="cloud_download" @click="dlMusic"></mu-icon>
                    </div>
                    <div class="t-item">
                        <mu-icon :value="volume==0 ? 'volume_off' : 'volume_up'"></mu-icon>
                        <mu-slider class="volume-slider" :step="5" v-model="volume" @change="volumeCtrl"></mu-slider>
                    </div>
                    <div class="t-item">
                        <mu-icon value="textsms"></mu-icon>
                    </div>
                    <div class="t-item">
                        <mu-icon value="add_box"></mu-icon>
                    </div>
                </div>
                <div class="time">
                    <span v-durFormat="songCur"></span>
                    <mu-slider class="progress-slider" :step="1"
                               color="DarkSlateBlue" track-color="rgba(255,255,255,.3)"
                               v-model="songProgress"  @change="progressCtrl" display-value=false>
                    </mu-slider>
                    <span v-durFormat="songDur"></span>
                </div>
                <div class="ctrl-bottom">
                    <mu-tooltip placement="top" :content="modeTooltip" :open.sync="showTooltip">
                        <mu-button class="i-item" icon @click="modeChange">
                            <mu-icon :size="icon.size" :value="icon.value" v-for="(icon, i) in modeType" v-show="playMode==i"></mu-icon>
                        </mu-button>
                    </mu-tooltip>
                    <mu-button class="b-item" icon>
                        <mu-icon size="45" value="skip_previous" class="prev"></mu-icon>
                    </mu-button>
                    <mu-button class="b-item" icon @click="playControl">
                        <mu-icon size="55" :value="isPlay ? 'pause_circle_outline' : 'play_circle_outline'"></mu-icon>
                    </mu-button>
                    <mu-button class="b-item" icon>
                        <mu-icon size="45" value="skip_next" class="next"></mu-icon>
                    </mu-button>
                    <mu-button class="b-item" icon @click="showList=true">
                        <mu-icon size="45" value="queue_music"></mu-icon>
                    </mu-button>
                </div>

                <mu-bottom-sheet :open.sync="showList">
                    <mu-list @item-click="showList=false">
                        <mu-sub-header>Select One</mu-sub-header>
                        <mu-list-item button>
                            <mu-list-item-action>
                                <mu-icon value="grade" color="orange"></mu-icon>
                            </mu-list-item-action>
                            <mu-list-item-title>Star</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button>
                            <mu-list-item-action>
                                <mu-icon value="inbox" color="blue"></mu-icon>
                            </mu-list-item-action>
                            <mu-list-item-title>Inbox</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button>
                            <mu-list-item-action>
                                <mu-icon value="chat" color="green"></mu-icon>
                            </mu-list-item-action>
                            <mu-list-item-title>Chat</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button>
                            <mu-list-item-action>
                                <mu-icon value="email" color="cyan"></mu-icon>
                            </mu-list-item-action>
                            <mu-list-item-title>Email</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item>
                            <mu-list-item-content>
                                <mu-list-item-title>List Item 1</mu-list-item-title>
                            </mu-list-item-content>
                        </mu-list-item>
                        <mu-divider shallow-inset></mu-divider>
                        <mu-list-item>
                            <mu-list-item-content>
                                <mu-list-item-title>List Item 2</mu-list-item-title>
                            </mu-list-item-content>
                        </mu-list-item>
                        <mu-divider shallow-inset></mu-divider>
                        <mu-list-item>
                            <mu-list-item-content>
                                <mu-list-item-title>List Item 3</mu-list-item-title>
                            </mu-list-item-content>
                        </mu-list-item>
                    </mu-list>
                </mu-bottom-sheet>
            </div>

            <div class="player-bg" :style="{backgroundImage: `url(${songInfo.al.picUrl})`}"></div>

            <audio :src="songPath" ref="audio"></audio>
        </div>
    </mu-scale-transition>
</template>

<script>
    import { downloadMusic } from "../utils";

    export default {
        name: "player",
        data () {
            return {
                title: '霜雪千年',
                songPath: '',
                songInfo: {
                    al: {
                        picUrl: ''
                    }
                },
                songCur: 0,
                songDur: 0,
                songProgress: 0,
                volume: 10,
                playMode: 0,
                modeType: [
                    { label: '顺序播放', size: 50, value: 'playlist_play'},
                    { label: '随机播放', size: 40, value: 'shuffle'},
                    { label: '列表循环', size: 40, value: 'repeat'},
                    { label: '单曲循环', size: 40, value: 'repeat_one'}
                ],
                modeTooltip: '',
                showTooltip: false,
                showList: false
            };
        },
        computed: {
            showPlayer() {
                return this.$store.state.showPlayer
            },
            isPlay() {
                return this.$store.state.isPlay
            },
            playPath() {
                return this.$store.state.playPath
            }
        },
        created() {
            // this.getUrl(478303470)
            this.$bus.$on('playMusic', (id) => {
                this.getUrl(id)
                // this.openPlay()
            })
        },
        mounted() {
            let audio = this.$refs.audio
            // console.log(audio, this.$refs.audio)
            audio.addEventListener('canplaythrough', () => {
                audio.play()
                audio.volume = this.volume/100
                this.songProgress = 0
                this.$store.dispatch('togglePlay', true)
            }, false)
            audio.addEventListener('timeupdate', () => {
                this.songDur = !audio.duration ? 0 : audio.duration
                // console.log(this.songDur, audio, audio.duration)
                this.songCur = audio.currentTime
                this.songProgress = Number((audio.currentTime / audio.duration * 100).toFixed(1))
                // console.log((audio.currentTime / audio.duration * 100).toFixed(1))
            })
            audio.addEventListener('ended', () => {
                console.log('ended')
                // this.songProgress = 0
            })
        },
        methods: {
            openPlay() {
                this.$store.dispatch('togglePlayer', true)
            },
            closePlay() {
                this.$store.dispatch('togglePlayer', false)
            },
            volumeCtrl(val) {
                if(this.$refs.audio) this.$refs.audio.volume = val/100
            },
            modeChange() {
                this.playMode = this.playMode==3 ? 0 : ++this.playMode
                this.modeTooltip = this.modeType[this.playMode].label
                this.showTooltip = true
                setTimeout(() => this.showTooltip = false, 2000)
            },
            progressCtrl(val) {
                if(this.$refs.audio.currentTime) {
                    this.songCur = this.songDur * ( val / 100 )
                    this.$refs.audio.currentTime = this.songCur
                } else {
                    this.songProgress = 0
                    this.songCur = 0
                }
            },
            getUrl(id) {
                // console.log(id)
                this.$api.songUrl({ id }).then(res => {
                    // console.log(res.data)
                    this.songPath =  res.data[0].url
                    this.$refs.audio.load()
                }).catch(err => {
                    console.log(err)
                })

                this.$api.songDetail({ ids: id }).then(res => {
                    console.log(res)
                    this.songInfo = res.songs[0]
                }).catch(err => {
                    console.log(err)
                })
            },
            playControl() {
                this.$store.dispatch('togglePlay', !this.$store.state.isPlay)
                this.isPlay ? this.$refs.audio.play() : this.$refs.audio.pause()
            },
            handlePlay(id) {
                this.$store.dispatch('Play', { id }).then(res => {
                    this.$refs.audio.load()
                }).catch(err => {
                    console.log(err)
                })
            },
            dlMusic() {
                // downloadMusic(this.songPath)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/css/player';
    .player {
        &-main {
            .pic {
                &:before {
                    background: url('../assets/images/disc_ip6.png') no-repeat;
                    background-size: contain;
                }
                &:after {
                    background: url('../assets/images/disc_light.png') no-repeat;
                    background-size: contain;
                }
            }
        }
    }
</style>