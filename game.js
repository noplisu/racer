const game = {
  handleInput: function(gameEngine) {
    if(gameEngine.input.isKeyDown("a") && gameEngine.state.player.x > 0)
      gameEngine.state.player.x--;
    if(gameEngine.input.isKeyDown("d") && gameEngine.state.player.x < gameEngine.settings.width-3)
      gameEngine.state.player.x++;
  },

  gameUpdate: function(gameEngine) {
    const { settings, state, engine } = gameEngine;
    if(state.ticks % Math.max(state.speed * 10, 8) == 0) {
      this.spawnEnemy(state, settings);
    }
    if(state.ticks % Math.max(state.speed, 1) == 0) {
      this.moveEnemies(state, settings);
    }
    this.despawnEnemies(state, settings);
    this.speedUp(state);
    state.ticks++;
    this.detectColision(state, settings, engine);
  },

  spawnEnemy: function(state, settings) {
    let enemy = { x: Math.floor(Math.random() * (settings.width-2)), y: 0 };
    state.enemies = [...state.enemies, enemy];
  },

  moveEnemies: function(state) {
    state.enemies.forEach(function(element) {
      return element.y++;
    });
  },

  despawnEnemies: function(state, settings) {
    state.enemies = state.enemies.filter(function(element) {
      return element.y < settings.height + 3;
    });
  },

  detectColision: function(state, settings, engine){
    state.enemies.forEach(function(element) {
      if (element.y > settings.height - 4 && element.x <= state.player.x + 2 && element.x >= state.player.x - 2) {
        engine.scene = 1;
      }
    })
  },

  speedUp: function(state) {
    if(state.ticks % 100 == 0) {
      state.speed -= 1;
    }
  },

  render: function(settings, state) {
    let render = "";
    render += this.renderLine(settings);
    for (var y = 0; y < settings.height; y++) {
      render += "|"
      for (var x = 0; x < settings.width; x++) {
        let shouldContinue = false;
        if (x == state.player.x && y == settings.height - 4) {
          render += settings.player[0];
          shouldContinue = true;
        } 
        if (x == state.player.x && y == settings.height - 3) {
          render += settings.player[1];
          shouldContinue = true;
        }
        if (x == state.player.x && y == settings.height - 2) {
          render += settings.player[2];
          shouldContinue = true;
        }
        if (x == state.player.x && y == settings.height - 1) {
          render += settings.player[3];
          shouldContinue = true;
        }
        state.enemies.forEach(function(element) {
          if (x == element.x && y == element.y - 3) {
            render += settings.enemy[0];
            shouldContinue = true;
          }
          else if (x == element.x && y == element.y - 2) {
            render += settings.enemy[1];
            shouldContinue = true;
          }
          else if (x == element.x && y == element.y - 1) {
            render += settings.enemy[2];
            shouldContinue = true;
          }
          else if (x == element.x && y == element.y) {
            render += settings.enemy[3];
            shouldContinue = true;
          }
        });
        if (shouldContinue) {
          x += 2;
          continue;
        }
        render += " ";
      }
      render += "|\n";
    }
    render += this.renderLine(settings);
    return render;
  },

  renderLine: function(settings) {
    let render = "";
    render += "|"
    for (var x = 0; x < settings.width; x++) {
      render += "=";
    }
    render += "|\n";
    return render;
  }
}
