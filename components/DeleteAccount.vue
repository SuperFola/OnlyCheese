<template>
    <div class='phone-body'>
        <div class='container width-90-centered center-vertical'>
            <div class='container' v-if='error_msg !== null'>
                <div class='notification is-danger'>
                    <button class='delete' @click="error_msg = null"></button>
                    {{ error_msg }}
                </div>
                <br>
            </div>

            <div class='notification'>
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
import firebase from 'firebase';
import { logInEmailPassword } from '../firebase/auth';
import { deleteUser } from '../firebase/db';

export default {
    name: 'DeleteAccount',
    data() {
        return {
            password: '',
            error_msg: null,
        };
    },
    methods: {
        deleteAccount() {
            // finally delete the user account
            logInEmailPassword(this.$store.getters.email, this.password,
                async userId => {
                    // check for the right password first
                    // and then delete user data from firebase as well
                    deleteUser(userId);

                    // delete it from the user auth db
                    firebase.auth().currentUser.delete()
                    .then(() => {
                        this.$store.dispatch('logout');
                        this.$router.push({ name: 'login', });
                    })
                    .catch(error => {
                        this.error_msg = 'An error occured while trying to delete the account: ' + error.message;
                    });
                },
                error => {
                    this.message = error.message;
                    this.type = 'danger';
                },
            );
        },
    },
};
</script>

<style lang='scss' src='../styles/phone-body.scss'>
</style>