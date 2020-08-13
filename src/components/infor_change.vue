<template>
    <div class="infor_change">
        <div id="beforChange" v-if="!Ischanging">
            <div class="infortable chfont1">
                <div class="beinfor" v-for="(items,index) in inforList">
                    {{items.name}}
                    <span class="chfont font1">{{items.data}}</span>
                </div>
                <!-- <div class="beinfor">
                    报名信息
                    <div class="beinforlist">
                        <span class="chfont font1"></span>
                    </div>
                </div>-->
            </div>
            <button @click="Ischanging=!Ischanging;chphone(undefined)" id="changeMyInfor" class="stylebutton">修改</button>
        </div>
        <div v-else id="afterChange">
            <div class="unchangeInfor font7">
                <div :class="'un'+items.classname" v-for="(items,index) in inforList.slice(0,2)">
                    {{items.name}}
                    <span class="unfont font1">{{items.data}}</span>
                </div>
            </div>
            <div class="chphoneInfor font7">
                <div class="chphone">
                    联系电话
                    <span v-if="isphone" @click="chinput" class="font9s" style="margin-right:16px">请填写电话号码</span>
                    <input
                        v-else
                        id="contentPhone"
                        class="chfont font1"
                        type="number"
                        pattern="[0-9]*"
                        @blur="isempty"
                        @keyup="chphone(nowphone)"
                        v-model="nowphone"
                        oninput="value=value.replace(/[^\d]/g,'')"
                    />
                </div>
            </div>
            <div class="chdepartInfor font7">
                <div class="chdepart">
                    报名部门
                    <div id="contentdepart" class="defont">
                        <p class="chfont2">{{inforList[3].data}}</p>
                        <img :src="unionblack" id="union" />
                    </div>
                </div>
            </div>
            <!-- 选择部门 -->
            <button id="confirmMyInfor" @click="chCover" :class="style">确认提交</button>
            <!-- 蒙版 -->
            <div class="cover" v-show="iscover"></div>
            <!--  -->
            <div class="confirm" :class="!isconfirm&&iscover?'show':null">
                <div id="cotitle">信息核对</div>
                <ul class="coinfors">
                    <li class="coinfor font7" v-for="(items,index) in inforList">
                        {{items.name+'：'}}
                        <span class="font1 cofont">{{items.data}}</span>
                    </li>
                    <!-- <li class="coinfor font7">
                        {{inforList[3].name+'：'}}
                        <div class="inforlist">
                            <span class="font1 cofont">{{$route.params.depart}}</span>
                        </div>
                    </li>-->
                </ul>
                <img @click="chClose" id="close" :src="close" />
                <!-- 手动跳转 -->
                <button @click="chosenList" id="lastconfirm" :class="style">确认提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    let betitle = process.env.NODE_ENV == 'development' ? { do: '/domain', re: '/redomain' } : { do: 'https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter', re: 'https://cyxbsmobile.redrock.team/wxapi/cyb-teamapply' };
    let token = localStorage.getItem('young-youyue-token');
    export default {
        data() {
            return {
                Ischanging: false,
                iscover: false,
                isconfirm: false,
                isphone: true,
                inforList: this.$store.state.inforList,
                nowChosen: [],
                nowphone: '',
                unionblack: require('@/assets/img/unionblack.png'),
                close: require('@/assets/img/close.png'),
            };
        },
        methods: {
            chinput() {
                this.isphone = !this.isphone;
                setTimeout(() => {
                    document.querySelector('#contentPhone').focus();
                }, 100);
            },
            isempty() {
                if (this.nowphone.length == 0) {
                    this.isphone = !this.isphone;
                }
            },
            chCover() {
                if (this.nowphone.length == 11) this.iscover = !this.iscover;
            },
            chClose() {
                this.iscover = false;
                this.isconfirm = false;
            },
            ...mapMutations(['chChosenList', 'chdepart', 'chphone', 'chName', 'chNum']),
            chosenList() {
                if (this.inforList[2].data != undefined && this.inforList[2].data.length == 11) return this.sendJSON(this.$route.query.id, this.nowphone);
            },
            sendJSON(index, phone) {
                fetch(betitle.re + '/team/apply/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;',
                        Authorization: 'Bearer ' + token,
                    },
                    body: `{"phone":"${phone}","id":${index}}`,
                }) //提交报名信息
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status == 10000) {
                            this.$router.replace({ path: './' });
                        }
                    }); //信息修改成功返回首页
            },
        },
        computed: {
            style: function () {
                return this.nowphone.length != 11 ? 'styleDis' : 'stylebutton';
            },
        },
        mounted: function () {
            let _this = this;
            async function getJSON(req) {
                let response = await fetch(req);
                let data = await response.json();
                return data;
            }
            let req = new Request(betitle.re + '/team/apply/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                    Authorization: 'Bearer ' + token,
                },
                body: `{"id":${this.$route.query.id}}`,
            }); //获取用户个人后台信息
            getJSON(req).then(function (resolve) {
                let data = resolve.data;
                _this.chName(data.Name);
                _this.chNum(data.StuNum);
                _this.chphone(data.Phone);
                _this.chdepart(data.TeamName);
            });
        },
    };
