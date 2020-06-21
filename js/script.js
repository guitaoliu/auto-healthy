Date.prototype.format = function(fmt) { 
    let o = { 
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    }; 
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt; 
};


fetch("config.json")
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        const currentTime = new Date();
        document.getElementById('date').innerHTML = currentTime.format('MM月dd日');
        document.getElementById('time').innerHTML = currentTime.format('hh:mm:ss');
        document.getElementById('user-id').innerHTML = data['userId'] 
                                                    + ' ' + data['userName'] 
                                                    + ' ' + '<small class="user-group">'
                                                    + data['userStage'] + '</small>';
        document.getElementById('user-class').innerHTML = data['userClass'];
        document.getElementById('reTime').innerHTML = data['registrationTime'];
        document.querySelector('#group-container > p').innerHTML = data['userStage'];

        document.getElementById('off-campus-start').innerHTML = new Date(currentTime.getTime() - 2 * 1000 * 60 * 60).format('yyyy-MM-dd hh:') + '00';
        document.getElementById('off-campus-end').innerHTML = new Date(currentTime.getTime() + 1000 * 60 * 60).format('yyyy-MM-dd hh:') + '00';

        setInterval(() => {
            document.getElementById('time').innerHTML = new Date().format('hh:mm:ss');
        }, 1000)

        new QRCode(
            document.getElementById('qr-code'),
            {
                text: data['qrCodeContent'],
                colorDark: 	'#f57ef6',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            }
        ); 
    })


