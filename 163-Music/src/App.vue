<template>
    <div id="app">
        <router-view />
        <player></player>
    </div>
</template>

<script>
    import player from './components/player'
    export default {
        components: {
            player
        }
    }
</script>

<style>
    @import './assets/fonts/roboto.css';
    @import './assets/fonts/material-icons.css';
</style>
<style lang="scss">
    @import "./assets/css/index.scss";
</style>
