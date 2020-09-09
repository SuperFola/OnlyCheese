<template>
    <div class='settings' v-dragscroll.y>
        <div class='container settings-field'>
            <div class='notification'>
                <label class='label'>Account details</label>
                <p>Joined in {{ joined_date }}</p>
            </div>
            <div class='notification' :class='"is-" + type' v-if='message !== null'>
                <button class='delete' @click="message = null"></button>
                {{ message }}
            </div>
            <div class='notification'>
                <div class='field'>
                    <label class='label'>Nickname</label>
                    <div class='control has-icons-left'>
                        <input class='input is-rounded' :placeholder='nickname' v-model='new_nickname' type='text' />
                        <span class='icon is-small is-left'>
                            <i class='fas fa-user-tag'></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class='notification'>
                <div class='field'>
                    <label class='label'>Old password</label>
                    <div class='control has-icons-left'>
                        <input class='input is-rounded' placeholder='******' v-model='password' type='password' />
                        <span class='icon is-small is-left'>
                            <i class='fas fa-lock'></i>
                        </span>
                    </div>
                </div>
                <div class='field'>
                    <label class='label'>New password</label>
                    <div class='control has-icons-left'>
                        <input class='input is-rounded' placeholder='******' v-model='password_new' type='password' />
                        <span class='icon is-small is-left'>
                            <i class='fas fa-lock'></i>
                        </span>
                    </div>
                </div>
                <div class='field'>
                    <label class='label'>Repeat new password</label>
                    <div class='control has-icons-left'>
                        <input class='input is-rounded' placeholder='******' v-model='password_new_bis' type='password' />
                        <span class='icon is-small is-left'>
                            <i class='fas fa-lock'></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class='field settings-field settings-save-btn'>
            <div class='control'>
                <button class='button is-primary' @click='saveSettings'>Save</button>
            </div>
        </div>
        <div class='container settings-field'>
            <div class='notification'>
                <div class='field'>
                    <label class='label'>Danger zone!</label>
                    <div class='control'>
                        <button class='button is-danger' @click='deleteAccount'>Delete my account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { logInEmailPassword } from '../firebase/auth';
import firebase from 'firebase';
import { updateUser } from '../firebase/db';

export default {
    name: 'Settings',
    data() {
        return {
            nickname: this.$store.getters.nickname,
            new_nickname: '',

            password: '',
            password_new: '',
            password_new_bis : '',

            message: null,
            type: 'danger',
        };
    },
    computed: {
        joined_date() { return 'December 2020'; },
    },
    methods: {
        saveSettings() {
            // setting new password if asked for
            if (this.password !== '') {
                if (this.password_new.length < 6) {
                    this.message = 'New password must contain at least 6 characters';
                    this.type = 'danger';
                } else if (this.password_new !== '' && this.password_new !== this.password_new_bis) {
                    this.message = 'The password don\'t match';
                    this.type = 'danger';
                } else {
                    logInEmailPassword(this.$store.getters.email, this.password,
                        async () => {
                            firebase.auth().currentUser.updatePassword(this.password_new);
                            this.message = 'Password updated';
                            this.type = 'success';
                        },
                        error => {
                            this.message = error.message;
                            this.type = 'danger';
                        },
                    );
                }
            }
            // update nickname if modified
            if (this.new_nickname !== '') {
                updateUser(this.$store.getters.userId, { nickname: this.new_nickname, });
                // update in our store
                this.$store.dispatch('updateNickname', this.new_nickname);

                this.message = 'Nickname updated';
                this.type = 'success';
            }
        },
        deleteAccount() {
            this.$router.push({ name: 'delete', });
        },
    },
};
</script>

<style lang='scss' src='../styles/settings.scss'>
</style>