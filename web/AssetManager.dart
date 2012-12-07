part of bad_aliens;

class AssetManager {
  int successCount = 0;
  int errorCount = 0;
  Map cache = {};
  List downloadQueue = [];

  void queueDownload(String path) {
    downloadQueue.add(path);
  }

  void downloadAll(downloadCallback) {
    if (downloadQueue.length == 0) {
      downloadCallback();
    }

    for (final path in downloadQueue) {
      var img = new ImageElement();
      img.on.load.add((event) {
        print('${img.src} is loaded');
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
