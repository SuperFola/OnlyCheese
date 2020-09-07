<template>
    <div class='phone-body'>
        <div class='selected-image'
            :class='selectedFilter()'
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
</template>

<script>
export default {
    name: 'ShareImage',
    data() {
        return {
            image: this.$store.getters.image,
            value: '',
        };
    },
    methods: {
        selectedFilter() {
            return this.$store.getters.filter;
        },
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>