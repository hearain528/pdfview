//页面加载   获取全部信息
$(function(){
//     $.ajax({
//         type: "GET",//请求方式
//         url: "/index",//地址，就是json文件的请求路径
//         dataType: "json",//数据类型可以为 text xml json  script  jsonp
// 　　　　　　　　　 success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
//             addBox(result);
//         }
//     });
    $.get("/index",function(result){
        //result数据添加到box容器中;
        addBox(result);
    });
});

function addBox(result){
    //result是一个集合,所以需要先遍历
    $.each(JSON.parse(result),function(index,obj){
      $("#box").append("<tr>" +
          "<td>" + obj.realname + "</td>" +
          "<td>" + obj.size + "</td>" +
          "<td>" + obj.currentPage + "</td>" +
          "<td>" + obj.idname + "</td>" +
          "</tr>"
      );
      console.log(obj);
        // $("#box").append("<div class='product'>"+//获得图片地址
        //     "<div><img class='img' src="+obj['url']+"/></div>"+
        //     //获得名字
        //     "<div class='p1 p'>"+obj['name']+"</div>"+
        //     //获得性别
        //     "<div class='p2 p'>"+obj['sex']+"</div>"+
        //     //获得邮箱地址
        //     "<div class='p3 p'>"+obj['email']+"</div>"+
        //     "</div>");
    });
}
