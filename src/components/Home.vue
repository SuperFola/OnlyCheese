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

import { DB } from '../firebase/db';
import { Storage } from '../firebase/storage';
import filters from '../data/filters';

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
        ];

        return {
            posts,
            filters,
        };
    },
    components: {
        'onlycheese-post': OnlycheesePost,
    },
    methods: {
        fetchPosts() {
            DB.collection('posts').get().then(snapshot => {
                snapshot.forEach(doc => {
                    // get image link
                    Storage.ref().child('posts').child(doc.id).getDownloadURL().then(url => {
                        // get user details
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
                            });
                        });
                    });
                });
            });
        },
    },
    created() {
        this.fetchPosts();
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>