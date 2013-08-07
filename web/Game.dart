part of bad_aliens;
// Modified by Normand. more comment push to upstream
class Game {

  List entities = [];
  CanvasRenderingContext2D ctx;
  GamePoint click;
  GamePoint mouse;
  Timer timer = new Timer();
  num clockTick;
  num surfaceWidth;
  num surfaceHeight;
  num halfSurfaceWidth;
  num halfSurfaceHeight;
  GamePoint clientBoundingRect; ////
  AssetManager assetManager;

  bool showOutlines = false;

  Game(AssetManager this.assetManager);

  void init(CanvasRenderingContext2D _ctx) {
    this.ctx = _ctx;
    surfaceWidth = ctx.canvas.width;
    surfaceHeight = ctx.canvas.height;
    halfSurfaceWidth = surfaceWidth/2;
    halfSurfaceHeight = surfaceHeight/2;

    Rect rect = ctx.canvas.getBoundingClientRect();
    clientBoundingRect = new GamePoint(rect.left, rect.top);

    startInput();

    print('game initialized');
  }

  void start() {
    print("starting game");
    window.requestAnimationFrame(loop);
  }

  void loop(num time) {
    clockTick = this.timer.tick();
    update();
    draw();
    click = null;
    window.requestAnimationFrame(loop);
  }

  void startInput() {
    print('Starting input');

    GamePoint getXandY(e) {
      num x =  e.clientX - clientBoundingRect.x - (ctx.canvas.width/2);
      num y = e.clientY - clientBoundingRect.y - (ctx.canvas.height/2);
      return new GamePoint(x, y);
    }

    ctx.canvas.onClick.listen((e) {
       click = getXandY(e);
    });

    ctx.canvas.onMouseMove.listen((e) {
       mouse = getXandY(e);
    });

    print('Input started');
  }

  void addEntity(GameEntity entity) {
    entities.add(entity);
  }

  void draw() {
    ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    ctx.save();
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
    for (final GameEntity entity in entities) {
      entity.draw(ctx);
    }
    drawBeforeCtxRestore();
    ctx.restore();
  }

  void drawBeforeCtxRestore() {

  }

  void update() {
    num entitiesCount = entities.length;

    for (var i = 0; i < entitiesCount; i++) {
      var entity = entities[i];

      if (!entity.removeFromWorld) {
        entity.update();
      }
    }

    var entitiesLeng = entities.length;
    var j = entities.length-1;

    for (; j >= 0; --j) {
      if (entities[j].removeFromWorld) {
        //entities.removeRange(i, 1); Boum here !!
        entities.removeAt(j);
      }
    }
  }
}