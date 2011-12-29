abstract class GameEntity {
  Game game;
  num x;
  num y;
  bool removeFromWorld = false;
  var sprite = null;
  num radius;
  
  GameEntity(Game this.game, num this.x, num this.y, this.radius);
  
  abstract void update();
  
  void draw(ctx) {
    if (game.showOutlines) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.arc(x, y, radius, 0, Math.PI*2, false);
      ctx.stroke();
      ctx.closePath();
    }
  }
  
  void drawSpriteCentered(ctx) {
    num x = x - sprite.width/2;
    num y = y - sprite.height/2;
    ctx.drawImage(sprite, x, y);
  }
  
  void outsideScreen() {
    return (x > game.halfSurfaceWidth || x < -(game.halfSurfaceWidth) ||
        y > game.halfSurfaceHeight || y < -(game.halfSurfaceHeight));
  }
  
  void rotateAndCache(offscreenCanvas, image, angle) {
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size/2, size/2);
    offscreenCtx.rotate(angle + Math.PI/2);
    offscreenCtx.translate(0,0);
    offscreenCtx.drawImage(image, -(image.width/2), -(image.height/2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
  }
}