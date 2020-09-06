<template>
    <div class='phone-header'>
        <img src='../images/onlycheese-logo.png' />
        <router-link class='cancel-cta' v-if="$route.name === 'edit' || $route.name === 'share'" to='/'>
            Cancel
        </router-link>
        <router-link class='next-cta' v-if="$route.name === 'edit'" to='/share'>
            Next
        </router-link>
        <router-link class='next-cta' v-if="$route.name === 'share'" to='/'>
            Share
        </router-link>
        <router-link class='next-cta' v-if="$route.name === 'home'" to='/profil'>
            <figure class='image is-32x32 profilepicture'>
                <img :src='userImage()' class='profilepicture' />
            </figure>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        userImage() {
            return this.$store.getters.userImage;
        },
    },
};
</script>

<style lang='scss' src='../styles/app.scss'>
</style>