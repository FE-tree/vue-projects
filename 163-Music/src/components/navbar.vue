<template>
    <mu-appbar class="navbar" color="primary">
        <mu-button icon slot="left" @click="$router.push('/search')" v-if="$route.path=='/'">
            <mu-icon value="search"></mu-icon>
        </mu-button>
        <mu-button icon slot="left" @click="$router.back()" v-else>
            <mu-icon value="arrow_back_ios" left></mu-icon>
        </mu-button>
        {{ title }}
        <mu-button icon flat slot="right" @click="$store.dispatch('togglePlayer', true)">
            <mu-icon size="30" value="bar_chart" left  v-show="$route.path!='/login'"></mu-icon>
        </mu-button>
        <!--<mu-menu slot="right">-->
            <!--<mu-button flat>-->
                <!--<mu-icon size="36" value="queue_music" color="white" class="music-icon"></mu-icon>-->
            <!--</mu-button>-->
            <!--<mu-list slot="content">-->
                <!--<mu-list-item button>-->
                    <!--<mu-list-item-content>-->
                        <!--<mu-list-item-title>Menu Item 1</mu-list-item-title>-->
                    <!--</mu-list-item-content>-->
                <!--</mu-list-item>-->
                <!--<mu-list-item button>-->
                    <!--<mu-list-item-content>-->
                        <!--<mu-list-item-title>Menu Item 2</mu-list-item-title>-->
                    <!--</mu-list-item-content>-->
                <!--</mu-list-item>-->
            <!--</mu-list>-->
        <!--</mu-menu>-->
    </mu-appbar>
</template>

<script>
export default {
    name: "navbar",
    props: {
        title: String,
        default: 'title'
    }
};
</script>

<style scoped lang="scss">
.navbar {
    width: 100%;
    text-align: center;
    position: fixed;
    top: 0;
    .mu-button .mu-icon-left {
        margin-right: 0;
    }
}
</style>
