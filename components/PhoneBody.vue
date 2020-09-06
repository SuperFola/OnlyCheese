<template>
    <div class='phone-body'>
        <div v-if='step === 3'>
            <div class='selected-image'
                :class='selectedFilter'
                :style="{ backgroundImage: 'url(' + image + ')' }">
            </div>
            <div class='caption-container'>
                <textarea class='caption-input'
                    placeholder='Write a caption...'
                    type='text'
                    :value='value'
                    @input="$emit('input', $event.target.value)">
                </textarea>
            </div>
        </div>
    </div>
</template>

<script>
import OnlycheesePost from './OnlycheesePost';
import FilterType from './FilterType';

export default {
    name: 'PhoneBody',
    props: {
        posts: Array,
        filters: Array,
        image: String,
        selectedFilter: String,
        value: String,
    },
    components: {
        'onlycheese-post': OnlycheesePost,
        'filter-type': FilterType,
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>