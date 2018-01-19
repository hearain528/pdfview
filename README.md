# pdfview
> 开发此功能的出发点
- 主要是想能在家里和公司看pdf文件学习可以同步，同步主要是通过json文件同步，然后通过github将数据上传

> 主要功能：
1. 阅读pdf文件，以及记住上次阅读的记录
2. 上传功能
3. 列表功能

## 用到的技术
- nodejs(主要用来做服务端)
- pdfjs,官方文章：pdfjs-1.9.426 http://mozilla.github.io/pdf.js/getting_started/#download

## 实现中遇到的难点，尤其记录历史记录的，通过debugger研究了好几天才研究清楚
1. 如何修改官方的viewer页面，支持文档切换
实例代码：修改viewer.js,主要修改webViewerLoad函数
```
function webViewerLoad() {
            var config = getViewerConfiguration();
            //获取数据
            $(function(){
                $.get("/getGlobalData",function(result){
                    //result数据添加到box容器中;
                    result = JSON.parse(result);
                    var url = 'upload/'+ result.id +'.pdf';
                    config.defaultUrl = url;
                    config.historyNum = result.currentPage;
                    window.PDFViewerApplication = pdfjsWebApp.PDFViewerApplication;
                    pdfjsWebApp.PDFViewerApplication.run(config);
                });
            });
        }
```
2.如何将阅读历史记录记录，然后在下次打开或者其它地方打开，仍然是上次的阅读记录
- 重点代码：如何将上一次的记录同步呢？
```
setInitialView: function setInitialView(storedHash) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var _options$scale = options.scale,
                    scale = _options$scale === undefined ? 0 : _options$scale,
                    _options$sidebarView = options.sidebarView,
                    sidebarView = _options$sidebarView === undefined ? _pdf_sidebar.SidebarView.NONE : _options$sidebarView;

                this.isInitialViewSet = true;
                this.pdfSidebar.setInitialView(sidebarView);
                this.pdfViewer.currentPageNumber = this.appConfig.historyNum;
                //将下面的注释，this.appConfig.historyNum的值为刚开始webViewerLoad加载的时候从服务器端读取并赋值
                // if (this.initialDestination) {
                //     console.log(this.initialDestination);
                //     this.pdfLinkService.navigateTo(this.initialDestination);
                //     this.initialDestination = null;
                // } else if (this.initialBookmark) {
                //     this.pdfLinkService.setHash(this.initialBookmark);
                //     this.pdfHistory.push({ hash: this.initialBookmark }, true);
                //     this.initialBookmark = null;
                // } else if (storedHash) {
                //     this.pdfLinkService.setHash(storedHash);
                // } else if (scale) {
                //     this.pdfViewer.currentScaleValue = scale;
                //     this.page = 1;
                // }
                this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
                this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);
                if (!this.pdfViewer.currentScaleValue) {
                    this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
                }
            },
```
- 如何将页数实时同步到服务器端呢？找到下面这个函数webViewerPageChanging()

```
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

function webViewerPageChanging(evt) {
            var page = evt.pageNumber;
            //保存历史记录
            saveHistoryData(page, function () {
                PDFViewerApplication.toolbar.setPageNumber(page, evt.pageLabel || null);
                PDFViewerApplication.secondaryToolbar.setPageNumber(page);
                if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
                    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(page);
                }
                if (_pdfjsLib.PDFJS.pdfBug && Stats.enabled) {
                    var pageView = PDFViewerApplication.pdfViewer.getPageView(page - 1);
                    if (pageView.stats) {
                        Stats.add(page, pageView.stats);
                    }
                }
            });
        }
```



