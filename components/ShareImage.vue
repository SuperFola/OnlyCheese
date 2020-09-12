<template>
    <div class='phone-body'>
        <div class='selected-image'
            :class='selectedFilter()'
            :style="{ backgroundImage: 'url(' + image + ')' }">
        </div>
        <div class='caption-container width-90-centered'>
            <textarea class='caption-input textarea'
                placeholder='Write a caption...'
                type='text'
                :value='value'
                @change='setCaption'
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
        setCaption(evt) {
            this.$store.dispatch('saveCaption', evt.target.value);
        },
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>