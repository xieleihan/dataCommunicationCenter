<template>
    <keep-alive>
        <div class="inputBox">
            <el-form class="form" :model="form" label-width="auto" :rules="rules" ref="formRef">
                <div class="content">
                    <el-form-item v-if="!isLoginOrRegister" prop="useremail">
                        <el-input v-model="form.useremail" class="input" placeholder="请输入邮箱" clearable />
                    </el-form-item>
                    <el-form-item v-if="!isLoginOrRegister" prop="verifyuseremail">
                        <div class="emailVerify">
                            <el-input v-model="form.verifyuseremail" class="input" placeholder="请输入邮箱验证码" clearable />
                            <el-button :disabled="isEmailVerifyButtonDisabled" @click="sendEmailVerifyCode" class="input">{{ emailVerifyText }}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input v-model="form.username" class="input" placeholder="请输入用户名" clearable />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" type="password" class="input" placeholder="请输入密码" clearable />
                    </el-form-item>
                    <el-form-item prop="verify">
                        <div style="display: flex;width: 100%;">
                            <el-input style="width: 200%;" maxLength="6" v-model="form.verify" class="input" placeholder="请输入验证码"
                                clearable />
                            <div @click="updataSvgImg" class="verify" v-html="svgImg"></div>
                        </div>
                    </el-form-item>
                    <div class="prompt">
                        <span v-if="isLoginOrRegister">忘记密码</span>
                        <div v-else>
                            <el-form-item prop="agree">
                                <el-checkbox v-model="form.agree" class="checkbox">我已阅读并同意<span
                                        class="link"><router-link
                                            to="/privacy?page=useragreement">《用户协议》</router-link></span>和<span
                                        class="link"><router-link
                                            to="/privacy?page=privacypolicy">《隐私政策》</router-link></span></el-checkbox>
                            </el-form-item>
                        </div>
                        <span><span v-if="isLoginOrRegister">没有账号</span><span v-else>已有账号</span>,<router-link
                                to="/register" v-if="isLoginOrRegister"
                                class="goToRegister">立即注册</router-link><router-link v-else class="goToRegister"
                                to="/start">立即登录</router-link></span>
                    </div>
                </div>
                <el-form-item>
                    <el-button v-if="isLoginOrRegister" type="primary" @click="validate" class="btn">登录</el-button>
                    <el-button v-else type="primary" @click="validate" class="btn">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </keep-alive>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { getImgVerify, getEmailVerifyCode, superAdminRegister, superAdminLogin } from '../../api/request';
import { setSessionStronge } from '../../utils/strongIndex';
import {
    ref, onMounted
} from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie'

 // 传递的登陆还是注册
const props = defineProps({
    isLoginOrRegister: Boolean
});

const router = useRouter(); // 路由实例

let count = ref(180); // 倒计时总秒数
const storedDisabledTime = window.sessionStorage.getItem('isEmailVerifyButtonDisabledTime');
if (storedDisabledTime) {
    count.value = parseInt(storedDisabledTime, 10); // 恢复倒计时时间
}
let intervalId = null; // 3分钟倒计时

const svgImg = ref(''); // 图片验证码
const emailVerifyText = ref('发送验证码'); // 邮箱验证码按钮文字
const isEmailVerifyButtonDisabled = ref(false); // 邮箱验证码按钮是否禁用

// 页面挂载的时候需要执行的
onMounted(() => {
    // 获取图片验证码
    getImgVerify({}).then((res) => {
        console.log(res);
        svgImg.value = res.data;
        setSessionStronge('captcha', res.key);
    })

    // 检查 sessionStorage 中的状态
    const storedDisabledState = window.sessionStorage.getItem('isEmailVerifyButtonDisabled');
    if (storedDisabledState === 'true' && count.value > 0) {
        isEmailVerifyButtonDisabled.value = true; // 恢复按钮状态
        emailVerifyText.value = `请在${count.value}秒后点击`; // 恢复按钮文字
        intervalId = setInterval(() => {
            window.sessionStorage.setItem('isEmailVerifyButtonDisabledTime', count.value); // 存储状态到sessionStorage
            if (count.value <= 0) {
                clearInterval(intervalId);
                intervalId = null;
                emailVerifyText.value = '重新发送验证码';
                count.value = 180; // 重置倒计时
                isEmailVerifyButtonDisabled.value = false; // 恢复按钮状态
                window.sessionStorage.setItem('isEmailVerifyButtonDisabled', 'false'); // 恢复状态到sessionStorage
                return;
            }
            emailVerifyText.value = `请在${count.value--}秒后点击`;
        }, 1000);
    } else {
        isEmailVerifyButtonDisabled.value = false;
    }
});