</script>

<style>
.infor_change {
    display: flex;
    justify-content: space-between;
}
.infortable {
    width: 355px;
    min-height: 258px;
    position: absolute;
    left: 10px;
    top: 12px;
    background: #ffffff;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
}
.chfont1 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #777494;
    opacity: 0.9;
}
.chfont2 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #1c184c;
    opacity: 0.9;
}
.beinfor {
    min-height: 20px;
    width: 333px;
    margin-left: 26px;
    /* 强制不换行 */
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
}
.beinfor > span {
    white-space: normal;
    margin-left: 10px;
}
.beinforlist {
    max-width: 152px;
}
.chfont {
    height: 20px;
    margin-right: 16px;
    float: right;
}
.chfont,
.unfont {
    font-size: 16px;
    letter-spacing: 0.03em;
}
.stylebutton {
    /* position: absolute;
    bottom: 68px;
    left: 98px; */
    width: 180px;
    height: 44px;
    background: #625af8;
    border-radius: 32px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.1em;
    color: #ffffff;
}
.unchangeInfor {
    width: 355px;
    height: 143px;
    position: relative;
    left: 10px;
    top: 12px;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    font-weight: bold;
}
.unchangeInfor::after {
    position: absolute;
    left: 15px;
    top: 72px;
    width: 326px;
    height: 1px;
    content: '';
    display: block;
    background-color: rgba(0, 0, 0, 0.05);
}
.unname {
    width: 323px;
    position: absolute;
    left: 16px;
    top: 28px;
    font-weight: bold;
}
.unnumSchool {
    width: 323px;
    position: absolute;
    left: 16px;
    bottom: 28px;
    font-weight: bold;
}
.unfont {
    float: right;
}
.chphoneInfor {
    width: 355px;
    height: 82px;
    background: #ffffff;
    border-radius: 10px;
    margin-top: 22px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
}
.chphone,
.chdepart {
    width: 340px;
    display: flex;
    justify-content: space-between;
    margin: 32px 0 32px 15px;
    position: relative;
    white-space: nowrap;
}
.chphone {
    align-items: center;
}
#contentPhone {
    caret-color: #625af8;
    width: 115px;
    font-size: 16px;
}
#contentdepart {
    /* 重点关注 */
    display: flex;
    flex-direction: column;
    font-weight: normal;
    align-items: flex-end;
    white-space: normal;
    margin-left: 10px;
}
#union {
    width: 8px;
    position: absolute;
    top: 3px;
    right: 16px;
}
.chdepartInfor {
    width: 355px;
    min-height: 82px;
    background: #ffffff;
    border-radius: 10px;
    margin-top: 12px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
}
.cover {
    position: absolute;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    opacity: 0.9s; /*非IE浏览器下设置透明度为60%*/
    z-index: 99;
}
.departments {
    width: 375px;
    min-height: 220px;
    max-height: 450px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    background: #ffffff;
    border-radius: 8px 8px 0px 0px;
    transform: translate3d(0, 150%, 0);
    transition: transform 0.2s ease-in-out;
    z-index: 100;
}
#title {
    height: 37px;
    width: 327px;
    margin: 18px 24px 0 24px;
    text-align: center;
    position: relative;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #494670;
}
#title::after {
    width: 327px;
    height: 1px;
    position: absolute;
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.05);
}
.departments > p {
    margin-top: 20px;
    margin-left: 24px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: #a4a3b7;
    opacity: 0.9;
}
.department {
    height: 56px;
    margin-left: 24px;
    margin-right: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
#confirmDepart {
    position: absolute;
    bottom: 20px;
    left: 98px;
}
#lastconfirm {
    position: absolute;
    bottom: 20px;
    left: 98px;
}
.styleDis {
    width: 180px;
    height: 44px;
    background-color: #cecde8;
    border-radius: 32px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.1em;
    color: #ffffff;
}
#confirmMyInfor {
    position: fixed;
    top: 497px;
    left: 98px;
}
#changeMyInfor {
    position: fixed;
    top: 497px;
    left: 98px;
}
</style>