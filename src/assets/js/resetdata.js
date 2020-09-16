let tuan = [2, 3, 4, 5, 6, 7, 8, 9, 15, 22];//团委
let xue = [37, 47, 52, 64, 70, 75];//学生处
let dang = [];//党委
let yuan = [92];//院学生会
function resetdata(data) {
    data.forEach(function (item, index, arr) {
        // tuan.includes(item.id) ? item.type = 't' : xue.includes(item.id) ? item.type = 'x' : item.name.includes('软件') ? item.type = 'y' : null;//判断所属类型
        switch (true) {
            case tuan.includes(item.id):
                item.type = 't'
                break;
            case xue.includes(item.id):
                item.type = 'x'
                break;
            case dang.includes(item.id):
                item.type = 'd'
                break;
            case yuan.includes(item.id):
                item.type = 'y'
                break;
        }
        if (item.id == 9) {
            arr.splice(index, 1);
            arr.unshift(item);
        }//换位
    });
    //换位
    var guoIndex = data.findIndex((v) => {
        return v.id == 7;
    });
    var eIndex = data.findIndex((v) => {
        return v.id == 75;
    });
    [data[guoIndex], data[eIndex]] = [data[eIndex], data[guoIndex]];
    return data;
}
export default resetdata;