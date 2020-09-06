<template>
    <div class='phone-header'>
        <img src='../images/onlycheese-logo.png' />
        <router-link class='cancel-cta' v-if="$route.name !== 'home'" to='/'>
            Cancel
        </router-link>
        <router-link class='next-cta' v-if="$route.name === 'edit'" to='/share'>
            Next
        </router-link>
        <router-link class='next-cta' v-if="$route.name === 'filters'" to='/'>
            Share
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Header',
};
</script>

<style lang='scss' src='../styles/app.scss'>
</style>