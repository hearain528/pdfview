//保存历史数据
function saveHistoryData(currentPageNumber, callback) {
    $(function(){
        $.ajax({
            url:'/saveHistoryData',
            method:'post',
            data:{"data" : parseInt(currentPageNumber)},
            async: false,
            success:function(data){
                console.log('成功');
                callback();
            },
            error:function(){console.log('保存历史记录出错')}
        });
    });
}