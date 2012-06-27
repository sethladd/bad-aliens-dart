class Animation {

  html.ImageElement spriteSheet;
  num frameWidth;
  num frameHeight;
  num frameDuration;
  num totalTime;
  bool loop;
  num elapsedTime = 0;
  
  Animation(this.spriteSheet, this.frameWidth, this.frameDuration, [this.loop = false]) {
    frameHeight = spriteSheet.height;
    totalTime = (spriteSheet.width / frameWidth) * frameDuration;
  }
    
  void drawFrame(tick, ctx, x, y, [scaleBy = 1]) {
    elapsedTime += tick;
    if (loop) {
        if (isDone()) {
            elapsedTime = 0;
        }
    } else if (isDone()) {
        return;
    }
    num index = currentFrame();
    num locX = x - (frameWidth/2) * scaleBy;
    num locY = y - (frameHeight/2) * scaleBy;
    ctx.drawImage(spriteSheet,
                  index*frameWidth, 0,  // source from sheet
                  frameWidth, frameHeight,
                  locX, locY,
                  frameWidth*scaleBy,
                  frameHeight*scaleBy);
  }
  
  bool isDone() {
    return (elapsedTime >= totalTime);
  }
  
  num currentFrame() {
    return (elapsedTime / frameDuration).floor();
  }
}