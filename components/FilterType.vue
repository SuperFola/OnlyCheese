<template>
    <div class='filter-type'>
        <p>{{ filter.name }}</p>
        <div class='img'
            :class='filter.name'
            :style="{ backgroundImage: 'url(' + image + ')' }"
            @click='selectFilter'>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterType',
    props: {
        filter: Object,
        image: String,
    },
    methods: {
        selectFilter() {
            this.$store.dispatch('saveFilter', this.filter.name);
        },
    },
};
</script>

<style lang="scss" src="../styles/filter-type.scss">
</style>