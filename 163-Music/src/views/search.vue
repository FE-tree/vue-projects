<template>
    <div class="search-page">
        <navbar title="搜索"></navbar>

        <div class="search">
            <input type="text" v-model="keywords" class="search-input">
            <mu-icon value="search" class="search-icon" @click="search"></mu-icon>
            <!-- 搜索关键字记录  标签显示 -->
        </div>

        <mu-container ref="container" class="demo-loadmore-content" v-show="list.length!=0">
            <mu-load-more :loading="loading" @load="load">
                <mu-card class="song-list">
                    <mu-list textline="two-line" dense>
                        <div class="list-item-wrp" v-for="(song,i) in list">
                            <mu-list-item button :ripple="false" class="list-item">
                                <mu-list-item-content>
                                    <mu-list-item-title>{{ song.name }}</mu-list-item-title>
                                    <mu-list-item-sub-title><span v-singerFormat="song.artists"></span> - {{ song.album.name }}</mu-list-item-sub-title>
                                </mu-list-item-content>
                                <mu-list-item-action>
                                    <mu-list-item-after-text v-durFormat="song.duration" class="time"></mu-list-item-after-text>
                                    <mu-button icon @click="$bus.$emit('playMusic', song.id)"><mu-icon value="play_circle_outline"></mu-icon></mu-button>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-divider shallow-inset v-if="i!=list.length-1"></mu-divider>
                        </div>
                    </mu-list>
                </mu-card>

            </mu-load-more>
        </mu-container>

    </div>
</template>

<script>
    import navbar from '../components/navbar'
    export default {
        name: "search",
        components: {
            navbar
        },
        data() {
            return {
                keywords: '双笙',
                pageSize: 1,
                pageNum: 10,
                list: [],
                loading: false
            }
        },
        created() {
            // this.search()
            let self = this
            document.onkeypress = function(e){
                let key = window.event.keyCode
                // console.log(key, e)
                if(key==13){
                    self.list =[]
                    self.pageSize = 1
                    self.search()
                }
            }
        },
        methods: {
            search() {
                if(this.keywords) {
                    this.$api.search({
                        keywords: this.keywords,
                        limit: this.pageNum,
                        offset: (this.pageSize - 1) * this.pageNum
                    }).then(res => {
                        console.log(res.result.songs)
                        this.list = this.list.concat(res.result.songs)
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$toast.info('请输入搜索内容!')
                }
            },
            load() {console.log(111)
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    this.pageSize += 1
                    this.search()
                }, 2000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-page {
        background-color: rgba(33,150,243, .05);
        padding: 10px 0;
        .search {
            width: 100%;
            height: 50px;
            margin: 0 auto;
            text-align: center;
            background-color: #2196f3;
            position: fixed;
            top: -10px;
            left: 0;
            z-index: 101;
            .search-input {
                margin: 5px auto 0;
                width: 90%;
                border: 0;
                padding: 6px 15px;
                color: #333;
                font-size: 1.1rem;
                background-color: rgba(255,255,255, .6);
                opacity: .6;
                border-radius: 5px;
                outline: none;
                transition: all .6s;
                position: relative;
                z-index: 1;
                &:focus {
                    width: 90%;
                    opacity: 1;
                }
                &:focus + .search-icon {
                    opacity: 1;
                    color: #666;
                    z-index: 2;
                }
            }
            .search-icon {
                color: #ccc;
                opacity: .5;
                transition: all .6s;
                position: absolute;
                right: 8%;
                top: 13px;
                z-index: 0;
            }
            .music-icon {
                position: absolute;
                top: 8px;
                right: 10px;
            }
        }
        .song-list {
            margin: 100px 10px 0;
            .list-item-wrp {
                li.list-item {
                    list-style: none;
                    .time {
                        position: relative;
                        top: 8px;
                    }
                }
            }
        }
    }
</style>