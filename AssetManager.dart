class AssetManager {
  var successCount = 0;
  var errorCount = 0;
  var cache = const {};
  var downloadQueue = const [];
    
  void queueDownload(String path) {
    downloadQueue.add(path);
  }
  
  void downloadAll(downloadCallback) {
    if (downloadQueue.length == 0) {
      downloadCallback();
    }
    
    for (final path in downloadQueue) {
      html.ImageElement img = new html.Element.tag("img");
      img.on.load.add((event) {
        print(img.src + ' is loaded');
        successCount += 1;
        if (isDone()) {
            downloadCallback();
        }
      });
      img.on.error.add((event) {
        errorCount += 1;
        if (isDone()) {
            downloadCallback();
        }
      });
      img.src = path;
      cache[path] = img;
    }
  }

  getAsset(path) {
    return cache[path];
  }
  
  bool isDone() {
    return (downloadQueue.length == successCount + errorCount);
  }
    
}
