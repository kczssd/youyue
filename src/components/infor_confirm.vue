<template>
    <div v-if="departList!=undefined" class="infor_confirm">
        <div id="afterChange">
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
                        type="text"
                        @keyup="chphone(nowphone)"
                        v-model="nowphone"
                        oninput="value=value.replace(/[^\d]/g,'')"
                    />
                </div>
            </div>
            <div class="chdepartInfor font7">
                <div class="chdepart">
                    报名部门
                    <div @click="chAll" id="contentdepart" class="defont">
                        <p class="font9s" v-if="nowChosen.length==0">请选择报名部门</p>
                        <p class="font1" v-else v-for="(item) in nowChosen">{{item}}</p>
                        <img :src="union" id="union" />
                    </div>
                </div>
            </div>
            <!-- 选择部门 -->
            <button id="confirmMyInfor" @click="chCover" class="stylebutton">确认提交</button>
            <!-- 蒙版 -->
            <div class="cover" v-show="iscover"></div>
            <div class="departments font4" :class="isconfirm?'show':null">
                <div id="title">选择部门</div>
                <p>可以选择多个部门</p>
                <ul id="coul">
                    <li class="department" v-for="(items,index) in departList" :id="'department'+index">
                        {{items.name}}
                        <img @click="chChoose(index)" :src="items.ischoose?haschoose:nochoose" />
                    </li>
                </ul>
                <img @click="chClose" id="close" :src="close" alt />
                <button @click="chConfirm" id="confirmDepart" class="stylebutton">确认提交</button>
            </div>
            <div class="confirm" :class="!isconfirm&&iscover?'show':null">
                <div id="cotitle">信息核对</div>
                <ul class="coinfors">
                    <li class="coinfor font7" v-for="(items,index) in inforList.slice(0,3)">
                        {{items.name+'：'}}
                        <span class="font1 cofont">{{items.data}}</span>
                    </li>
                    <li class="coinfor font7">
                        <span style="white-space: nowrap;">{{inforList[3].name+'：'}}</span>
                        <div class="inforlist">
                            <span class="font1 cofont" v-for="item in nowChosen">{{item}}</span>
                        </div>
                    </li>
                </ul>
                <img @click="chClose" id="close" :src="close" />
                <!-- 手动跳转 -->
                <button @click="chosenList" id="confirmDepart" class="stylebutton">确认提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                isphone: true,
                iscover: false,
                isconfirm: false,
                inforList: this.$store.state.inforList,
                nowChosen: [],
                nowphone: undefined,
                departList: [
                    //组织部门列表
                    // { id: 1, name: '产品运营及策划部', ischoose: false },
                    // { id: 2, name: '视觉设计部', ischoose: false },
                    // { id: 3, name: '移动开发部', ischoose: false },
                    // { id: 4, name: 'Web研发部', ischoose: false },
                    // { id: 5, name: '运维安全部', ischoose: false },
                ],
                haschoose: require('@/assets/img/haschoose.png'),
                nochoose: require('@/assets/img/nochoose.png'),
                union: require('@/assets/img/union.png'),
                close: require('@/assets/img/close.png'),
            };
        },
        methods: {
            chChoose(index) {
                this.departList[index].ischoose = !this.departList[index].ischoose;
                this.nowChosen = this.departList.filter((item) => item.ischoose == true);
                this.nowChosen = this.nowChosen.map((item) => {
                    return item.name;
                });
                this.chdepart(this.nowChosen);
            },
            chinput() {
                this.isphone = !this.isphone;
                setTimeout(() => {
                    document.querySelector('#contentPhone').focus();
                }, 100);
            },
            chAll() {
                this.iscover = !this.iscover;
                this.isconfirm = !this.isconfirm;
            },
            chConfirm() {
                // if (this.inforList[2].data != undefined)
                this.isconfirm = !this.isconfirm;
            },
            chCover() {
                if (this.nowChosen.length != 0 && this.inforList[2].data != undefined) this.iscover = !this.iscover;
            },
            chClose() {
                this.iscover = false;
                this.isconfirm = false;
            },
            ...mapMutations(['chChosenList', 'chdepart', 'chphone']),
            chosenList() {
                let nowArray = new Array();
                this.departList.filter((items, index) => {
                    if (items.ischoose == true) nowArray.push(items.id);
                });
                try {
                    if (this.nowphone.length == 11) {
                        return this.sendJSON(nowArray, this.nowphone);
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            sendJSON(array, phone) {
                fetch('/redomain/team/apply/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;',
                        Authorization:
                            'Bearer eyJjbGFzcyI6IjEzMDAxODA3IiwiY29sbGVnZSI6Iui9r+S7tuW3peeoi+WtpumZoiIsImV4cCI6IjEwMjQzNzk0MTE5IiwiaGVhZEltZ1VybCI6Imh0dHA6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9ScDRyTklJWWRtU05IRTFOSHZBR215UEUzRDRQd3l4aWFubG9jZ3lwcFhQR1BoMnJ3ZG5DN1p3NklkNUxZN1k4TjVyYWIzbmNUcHFlenQ3a3hUZUJVVmcvMTMyIiwiaWF0IjoiMTU4OTA3NzIzOSIsIm1ham9yIjoiIiwibmlja25hbWUiOiJhaGFiaGdr8J+NsCIsInJlYWxOYW1lIjoi5L2V5bqa5Z2kIiwicmVkSWQiOiIyYzEyMmMwOTAyMzVjMzFkODI2NWQ2MWQzZjE4MGIzYTY2NWJhYmRlIiwic3R1TnVtIjoiMjAxODIxNDEzOSIsInN1YiI6InhicyJ9.g++rv4igrRn71/MtY/bXU++PHFQJ4/rxNZXoI9cG/lVd/9vs8UnGKCW/veUPY3iY5/mGfBIh3gFqOarHU6QmkMNvqe4gWxZIP7f52CmmLB3c/a9Hdhm3F+Y4pSDqHHH2PNLKvXkgco8K2+4W83ofzCMKgGUjxXSQSmE2BTghwt4oiEx423tfMjmCUtPMEHCHXGr5eiq0Ko1oJEefpzb32xwvR5hCXSXDqkQIoo1eQZEJ0tBb4v6d8+19bzBHP8kLC7QFz9HwlhDAPn614m45iyGZMo04pRNThGfd4Q5EQLQ1tCXD2W8p8Jxw3h9VTUgvuLP/PF4yozgQO1RhWVmxWA==',
                    },
                    body: `{"ids":[${array}],"phone":"${phone}"}`,
                }) //提交报名信息
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status == 10000) {
                            this.$router.replace({ path: './success' });
                        }
                    }); //若提交成功则返回报名成功页
            },
        },
        computed: {},
        mounted: function () {
            let _this = this;
            async function getJSON(req) {
                let response = await fetch(req);
                let data = await response.json();
                return data;
            }
            let req = new Request('/domain/team/apply/infos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                    Authorization:
                        'Bearer eyJjbGFzcyI6IjEzMDAxODA3IiwiY29sbGVnZSI6Iui9r+S7tuW3peeoi+WtpumZoiIsImV4cCI6IjEwMjQzNzk0MTE5IiwiaGVhZEltZ1VybCI6Imh0dHA6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9ScDRyTklJWWRtU05IRTFOSHZBR215UEUzRDRQd3l4aWFubG9jZ3lwcFhQR1BoMnJ3ZG5DN1p3NklkNUxZN1k4TjVyYWIzbmNUcHFlenQ3a3hUZUJVVmcvMTMyIiwiaWF0IjoiMTU4OTA3NzIzOSIsIm1ham9yIjoiIiwibmlja25hbWUiOiJhaGFiaGdr8J+NsCIsInJlYWxOYW1lIjoi5L2V5bqa5Z2kIiwicmVkSWQiOiIyYzEyMmMwOTAyMzVjMzFkODI2NWQ2MWQzZjE4MGIzYTY2NWJhYmRlIiwic3R1TnVtIjoiMjAxODIxNDEzOSIsInN1YiI6InhicyJ9.g++rv4igrRn71/MtY/bXU++PHFQJ4/rxNZXoI9cG/lVd/9vs8UnGKCW/veUPY3iY5/mGfBIh3gFqOarHU6QmkMNvqe4gWxZIP7f52CmmLB3c/a9Hdhm3F+Y4pSDqHHH2PNLKvXkgco8K2+4W83ofzCMKgGUjxXSQSmE2BTghwt4oiEx423tfMjmCUtPMEHCHXGr5eiq0Ko1oJEefpzb32xwvR5hCXSXDqkQIoo1eQZEJ0tBb4v6d8+19bzBHP8kLC7QFz9HwlhDAPn614m45iyGZMo04pRNThGfd4Q5EQLQ1tCXD2W8p8Jxw3h9VTUgvuLP/PF4yozgQO1RhWVmxWA==',
                },
                body: `{"id":${this.$route.query.id}}`,
            }); //拿到组织旗下部门列表
            getJSON(req).then(function (resolve) {
                let data = resolve.data;
                data.forEach((item) => {
                    _this.departList.push({ id: item.id, name: item.name, ischoose: false }); //组织id
                });
            });
        },
    };
