class Timer {

  num gameTime = 0;
  num maxStep = 0.05;
  num wallLastTimestamp = 0;
  
  num tick() {
    num wallCurrent = new Date.now().milliseconds;
    num wallDelta = (wallCurrent - wallLastTimestamp) / 1000;
    wallLastTimestamp = wallCurrent;
    
    num gameDelta = Math.min(wallDelta, this.maxStep);
    gameTime += gameDelta;
    return gameDelta;
  }
}