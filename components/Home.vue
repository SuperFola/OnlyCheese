<template>
    <div class='phone-body'>
        <div class='feed' v-dragscroll.y>
            <onlycheese-post v-for='post in posts'
                :post='post'
                :key='posts.indexOf(post)'>
            </onlycheese-post>
        </div>
    </div>
</template>

<script>
import OnlycheesePost from './OnlycheesePost';

import filters from '../data/filters';
import EventBus from '../event-bus';

export default {
    name: 'Home',
    data() {
        // TODO fixe me and use firebase to retrieve posts
        let posts = [
            {
                username: "CheesyLady",
                userImage: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me_3.jpg",
                postImage:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Trappista_cheese_original.jpg/1280px-Trappista_cheese_original.jpg",
                likes: 36,
                hasBeenLiked: true,
                caption: "When you're ready for summer '20 ☀️",
                filter: "perpetua"
            },
            {
                username: "djirdehh",
                userImage: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me2.png",
                postImage:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Cowgirl_Creamery_Point_Reyes_-_Red_Hawk_cheese.jpg/390px-Cowgirl_Creamery_Point_Reyes_-_Red_Hawk_cheese.jpg",
                likes: 20,
                hasBeenLiked: false,
                caption: "Views from the six...",
                filter: "clarendon"
            },
            {
                username: "puppers",
                userImage:
                    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/pug_personal.jpg",
                postImage:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/2015-01-06_Wiki_Loves_Cheese_Racletteessen_bei_WMAT_7654.jpg/1200px-2015-01-06_Wiki_Loves_Cheese_Racletteessen_bei_WMAT_7654.jpg",
                likes: 49,
                hasBeenLiked: true,
                caption: "Current mood 🐶",
                filter: "lofi"
            }
        ];

        return {
            posts,
            filters,
            image: '',
            selectedFilter: '',
            caption: '',
        };
    },
    components: {
        'onlycheese-post': OnlycheesePost,
    },
    methods: {
        sharePost() {
            // TODO fixe me and use firebase
            const post = {
                username: 'hello-world',
                userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/vue_lg_bg.png',
                postImage: this.image,
                likes: 0,
                caption: this.caption,
                filter: this.selectedFilter,
            };
            this.posts.unshift(post);
            this.$router.push({ name: 'home', });
        },
    },
    created() {
        EventBus.$on('filter-selected', evt => {
            this.selectedFilter = evt.filter;
        });
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>