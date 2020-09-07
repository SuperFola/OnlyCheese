<template>
    <div class='phone-body'>
        <div>
            <h2>Account details</h2>
            <p>These are not shown to the public</p>
            <p>Name: {{ fullname }}</p>
            <p>Email: {{ email }}</p>
            <p>Total received likes: {{ received_likes }}</p>
        </div>
        <h2>{{ fullname }} posts</h2>
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
import { DB } from '../firebase/db';
import { Storage } from '../firebase/storage';

export default {
    name: 'Profile',
    data() {
        return {
            posts: [],
            received_likes: 0,
        };
    },
    computed: {
        fullname() { return this.$store.getters.fullname; },
        email() { return this.$store.getters.email; },
    },
    components: {
        'onlycheese-post': OnlycheesePost,
    },
    methods: {
        listPosts() {
            // reset data first
            this.posts = [];
            this.received_likes = 0;

            // then fetch my boiiiiiis
            DB.collection('posts').get().then(snapshot => {
                snapshot.forEach(doc => {
                    // get user details only for the current logged in user
                    if (doc.data().userId === this.$store.getters.idToken) {
                        // get image link
                        Storage.ref().child('posts').child(doc.id).getDownloadURL().then(url => {
                            DB.collection('users').doc(doc.data().userId).get().then(user => {
                                // get user profile picture
                                Storage.ref().child('images').child(user.data().picture).getDownloadURL().then(pp => {
                                    // add post to the top
                                    this.posts.unshift({
                                        username: `${user.data().firstname} ${user.data().lastname}`,
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