library bad_aliens;

import 'dart:html';
import 'dart:math' as Math;

part 'AssetManager.dart';
part 'Animation.dart';
part 'Timer.dart';
part 'GameEntity.dart';
part 'Game.dart';
part 'Point.dart';
part 'Alien.dart';
part 'AlienExplosion.dart';
part 'Sentry.dart';
part 'Bullet.dart';
part 'BulletExplosion.dart';
part 'Earth.dart';
part 'EvilAliens.dart';

void main() {
  CanvasElement canvas = query('#surface');
  var ctx = canvas.context2d;

  var assetManager = new AssetManager();
  assetManager.queueDownload('img/alien-explosion.png');
  assetManager.queueDownload('img/alien.png');
  assetManager.queueDownload('img/bullet.png');
  assetManager.queueDownload('img/earth.png');
  assetManager.queueDownload('img/sentry.png');
  assetManager.queueDownload('img/explosion.png');

  var game = new EvilAliens(assetManager);

  assetManager.downloadAll(() {
    game.init(ctx);
    game.start();
  });
}