const form = ref({
    username: '',
    password: '',
    verify: '',
    useremail: '',
    verifyuseremail: '',
    agree: false
});

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    verify: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '长度为6个字符', trigger: 'blur' }
    ],
    useremail: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
    ],
    verifyuseremail: [
        { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '长度为6个字符', trigger: 'blur' }
    ],
    agree: [
        { required: true, message: '请同意协议', trigger: 'change' }
    ]
};
const formRef = ref(null);
const validate = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            // 判断是登录还是注册
            if (props.isLoginOrRegister) {
                // 登录
                superAdminLogin({
                    username: form.value.username,
                    userpassword: form.value.password,
                    code: form.value.verify,
                    key: JSON.parse(window.sessionStorage.getItem('captcha')) // 获取图片验证码key
                }).then((res) => {
                    if (res.code === 200) {
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                            duration: 2000
                        });
                        const expireTime = new Date();
                        expireTime.setTime(expireTime.getTime() + 12 * 60 * 60 * 1000); // 当前时间 + 12 小时

                        Cookies.set('AUTO_TOKEN', res.token, { expires: expireTime }); // 设置 cookie 有效期为 12 小时
                        // 跳转到首页
                        router.push('/home/overview');
                    } else {
                        ElMessage({
                            message: res.msg || '登录失败，请稍后再试',
                            type: 'error',
                            duration: 2000
                        });
                    }
                }).catch((err) => {
                    console.error(err);
                    ElMessage({
                        message: '登录失败，请稍后再试',
                        type: 'error',
                        duration: 2000
                    });
                });
            } else {
                // 注册
                superAdminRegister({
                    username: form.value.username,
                    userpassword: form.value.password,
                    code: form.value.verify,
                    useremail: form.value.useremail,
                    emailVerCode: form.value.verifyuseremail,
                    key: JSON.parse(window.sessionStorage.getItem('captcha')), // 获取图片验证码key
                    // emailKey: window.sessionStorage.getItem('emailKey') // 获取邮箱验证码key
                }).then((res) => {
                    if (res.code === 200) {
                        ElMessage({
                            message: '注册成功，请登录',
                            type: 'success',
                            duration: 2000
                        });
                        // 跳转到登录页面
                        router.push('/start');
                    } else {
                        ElMessage({
                            message: res.msg || '注册失败，请稍后再试',
                            type: 'error',
                            duration: 2000
                        });
                    }
                }).catch((err) => {
                    console.error(err);
                    ElMessage({
                        message: '注册失败，请稍后再试',
                        type: 'error',
                        duration: 2000
                    });
                })
            }
        } else {
            console.log('error submit!!');
            return false;
        }
    });
};

// 发送邮箱验证码
const sendEmailVerifyCode = () => {
    if (form.value.useremail === '') {
        return;
    }

    getEmailVerifyCode({
        email : form.value.useremail,
    }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                message: '验证码已发送，请注意查收',
                type: 'success',
                duration: 2000
            });
            // window.sessionStorage.setItem('emailKey', res.key); // 存储验证码key到sessionStorage
        }
    }).catch((err) => {
        // console.error(err);
        ElMessage({
            message: '验证码发送失败，请稍后再试',
            type: 'error',
            duration: 2000
        });
    });

    isEmailVerifyButtonDisabled.value = true; // 禁用按钮
    window.sessionStorage.setItem('isEmailVerifyButtonDisabled', 'true'); // 存储状态到sessionStorage

    
    // 开启文字计时3分钟倒计时
    if (intervalId !== null) {
        return;
    }
    intervalId = setInterval(() => {
        window.sessionStorage.setItem('isEmailVerifyButtonDisabledTime', count.value); // 存储状态到sessionStorage
        if (count.value <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            emailVerifyText.value = '重新发送验证码';
            isEmailVerifyButtonDisabled.value = false; // 恢复按钮状态
            count.value = 180; // 重置倒计时
            window.sessionStorage.setItem('isEmailVerifyButtonDisabled', 'false'); // 恢复状态到sessionStorage
            return;
        }
        emailVerifyText.value = `请在${count.value--}秒后点击`;
        
    },1000)
};

// 更新图片验证码图片
const updataSvgImg = () => {
    getImgVerify({}).then((res) => {
        // console.log(res);
        svgImg.value = res.data;
        setSessionStronge('captcha', res.key);
    });
};
</script>

<style lang="scss" scoped>
@import '../../styles/base.module.scss';
.inputBox {
    width: 100%;
    height: 2rem;

    .form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;

        ::v-deep(.input) {
            height: .3rem;

            .el-input__wrapper {
                background-color: rgba($color: #fff, $alpha: .8);
            }
        }

        .link{
            color: $googleBlue;
        }

        .verify{
            width: 100%;
            height: .3rem;
            background-color: white;
            svg{
                width: 100%;
                height: 100%;
            }
        }
        .emailVerify{
            width: 100%;
            display: flex;
        }
    }

    .prompt {
        font-size: .09rem;
        font-weight: 300;
        display: flex;
        justify-content: space-between;

        .goToRegister {
            color: $googleBlue;
        }
    }

    .btn {
        width: 100%;
        height: .3rem;
        font-size: .1rem;
    }
}
</style>