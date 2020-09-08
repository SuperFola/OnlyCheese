<template>
    <div class='phone-body'>
        <div class='selected-image'
            :class='selectedFilter()'
            :style="{ backgroundImage: 'url(' + image() + ')' }">
        </div>
        <div class='filter-container' v-dragscroll.x>
            <filter-type v-for='filter in filters'
                :filter='filter'
                :image='image()'
                :key='filters.indexOf(filter)'>
            </filter-type>
        </div>
    </div>
</template>

<script>
import FilterType from './FilterType';
import filters from '../data/filters';

export default {
    name: 'EditImage',
    data() {
        return {
            filters: filters,
        };
    },
    components: {
        'filter-type': FilterType,
    },
    methods: {
        selectedFilter() {
            return this.$store.getters.filter;
        },
        image() {
            return this.$store.getters.image;
        },
    },
}
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>