<template>
    <mu-bottom-nav :value.sync="shift" shift class="bottom-nav">
        <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="music" title="Music" icon="music_note"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="books" title="Books" icon="books"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"></mu-bottom-nav-item>
    </mu-bottom-nav>
    <!--<mu-bottom-nav>-->
        <!--<mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>-->
        <!--<mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>-->
        <!--<mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>-->
    <!--</mu-bottom-nav>-->
</template>

<script>
    export default {
        name: "bottom-nav",
        data() {
            return {
                shift:'movies'
            }
        },
    }
</script>

<style scoped>
.bottom-nav {
    position: fixed;
    bottom: 0;
}
</style>