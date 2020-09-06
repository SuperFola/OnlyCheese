<template>
    <div class='phone-body mt-5 p-5'>
        <mdb-container fluid grid-list-xl>
            <mdb-row>
                <mdb-col col='4'></mdb-col>
                <mdb-col col='4'>
                    <form>
                        <p class='h4 text-center mb-4'>Sign in</p>
                        <div class='grey-text'>
                            <mdb-input name='firstname' id='firstname' label='First name' type='text' />
                            <mdb-input name='lastname' id='lastname' label='Last name' type='text' />
                            <mdb-input v-model='email' label='Your email' icon='envelope' type='email' />
                            <mdb-input v-model='password' label='Your password' icon='lock' type='password' />
                            Profil picture
                            <input type='file'
                                name='file' id='file'
                                class='inputfile'
                                accept='image/*'
                                @change='uploadImage' />
                        </div>
                        <div class='text-center'>
                            <mdb-btn @click.native.prevent='login'>Sign in</mdb-btn>
                        </div>
                    </form>

                </mdb-col>
                <mdb-col col="4"></mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import {
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbInput,
        mdbBtn
    } from 'mdbvue';

export default {
    name: 'Signin',
    data() {
        return {
            email: '',
            password: '',
            image: '',
            firstname: '',
            lastname: '',
        };
    },
    components: {
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbBtn,
        mdbInput,
    },
    methods: {
        login() {
            this.$store.dispatch('signin', {
                email: this.email,
                password: this.password,
                picture: this.image,
                firstname: this.firstname,
                lastname: this.lastname,
            });
        },
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
        },
    },
};
</script>

<style lang='scss' src='../styles/app.scss'>
</style>