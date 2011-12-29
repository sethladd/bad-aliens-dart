#import('dart:html', prefix:"html");
#source('AssetManager.dart');
#source('Animation.dart');
#source('Timer.dart');
#source('GameEntity.dart');
#source('Game.dart');
#source('Point.dart');
#source('Alien.dart');

class BadAliensDart {

  BadAliensDart() {
  }

  void run() {
    write("Hello World!");
  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    html.document.query('#status').innerHTML = message;
  }
}

void main() {
  new BadAliensDart().run();
}
