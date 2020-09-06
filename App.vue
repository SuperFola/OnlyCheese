<template>
    <div id='app'>
        <div class='app-phone'>
            <div class='phone-header'>
                <img src='./images/onlycheese-logo.png' />
                <a class='cancel-cta' v-if='step === 2 || step === 3' @click='goToHome'>
                    Cancel
                </a>
                <a class='next-cta' v-if='step === 2' @click='step++'>
                    Next
                </a>
                <a class='next-cta' v-if='step === 3' @click='sharePost'>
                    Share
                </a>
            </div>
            <phone-body
                :step='step'
                :posts='posts'
                :filters='filters'
                :image='image'
                :selectedFilter='selectedFilter'
                v-model='caption' />
            <div class='phone-footer'>
                <div class='home-cta' @click='goToHome'>
                    <i class='fas fa-home fa-lg'></i>
                </div>
                <div class='upload-cta' v-if='step === 1'>
                    <input type='file'
                        name='file' id='file'
                        class='inputfile'
                        accept='image/*'
                        @change='uploadImage' />
                    <label for='file'>
                        <i class='far fa-plus-square fa-lg'></i>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PhoneBody from './components/PhoneBody';
import posts from './data/posts';
import filters from './data/filters';
import EventBus from './event-bus';

export default {
    name: 'App',
    data() {
        return {
            step: 1,
            posts,
            filters,
            image: '',
            selectedFilter: '',
            caption: '',
        };
    },
    components: {
        'phone-body': PhoneBody,
    },
    methods: {
        uploadImage(evt) {
            const files = evt.target.files;
            if (!files.length) return;

            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = evt => {
                this.image = evt.target.result;
                this.step = 2;
            };

            // to enable reuploading of same files in Chrome
            document.querySelector('#file').value = '';
        },
        goToHome() {
            this.image = '';
            this.selectedFilter = '';
            this.caption = '';
            this.step = 1;
        },
        sharePost() {
            const post = {
                username: 'hello-world',
                userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/vue_lg_bg.png',
                postImage: this.image,
                likes: 0,
                caption: this.caption,
                filter: this.selectedFilter,
            };
            this.posts.unshift(post);
            this.goToHome();
        },
    },
    created() {
        EventBus.$on('filter-selected', evt => {
            this.selectedFilter = evt.filter;
        });
    },
};
</script>

<style lang='scss' src='./styles/app.scss'>
</style>