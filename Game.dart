class Game {
  
  List entities;
  html.CanvasRenderingContext2D ctx;
  Point click;
  Point mouse;
  Timer timer;
  num clockTick;
  num surfaceWidth;
  num surfaceHeight;
  num halfSurfaceWidth;
  num halfSurfaceHeight;
  Point clientBoundingRect;
  AssetManager assetManager;

  bool showOutlines = false;
  
  Game(AssetManager this.assetManager) {
    timer = new Timer();
    entities = [];
  }

  void init(html.CanvasRenderingContext2D _ctx) {
    this.ctx = _ctx;
    surfaceWidth = ctx.canvas.width;
    surfaceHeight = ctx.canvas.height;
    halfSurfaceWidth = surfaceWidth/2;
    halfSurfaceHeight = surfaceHeight/2;
    
    Future<html.ElementRect> futureRect = ctx.canvas.rect;
    futureRect.then((html.ElementRect rect) {
      clientBoundingRect = new Point(rect.bounding.left, rect.bounding.top);
    });
    
    startInput();
    
    print('game initialized');
  }
  
  void start() {
    print("starting game");
    html.window.requestAnimationFrame(loop);
  }
  
  bool loop(int time) {
    clockTick = this.timer.tick();
    update();
    draw();
    click = null;
    html.window.requestAnimationFrame(loop);
    return false;
  }
  
  void startInput() {
    print('Starting input');
    
    Point getXandY(html.MouseEvent e) {
        e.preventDefault();
        num x =  e.clientX - clientBoundingRect.x - (ctx.canvas.width/2);
        num y = e.clientY - clientBoundingRect.y - (ctx.canvas.height/2);
        return new Point(x, y);
    }
    
    ctx.canvas.on.click.add((e) {
        click = getXandY(e);
    });
    
    ctx.canvas.on.mouseMove.add((e) {
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
    
    for (var i = entities.length-1; i >= 0; --i) {
        if (entities[i].removeFromWorld) {
            entities.removeRange(i, 1);
        }
    }
  }
}