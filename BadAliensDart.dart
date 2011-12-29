#import('dart:html', prefix:"html");
#source('AssetManager.dart');
#source('Animation.dart');
#source('Timer.dart');

class BadAliensDart {

  BadAliensDart() {
  }

  void run() {
    write("Hello World!");
  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    document.query('#status').innerHTML = message;
  }
}

void main() {
  new BadAliensDart().run();
}
