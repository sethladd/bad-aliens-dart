class Sentry extends GameEntity {

  static final num distanceFromEarthCenter = 85;
  var sprite = null;
  num angle;
  
  Sentry(Game game) : super.withPosition(game, 0, distanceFromEarthCenter), angle = 0 {
    sprite = ASSET_MANAGER.getAsset('img/sentry.png');
    radius = sprite.width / 2;
  }
  
  void update() {
    if (game.mouse != null) {
      angle = Math.atan2(game.mouse.y, game.mouse.x);
      if (angle < 0) {
          angle += Math.PI * 2;
      }
      x = (Math.cos(angle) * distanceFromEarthCenter);
      y = (Math.sin(angle) * distanceFromEarthCenter);
    }
    if (game.click != null) {
      shoot();
    }
  }
  
  void draw(ctx) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI/2);
    ctx.drawImage(sprite, -sprite.width/2, -sprite.height/2);
    ctx.restore();
    
    super.draw(ctx);
  }
  
  void shoot() {
    var bullet = new Bullet(game, x, y, angle, game.click);
    game.addEntity(bullet);
    // TODO play sound
  }
}
