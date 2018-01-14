
function showPdf() {
     console.log('aaa');
    // var container = document.getElementById("container");
    // container.style.display = "block";
    // var url = 'file:///F:/%E5%AD%A6%E4%B9%A0%E6%96%87%E4%BB%B6/Java%E5%BC%80%E5%8F%91%E6%8A%80%E6%9C%AF%20%20%E5%9C%A8%E6%9E%B6%E6%9E%84%E4%B8%AD%E4%BD%93%E9%AA%8C%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E5%92%8C%E7%AE%97%E6%B3%95%E4%B9%8B%E7%BE%8E%20%E9%AB%98%E6%B8%85%E6%89%AB%E6%8F%8F%E5%AE%8C%E6%95%B4PDF%E7%89%88(jb51.net).pdf';
    // PDFJS.workerSrc = 'pdfjs/build/pdf.worker.js';
    // PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
    //     pdf.getPage(1).then(function getPageHelloWorld(page) {
    //         var scale = 1;
    //         var viewport = page.getViewport(scale);
    //         var canvas = document.getElementById('the-canvas');
    //         var context = canvas.getContext('2d');
    //         canvas.height = viewport.height;
    //         canvas.width = viewport.width;
    //         var renderContext = {
    //             canvasContext: context,
    //             viewport: viewport
    //         };
    //         page.render(renderContext);
    //     });
    // });
  }

  document.addEventListener('DOMContentReady', function () {
    document.getElementById('showPdf').addEventListener('click', showPdf);
  });
