<template>
    <div class='phone-body mt-5 p-5'>
        <mdb-container fluid grid-list-xl>
            <mdb-row>
                <mdb-col col='4'></mdb-col>
                <mdb-col col='4'>
                    <form>
                        <p class='h4 text-center mb-4'>Login</p>
                        <div class='grey-text'>
                            <mdb-input v-model='email' label='Your email' icon='envelope' type='email' />
                            <mdb-input v-model='password' label='Your password' icon='lock' type='password' />
                        </div>
                        <div class='text-center'>
                            <mdb-btn @click.native.prevent='login'>Login</mdb-btn>
                            <router-link to='/signin'>Sign in</router-link>
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
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
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
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>

<style lang='scss' src='../styles/app.scss'>
</style>