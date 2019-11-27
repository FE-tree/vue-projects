<template>
    <div class="home">
        <navbar title="Music"></navbar>

        <banner></banner>

        <div class="mid-menu">
            <div class="mid-menu-item">
                <mu-button icon fab color="primary"><mu-icon value="hearing"></mu-icon></mu-button>
                <p>私人FM</p>
            </div>
            <div class="mid-menu-item">
                <mu-button icon fab color="primary"><mu-icon value="date_range"></mu-icon></mu-button>
                <p>每日推荐</p>
            </div>
            <div class="mid-menu-item">
                <mu-button icon fab color="primary"><mu-icon value="queue_music"></mu-icon></mu-button>
                <p>歌单</p>
            </div>
            <div class="mid-menu-item">
                <mu-button icon fab color="primary"><mu-icon value="equalizer"></mu-icon></mu-button>
                <p>排行榜</p>
            </div>
        </div>

        <div class="title">推荐歌单<mu-icon value="chevron_right"></mu-icon></div>
        <div class="gridlist">
            <div class="gridlist-item" v-for="(sheet,index) in personalizedList">
                <div class="hearer"><mu-icon value="headset" size="14"></mu-icon> {{ parseInt(sheet.playCount/10000) }}万</div>
                <div class="img" :style="{backgroundImage: `url(${sheet.picUrl})`}"></div>
                <p class="name">{{ sheet.name }}</p>
            </div>
        </div>

        <div class="title">推荐新歌<mu-icon value="chevron_right"></mu-icon></div>
        <mu-list textline="two-line" class="songlist">
            <div class="list-item-wrp" v-for="(child,i) in newsongList">
                <mu-list-item avatar :ripple="false" button style="height: 62px;padding-left: 15px;">
                    <mu-avatar size="20" color="primary" class="ranking">{{ i+1 }}</mu-avatar>
                    <mu-list-item-action>
                        <mu-avatar>
                            <img :src="child.song.album.blurPicUrl">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>{{ child.name }} <span class="desc" v-if="child.song.alias[0]">({{ child.song.alias[0] }})</span></mu-list-item-title>
                        <mu-list-item-sub-title v-singerFormat="child.song.artists"></mu-list-item-sub-title>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-divider shallow-inset v-if="i!=newsongList.length-1"></mu-divider>
            </div>
        </mu-list>

    </div>
</template>

<script>
import navbar from '../components/navbar'
import banner from '../components/banner'
export default {
    name: "home",
    components: {
        navbar,
        banner
    },
    data() {
        return {
            personalizedList: [],
            newsongList: []
        }
    },
    created() {
        this.getRelated()
        this.getNewsong()
    },
    methods:{
        getRelated() {
            this.$api.personalized().then(res => {
                this.personalizedList = res.result.slice(0,6)
            }).catch(err => {
                consolelog(err)
            })
        },
        getNewsong() {
            this.$api.newsong().then(res => {
                this.newsongList = res.result
            }).catch(err => {
                consolelog(err)
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    .mid-menu {
        display: flex;
        &-item {
            text-align: center;
            flex: 1;
            p {
                margin-top: 5px;
            }
            .mu-fab-button {
                color: #fff;
                /*background-color: #fff;*/
                /*border: 1px solid rgba(33,150,243, .4);*/
            }
        }
    }
    .title {
        font-weight: bold;
        font-size: 1rem;
        margin: 15px 10px;
        display: flex;
        i {
            color: #666;
        }
    }
    .gridlist {
        margin: 0 10px;
        height: 82vw;
        &-item {
            width: 32%;
            height: 36vw;
            margin-right: 2%;
            margin-bottom: 18px;
            float: left;
            position: relative;
            &:nth-child(3n) {
                margin-right: 0%;
            }
            .hearer {
                display: flex;
                position: absolute;
                top: 2px;
                right: 3px;
                color: #fff;
                font-size: .6rem;
                align-items: center;
            }
            .img {
                width: 100%;
                height: 30vw;
                background-size: cover;
                background-position: center;
                background-color: #ddd;
            }
            .name {
                margin: 5px 0;
                font-size: .75rem;
                line-height: 1.2;
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                word-wrap: break-word;
            }
        }
    }
    .songlist {
        margin-top: -20px;
        .list-item-wrp {
            position: relative;
            .ranking {
                position: absolute;
                top: 10px;
                left: 0;
            }
            .desc {
                color: darkgrey;
                font-size: .8rem;
            }
        }

    }
}
</style>
