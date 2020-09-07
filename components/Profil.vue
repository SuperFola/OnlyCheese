<template>
    <div class='phone-body'>
        <p>{{ fullname }}</p>
        <p>{{ email }}</p>
    </div>
</template>

<script>
export default {
    name: 'Profil',
    computed: {
        fullname() { return this.$store.getters.fullname; },
        email() { return this.$store.getters.email; },
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>