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
import FilterType from './FilterType';

export default {
    name: 'EditImage',
    components: {
        'filter-type': FilterType,
    },
}
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>