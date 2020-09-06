<template>
    <div class="phone-body">
        <div class="feed">
            <onlycheese-post v-for="post in posts"
                :post="post"
                :key="posts.indexOf(post)">
            </onlycheese-post>
        </div>
    </div>
</template>

<script>
import OnlycheesePost from './OnlycheesePost';

export default {
    name: 'PhoneBody',
    props: {
        posts: Array,
        filters: Array,
    },
    components: {
        'onlycheese-post': OnlycheesePost,
    },
};
</script>

<style lang="scss" src="../styles/phone-body.scss">
// styles from stylesheet
</style>