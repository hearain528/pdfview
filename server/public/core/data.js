//读取历史数据
function getHistoryData(callback) {
    $(function(){
        $.ajax({
            url:'/getHistoryData',
            method:'get',
            async: false,
            success:function(data){
                console.log('成功');
                callback(data);
            },
            error:function(){console.log('出错')}
        });
    });
}

//保存历史数据
function saveHistoryData(postData, callback) {
    $(function(){
        $.ajax({
            url:'/saveHistoryData',
            method:'post',
            data:postData,
            async: false,
            success:function(data){
                console.log('成功');
                callback();
            },
            error:function(){console.log('出错')}
        });
    });
}