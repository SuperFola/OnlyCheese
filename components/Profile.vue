<template>
    <div class='phone-body'>
        <div class='width-90-centered'>
            <div class='profiletoppic profilepicture'>
                <figure class='image is-64x64 profilepicture'>
                    <img :src='userImage' class='profilepicture' />
                </figure>
            </div>
            <div class='profiletext profiletop'>
                <h1 class='is-size-4'>{{ nickname }}</h1>
                <b>Total likes received</b>: {{ received_likes }}
            </div>
        </div>
        <div class='tabs is-fullwidth' style='margin-bottom: 10px;'>
            <ul>
                <li
                    :class="tab === 'feed' ? 'is-active' : ''"
                    @click='showFeed'>
                    <a>
                        <span class='icon is-small'><i class='fas fa-image' aria-hidden='true'></i></span>
                        <span>My posts</span>
                    </a>
                </li>
                <li :class="tab === 'settings' ? 'is-active' : ''"
                    @click='showSettings'>
                    <a>
                        <span class='icon is-small'><i class='fas fa-user-cog' aria-hidden='true'></i></span>
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class='feed' v-show="tab === 'feed'" v-dragscroll.y>
            <onlycheese-post v-for='post in posts'
                :post='post'
                :key='posts.indexOf(post)'>
            </onlycheese-post>
        </div>
        <settings v-show="tab === 'settings'" />
    </div>
</template>

<script>
import OnlycheesePost from './OnlycheesePost';
import Settings from './Settings';

import { DB } from '../firebase/db';
import { Storage } from '../firebase/storage';

export default {
    name: 'Profile',
    data() {
        return {
            posts: [],
            received_likes: 0,
            tab: 'feed',
        };
    },
    computed: {
        nickname() { return this.$store.getters.nickname; },
        userImage() { return this.$store.getters.userImage; },
    },
    components: {
        'onlycheese-post': OnlycheesePost,
        'settings': Settings,
    },
    methods: {
        showFeed() {
            this.tab = 'feed';
        },
        showSettings() {
            this.tab = 'settings';
        },
        listPosts() {
            // reset data first
            this.posts = [];
            this.received_likes = 0;

            // then fetch my boiiiiiis
            DB.collection('posts').get().then(snapshot => {
                snapshot.forEach(doc => {
                    // get user details only for the current logged in user
                    if (doc.data().userId === this.$store.getters.userId) {
                        // get image link
                        Storage.ref().child('posts').child(doc.id).getDownloadURL().then(url => {
                            DB.collection('users').doc(doc.data().userId).get().then(user => {
                                // get user profile picture
                                Storage.ref().child('images').child(this.$store.getters.userId).getDownloadURL().then(pp => {
                                    // add post to the top
                                    this.posts.unshift({
                                        username: user.data().nickname,
                                        userImage: pp,
                                        postImage: url,
                                        likes: doc.data().likes,
                                        hasBeenLiked: false,
                                        caption: doc.data().caption,
                                        filter: doc.data().filter,
                                    });
                                    // update likes counter
                                    this.received_likes += doc.data().likes;
                                });
                            });
                        });
                    }
                });
            });
        },
    },
    created() {
        this.listPosts();
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>