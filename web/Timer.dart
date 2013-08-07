part of bad_aliens;

class Timer {

  num gameTime = 0;
  static final num MAX_STEP = 0.05;
  num wallLastTimestamp = 0;

  num tick() {
    num wallCurrent = new DateTime.now().millisecondsSinceEpoch;
    num wallDelta = (wallCurrent - wallLastTimestamp) / 1000;
    wallLastTimestamp = wallCurrent;

    num gameDelta = Math.min(wallDelta, MAX_STEP);
    gameTime += gameDelta;
    return gameDelta;
  }
}