<template lang="html">
<div class="introduce">
    <h2 class="title">「 阳关三叠 」</h2>
    <div class="sub-title">智能时代的投资辅助决策系统</div>
    <div style="margin-top: 20px">
        <span class="btn" v-show="!isLogin" @click="$router.push({path: '/login'})">现在登录</span>
        <span class="btn" v-show="isLogin" @click="$router.push({path: '/home'})">个人中心</span>
        <span class="btn" @click="$router.push({path: '/register'})">注册账号</span>
    </div>
    <div class="breathingLampImage">
    </div>
    <el-row id="features" style="color: #999; margin-top: 220px">
        <el-col :span="6">
            <h3>大数据 - 更全面</h3>
            <p>整合A股40年全部数据，利用现代数据挖掘技术，发现数据背后的规律，同时将国际政治、军事、热点事件等纳入影响因素，极力提升准确率</p>
        </el-col>
        <el-col :span="6">
            <h3>云计算 - 更迅速</h3>
            <p>依托亚马逊云计算平台，分秒不停地对海量A股数据进行统计、归并，使数据准确反映现实趋势，使您不错失任何良机</p>
        </el-col>
        <el-col :span="6">
            <h3>人工智能 - 更聪明</h3>
            <p>得益于人工智能技术的发展，使得机器能更高效地发现市场规律。利用人工智能对A股进行大范围海选，过滤出优质股票，大大降低投资风险</p>
        </el-col>
        <el-col :span="6">
            <h3>监督学习 - 更精准</h3>
            <p>为免于机器学习的方向偏差，我们集合了数十位经验丰富的操盘手，对市场行情、趋势、情绪等进行精准预判，使您投资利益最大化</p>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    computed: {
        user: function() {
            return this.$store.getters["user/getAll"];
        },
        isLogin: function() {
            return !!this.user.loginName;
        }
    },
    methods: {}
};
</script>

<style scoped lang="stylus">
.introduce {
    height: 100%;
    padding: 200px 200px 0 200px;
    background-color: #1f2325;
    background-image: url('https://img.alicdn.com/tfs/TB12pYzC7voK1RjSZFNXXcxMVXa-3840-1280.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 75% 0;

    .breathingLampImage {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-image: url('https://img.alicdn.com/tfs/TB1wtbyC6TpK1RjSZKPXXa3UpXa-3840-1280.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 75% 0;
        opacity: 0.2;
        animation: breath 3s infinite ease-in-out alternate;
        z-index: 0;
    }

    .title {
        color: #fff;
        font-size: 36px;
        position: relative;
        display: inline-block;
        font-weight: 400;
        transform: translate(-20px, -10px);
    }

    .sub-title {
        color: #fff;
        text-align: left;
        font-size: 24px;
        max-width: 700px;
        line-height: 60px;
    }

    .btn {
        position: relative;
        z-index: 1;
        display: inline-block;
        font-size: 16px;
        line-height: 18px;
        padding: 8px;
        color: #fff;
        text-align: center;
        margin-right: 20px;
        border: 2px #fff solid;
        user-select: none;
        cursor: pointer;
    }

    #features {
        h3 {
            color: #eee;
            font-size: 20px;
            font-weight: 500;
        }

        p {
            color: #aaa;
            font-size: 14px;
            padding-right: 28px;
            padding-top: 10px;
            text-align: justify;
        }
    }
}

@keyframes breath {
    0% {
        opacity: 0.2;
    }

    70% {
        opacity: 1;
    }

    100% {
        opacity: 0.2;
    }
}
</style>
