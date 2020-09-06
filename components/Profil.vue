<template>
    <div>
        <a
            @click='logout'>
                Log out
        </a>
    </div>
</template>

<script>
export default {
    name: 'Profil',
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>