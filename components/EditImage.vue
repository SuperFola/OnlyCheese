<template>
    <div class="phone-body">
        <div class='selected-image'
            :class='selectedFilter'
            :style="{ backgroundImage: 'url(' + image + ')' }">
        </div>
        <div class='filter-container' v-dragscroll.x>
            <filter-type v-for='filter in filters'
                :filter='filter'
                :image='image'
                :key='filters.indexOf(filter)'>
            </filter-type>
        </div>
    </div>
</template>

<script>
import store from '../store';
import FilterType from './FilterType';
import filters from '../data/filters';

export default {
    name: 'EditImage',
    data() {
        return {
            filters: filters,
            image: store.getters.image,
        };
    },
    components: {
        'filter-type': FilterType,
    },
}
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>