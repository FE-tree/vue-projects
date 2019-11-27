<template>
    <div class="login">
        <navbar title="登录"></navbar>

        <mu-card class="login-wrp">
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item label="手机号/邮箱" prop="username" :rules="phoneRules">
                    <mu-text-field v-model="validateForm.phone" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="isRemember">
                    <mu-checkbox label="记住账号" v-model="validateForm.isRemember"></mu-checkbox>
                </mu-form-item>
                <mu-form-item>
                    <mu-button class="btn" @click="clear">重置</mu-button>
                    <mu-button class="btn" color="primary" @click="submit">提交</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-card>

        <!--<mu-card>-->
            <!--<mu-text-field v-model="field.username" label="UserName" label-float help-text="用户名为6-12长度的字符" icon="account_circle"></mu-text-field><br/>-->
            <!--<mu-text-field v-model="field.password" label="Password" label-float error-text="请输入密码" icon="locked"></mu-text-field><br/>-->
        <!--</mu-card>-->
    </div>
</template>

<script>
    import navbar from '../components/navbar'
export default {
    name: "login",
    components: {
        navbar
    },
    data() {
        return {
            phoneRules: [
                { validate: (val) => !!val, message: '必须填写用户名' },
                { validate: (val) => val.length > 11, message: '手机号/邮箱长度大于11' }
            ],
            passwordRules: [
                { validate: (val) => !!val, message: '必须填写密码' },
                { validate: (val) => val.length >= 6 && val.length <= 18, message: '密码长度大于6小于18' }
            ],
            validateForm: {
                phone: '',
                password: '',
                isRemember: false
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate().then((result) => {
                console.log('form valid: ', result)
                if(result) {
                    this.validateForm.phone
                }
            });
        },
        clear() {
            this.$refs.form.clear();
            this.validateForm = {
                username: '',
                password: '',
                isRemember: false
            };
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .login {
        width: 100%;
        height: 100vh;
        position: relative;
        .login-wrp {
            width: calc(100% - 20px);
            margin-top: -177.75px !important;
            position: absolute;
            top: 50%;
            left: 10px;
            .mu-demo-form {
                width: 90%;
                margin: 5% auto;
                padding-top: 20px;
                .btn {
                    flex: 1;
                }
            }
        }
    }
</style>
