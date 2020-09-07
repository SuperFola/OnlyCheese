<template>
    <div class='phone-header'>
        <img src='../images/onlycheese-logo.png' />
        <router-link class='cancel-cta' v-if="$route.name === 'edit' || $route.name === 'share'" to='/'>
            Cancel
        </router-link>
        <router-link class='next-cta' v-if="$route.name === 'edit'" to='/share'>
            Next
        </router-link>
        <a class='next-cta' v-if="$route.name === 'share'" @click='share'>
            Share
        </a>
        <router-link class='next-cta' v-if="$route.name === 'home'" to='/profile'>
            <figure class='image is-32x32 profilepicture'>
                <img :src='userImage()' class='profilepicture' />
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
    methods: {
        userImage() {
            return this.$store.getters.userImage;
        },
        logout() {
            this.$store.dispatch('logout');
        },
        share() {
            this.$store.dispatch('uploadImage');
            this.$router.push({ name: 'home', });
        },
    },
};
</script>

<style lang='scss' src='../styles/app.scss'>
</style>