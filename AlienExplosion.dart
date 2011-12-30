class AlienExplosion extends GameEntity {
  
  Animation animation;

  AlienExplosion(Game game, num x, num y) : super.withPosition(game, x, y) {
    animation = new Animation(game.assetManager.getAsset('img/alien-explosion.png'), 69, 0.05);
    this.radius = this.animation.frameWidth / 2;
  }
  
  void update() {
    if (animation.isDone()) {
      removeFromWorld = true;
    }
  }
  
  void draw(ctx) {
    super.draw(ctx);
    animation.drawFrame(game.clockTick, ctx, x, y);
  }
}
