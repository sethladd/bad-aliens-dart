class BulletExplosion extends GameEntity {
  
  Animation animation;
  
  BulletExplosion(Game game, num x, num y) : super.withPosition(game, x, y) {
    sprite = game.assetManager.getAsset('img/explosion.png');
    animation = new Animation(sprite, 34, 0.05);
    radius = animation.frameWidth / 2;
  }
  
  void update() {
    if (animation.isDone()) {
      removeFromWorld = true;
      return;
    }
    
    radius = (animation.frameWidth/2) * scaleFactor();
    
    for (var i = 0; i < game.entities.length; i++) {
        var alien = game.entities[i];
        if (alien is Alien && isCaughtInExplosion(alien)) {
            game.score += 10;
            alien.explode();
        }
    }
  }
  
  bool isCaughtInExplosion(Alien alien) {
    var distance_squared = (((x - alien.x) * (x - alien.x)) + ((y - alien.y) * (y - alien.y)));
    var radii_squared = (radius + alien.radius) * (radius + alien.radius);
    return distance_squared < radii_squared; 
  }
  
  num scaleFactor() {
    return 1 + (animation.currentFrame() / 3);
  }
  
  void draw(ctx) {
    animation.drawFrame(game.clockTick, ctx, x, y, scaleFactor());
    
    super.draw(ctx);
  }
}