</script>

<style>
#close {
    width: 13px;
    height: 13px;
    position: absolute;
    top: 22px;
    right: 22px;
}
.show {
    transform: translateY(0) !important;
}
.confirm {
    min-height: 337px;
    width: 375px;
    background: #ffffff;
    border-radius: 8px 8px 0px 0px;
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translate3d(0, 150%, 0);
    transition: transform 0.2s ease-in-out;
    z-index: 100;
}
#cotitle {
    width: 328px;
    height: 34px;
    margin: 19px 22px 0 25px;
    text-align: center;
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #777494;
}
.coinfors {
    width: 328px;
    min-height: 194px;
    margin: 0 auto;
    padding-top: 16px;
    margin-bottom: 90px;
    border-top: 1px rgba(0, 0, 0, 0.05) solid;
    border-bottom: 1px rgba(0, 0, 0, 0.05) solid;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.coinfor {
    display: flex;
    justify-content: space-between;
    letter-spacing: 0.03em;
    margin-top: 4px;
}
.inforlist {
    /* max-width: 132px; */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.cofont {
    font-size: 16px;
    margin-bottom: 10px;
    display: block;
    letter-spacing: 0.03em;
}
.defont {
    margin-right: 31px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.03em;
}
#contentdepart > p {
    margin-bottom: 8px;
}
#coul {
    margin-bottom: 100px;
}
</style>