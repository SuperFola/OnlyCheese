<template>
    <div class='phone-body'>
        <div class='container width-90-centered center-vertical'>
            <div class='notification'>
                <p v-if="error_msg !== ''">{{ error_msg }}</p>
                <div class='field'>
                    <label class='label'>Enter your password to confirm</label>
                    <div class='control has-icons-left'>
                        <input class='input is-rounded' placeholder='******' v-model='password' type='password' />
                        <span class='icon is-small is-left'>
                            <i class='fas fa-lock'></i>
                        </span>
                    </div>
                </div>
                <div class='field'>
                    <div class='control'>
                        <button class='button is-danger' @click='deleteAccount'>Delete my account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Auth } from '../firebase/auth';

export default {
    name: 'DeleteAccount',
    data() {
        return {
            password: '',
            error_msg: '',
        };
    },
    methods: {
        deleteAccount() {
            Auth.currentUser.reauthenticateWithCredentials({
                email: this.$store.getters.email,
                password: this.password,
            }).then(() => {
                Auth.currentUser.delete()
                .then(() => {
                    this.$router.push({ name: 'login', });
                });
            }).catch(() => {
                this.error_msg = 'Wrong password or couldn\'t reach the server';
            });
        },
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>