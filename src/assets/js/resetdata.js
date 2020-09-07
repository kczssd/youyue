let tuan = [2, 3, 4, 5, 6, 7, 8, 9, 15, 22];
let xue = [37, 47, 52, 64, 70, 75];
function resetdata(data) {
    data.forEach(function (item, index, arr) {
        tuan.includes(item.id) ? item.type = 't' : xue.includes(item.id) ? item.type = 'x' : item.name.includes('软件') ? item.type = 'y' : null;//判断所属类型
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