<template>
    <div class='phone-body'>
        <p>{{ fullname }}</p>
        <a
            @click='logout'>
                Log out
        </a>
    </div>
</template>

<script>
export default {
    name: 'Profil',
    computed: {
        fullname() {
            return this.$store.getters.fullname;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>