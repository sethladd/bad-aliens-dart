class Bullet extends GameEntity {
  
  num angle;
  Point explodesAt;
  static final num speed = 250;
  num radialDistance = 95;
  var sprite;
  Animation animation;
  
  Bullet(Game game, num x, num y, num angle, Point this.explodesAt) : super.withPosition(game, x, y) {
    sprite = ASSET_MANAGER.getAsset('img/bullet.png');
    animation = new Animation(sprite, 7, 0.05, true);
  }
  
  void update() {
    if (outsideScreen()) {
      removeFromWorld = true;
    } else if (x.abs() >= explodesAt.x.abs() || y.abs() >= explodesAt.y.abs()) {
      // TODO play sound
      game.addEntity(new BulletExplosion(game, explodesAt.x, explodesAt.y));
      removeFromWorld = true;
    } else {
      x = radialDistance * Math.cos(angle);
      y = radialDistance * Math.sin(angle);
      radialDistance += speed * game.clockTick;
    }
  }
  
  void draw(ctx) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI/2);
    ctx.translate(-x, -y);
    animation.drawFrame(game.clockTick, ctx, x, y);
    ctx.restore();
    
    super.draw(ctx);
  }

}
