<template>
    <div class='phone-footer'>
        <router-link to='/' class='home-cta' v-if="$route.name !== 'login' && $route.name !== 'signup'">
            <i class='fas fa-home fa-lg'></i>
        </router-link>
        <div class='center' v-if='isLoginOrSignup'>
            <p>
                <i>Show cuterie</i>
            </p>
            <p>
                ©2020 - <a href='https://twitter.com/lexplt'>Alexandre Plateau</a>
            </p>
        </div>
        <div class='upload-cta' v-if="$route.name === 'home'">
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
</template>

<script>
export default {
    name: 'Footer',
    computed: {
        isLoginOrSignup() { return this.$route.name === 'login' || this.$route.name === 'signup'; },
    },
    methods: {
        uploadImage(evt) {
            const files = evt.target.files;
            if (!files.length) return;

            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = evt => {
                this.$store.dispatch('saveImage', evt.target.result);
            };

            // to enable reuploading of same files in Chrome
            document.querySelector('#file').value = '';

            // go to the next page, /edit
            this.$router.push({ name: 'edit', });
        }
    },
};
</script>

<style lang='scss' src='../styles/app.scss'>
</style>