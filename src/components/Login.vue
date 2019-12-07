<template lang="xtmin">
div .login-wrap
    div .ms-login
        div .ms-title "登录「 阳关三叠 」"
        el-form .ms-content ref=form :model=form :rules=rules
        label-width=60px label-position=right :hide-required-asterisk=true
            el-form-item prop=loginName label=用户名
                el-input v-model=form.loginName
            el-form-item prop=password label=密码
                el-input type=password v-model=form.password
            div .login-btn
                el-button type=primary @click=submit "登&nbsp;&nbsp;&nbsp;&nbsp;录"
</template>

<script>
export default {
    data: function() {
        return {
            form: {
                loginName: '',
                password: ''
            },
            rules: {
                loginName: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate((isSuccess) => {
                if (isSuccess) {
                    this.$utils.post(
                        this,
                        this.$config.dataServer+'/web/login/login',
                        this.form,
                        (data) => {
                            this.$z.cookie.set('jwt', data)
                            this.$utils.post(
                                this,
                                this.$config.dataServer+'/web/user/getUserInfo',
                                null,
                                (user)=>{
                                    for (let key in user) {
                                        this.$store.commit('user/setValue', {key, value: user[key]})
                                    }
                                    this.$router.push({path: '/home'})
                                }
                            )
                        }
                    )
                }
            })
        },
    }
}
</script>

<style lang="stylus">
.login-wrap
    position: relative
    width: 100vw
    height: 100vh
    background-color: #f9f9f9

.ms-title
    position: absolute
    top: -50px
    width: 100%
    line-height: 50px
    text-align: center
    font-size: 20px

.ms-login
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    width: 400px
    height: 220px
    margin: auto
    border-radius: 5px
    background: #fff
    overflow: visible
    border: 1px #bbb solid

.ms-content
    padding: 30px 30px

.login-btn button
    width: 100%
</style>
