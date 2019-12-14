const gameOver = {
  handleInput: function(gameEngine) {
    if(gameEngine.input.isKeyCodeDown(32)) {
      gameEngine.state = initializeState(gameEngine.settings);
      gameEngine.engine.scene = 0;
    }
  },

  gameUpdate: function(gameEngine) {
  },

  render: function(_settings, state) {
    let render = "";
    render += "Game Over\n";
    render += "Score:" + state.ticks;
    return render;
  }
}
