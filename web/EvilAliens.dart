part of bad_aliens;

class EvilAliens extends Game {
  num lives = 10;
  num score = 0;

  Sentry sentry;
  Earth earth;
  num lastAlienAddedAt;
  Math.Random random = new Math.Random();

  EvilAliens(AssetManager assetManager) : super(assetManager);

  void start() {
    sentry = new Sentry(this);
    earth = new Earth(this);
    addEntity(earth);
    addEntity(sentry);
    super.start();
  }

  void update() {
    if (lastAlienAddedAt == null || (timer.gameTime - lastAlienAddedAt) > 1) {
      addEntity(new Alien(this, ctx.canvas.width, random.nextDouble() * Math.PI * 180));
      lastAlienAddedAt = timer.gameTime;
    }

    if (this.score <= 0) {
      // show game over screen
    }

    super.update();
  }

  void drawBeforeCtxRestore() {
    drawScore();
    drawLives();
  }

  void drawLives() {
    ctx.fillStyle = "red";
    ctx.font = "bold 2em Arial";
    ctx.fillText("Lives: ${lives}", -ctx.canvas.width/2 + 50, ctx.canvas.height/2 - 80);
  }

  void drawScore() {
    ctx.fillStyle = "red";
    ctx.font = "bold 2em Arial";
    ctx.fillText("Score: ${score}", -ctx.canvas.width/2 + 50, ctx.canvas.height/2 - 50);
  }
}
