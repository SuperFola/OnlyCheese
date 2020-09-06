<template>
    <div id='app'>
        <div class='app-phone'>
            <onlycheese-header />
            <router-view></router-view>
            <onlycheese-footer />
        </div>
    </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    name: 'App',
    components: {
        'onlycheese-header': Header,
        'onlycheese-footer': Footer,
    },
};
</script>

<style lang='scss' src='./styles/app.scss'>
</style>