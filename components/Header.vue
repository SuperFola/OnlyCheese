<template>
    <div class='phone-header'>
        <router-link to='/about'>
            <img src='../images/onlycheese-logo.png' />
        </router-link>
        <span class='cancel-cta' v-if='canShowCancel' @click='goBack'>
            Cancel
        </span>
        <router-link class='next-cta' v-if="$route.name === 'edit'" to='/share'>
            Next
        </router-link>
        <a class='next-cta' v-if="$route.name === 'share'" @click='share'>
            Share
        </a>
        <router-link class='next-cta' v-if="$route.name === 'home'" to='/profile'>
            <figure class='image is-32x32 profilepicture'>
                <img :src='userImage' class='profilepicture' />
            </figure>
        </router-link>
        <a class='next-cta' v-if="$route.name === 'profile'"
            @click='logout'>
                Log out
        </a>
    </div>
</template>

<script>
export default {
    name: 'Header',
    computed: {
        canShowCancel() {
            return this.$route.name === 'edit'
                || this.$route.name === 'share'
                || this.$route.name === 'about'
                || this.$route.name === 'delete';
        },
        userImage() { return this.$store.getters.userImage; },
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
        share() {
            this.$store.dispatch('uploadImage');
            this.$router.push({ name: 'home', });
        },
        goBack() {
            // special behaviour to go back to the correct page
            if (this.$router.name === 'about')
                this.$router.push({ name: this.$store.getters.historyLastDiff, });
            else
                this.$router.push({ name: 'home', });
        },
    },
};
</script>

<style lang='scss' src='../styles/app.scss'>
</style>