function initializeState(settings) {
  return {
    ticks: 0,
    speed: 7,
    player: {
      x: Math.ceil(settings.width/2)-1
    },
    enemies: []
  }
}