<template>
    <div class="banner-wrp">
        <div class="banner-bg"></div>
        <mu-carousel hide-controls class="banner">
            <template slot="indicator" slot-scope="{ index, active }">
                <mu-button icon class="mu-carousel-indicator-button" :class="{'mu-carousel-indicator-button__active': active}" @click="changeActive(index)">
                    <span class="rect-indicator"></span>
                </mu-button>
            </template>
            <mu-carousel-item v-for="item in bannerArr">
                <!--<img :src="item.imageUrl">-->
                <div class="pic" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            </mu-carousel-item>
        </mu-carousel>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data() {
            return {
                bannerArr: [],
            }
        },
        created() {
            this.getBanner()
        },
        methods:{
            getBanner() {
                this.$api.banner().then((res) => {
                    // console.log(res)
                    this.bannerArr = res.banners
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .banner-wrp {
        height: 11rem;
        position: relative;
        .banner-bg {
            width: 100%;
            background-color: #2196f3;
            height: 7rem;
            position: absolute;
            top: -10px;
        }
        .banner {
            width: 96%;
            margin: 0px auto;
            height: 9rem;
            /*height: 20vh;*/
            position: relative;
            top: 1rem;
            .pic {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                border-radius: 5px;
            }
            img {
                width: 100%;
            }
            .mu-carousel-indicator-button {
                width: 6px;
                height: 6px;
                margin: 2rem 5px 0;
                background-color: #eee;
                opacity: .6;
                .rect-indicator {

                }
            }
            .mu-carousel-indicator-button__active {
                background-color: #f00;
            }
        }
    }
</style>