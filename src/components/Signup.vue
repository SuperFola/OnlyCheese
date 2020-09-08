<template>
    <div class='phone-body'>
        <p v-if='error !== null'>{{ error }}</p>
        <div class='width-80-centered'>
            <div class='field'>
                <label class='label'>First name</label>
                <div class='control'>
                    <input v-model='firstname' class='input is-rounded' placeholder='John' type='text' />
                </div>
            </div>
            <div class='field'>
                <label class='label'>Last name</label>
                <div class='control'>
                    <input v-model='lastname' class='input is-rounded' placeholder='Doe' type='text' />
                </div>
            </div>
            <div class='field'>
                <label class='label'>Email</label>
                <div class='control has-icons-left'>
                    <input class='input is-rounded' placeholder='john@doe.com' v-model='email' type='email' />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>
            <div class='field'>
                <label class='label'>Password</label>
                <div class='control has-icons-left'>
                    <input class='input is-rounded' placeholder='******' v-model='password' type='password' />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </div>
            </div>
            <div class='field'>
                <div class='file'>
                    <label class='file-label'>
                        <input type='file'
                            class='file-input'
                            accept='image/*'
                            @change='uploadImage' />
                        <span class='file-cta'>
                            <span class='file-icon'>
                                <i class='fas fa-upload'></i>
                            </span>
                            <span class='file-label'>
                                Upload profile picture...
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            <div class='field is-grouped'>
                <div class='control'>
                    <button class='button is-primary' @click='signup'>Sign up</button>
                </div>
                <div class='control'>
                    <button class='button is-light' @click='login'>Log in</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data() {
        return {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            picture: '',
            error : null,
        };
    },
    methods: {
        signup() {
            this.$store.dispatch('signup', {
                email: this.email,
                password: this.password,
                picture: this.picture,
                firstname: this.firstname,
                lastname: this.lastname,
            }).then(msg => {
                if (msg !== null)
                    this.error = msg;
            });
        },
        login() {
            this.$router.push({ name: 'login', });
        },
        uploadImage(evt) {
            const files = evt.target.files;
            if (!files.length) return;

            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = evt => {
                this.picture = evt.target.result;
            };

            // to enable reuploading of same files in Chrome
            document.querySelector('#file').value = '';
        },
    },
};
</script>

<style lang='scss' src='../styles/app.scss'>
</style>