var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var hashmap = require('./public/core/hashmap');
var app = express();
var upload = multer({ dest: '/public/upload/' });
var id = "";
var currentPage = 1;

//设置静态目录
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//数据定义
var pdfdata = [];
var pdfinfo = {currentPage:1, realname:"", idname:"",size:0};
var data_filename = "data.json";
var result = JSON.parse(fs.readFileSync(data_filename));

//主页访问
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});


//上传文件页面
app.get('/upload.html', function(req, res){
    res.sendFile( __dirname + "/" + "list.html" );
});


app.get('/viewer.html', function(req, res){
    var requestParam = req.query;
    id = requestParam.fileid;
    console.log("请求参数" + JSON.stringify(requestParam));
    for(var i = 0; i < result.length; i++){
        if(id == result[i].idname){
            currentPage = result[i].currentPage;
        }
    }
    res.sendFile( __dirname + "/" + "viewer.html" );
});

//获取数据
app.get('/index', function (req, res) {
   res.end( JSON.stringify( result ) );
});

//获取全局数据
app.get('/getGlobalData', function(req, res){
    var o = {};
    o.id = id;
    o.currentPage = currentPage;
    res.end(JSON.stringify(o));
});

//保存历史数据
app.post('/saveHistoryData', function (req, res) {
    console.log("保存历史数据\n" + JSON.stringify(req.body));
    var data = JSON.stringify(req.body);
    var page = parseInt(JSON.parse(data).data);
    for(var i = 0; i < result.length; i++){
        if(id == result[i].idname){
            result[i].currentPage = page;
        }
    }
    fs.writeFileSync(data_filename, JSON.stringify(result));
    res.end();
});


//文件上传
app.post('/file_upload', upload.array('pdf'), function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/public/upload/" + req.files[0].filename + "." + req.files[0].fieldname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
              //保存数据
              var pdfinfo = {};
              pdfinfo.realname = req.files[0].originalname;
              pdfinfo.idname = req.files[0].filename;
              pdfinfo.size = req.files[0].size;
              pdfinfo.currentPage = 1;
              result.push(pdfinfo);
              fs.writeFileSync(data_filename, JSON.stringify(result));
               response = {
                   message:'File uploaded successfully',
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
});

var server = app.listen(8888, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);

});
