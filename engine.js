function main() {
  let settings = initializeSettings();
  let gameEngine = {
    engine: initializeInternalState(),
    settings,
    state: initializeState(settings),
    input: setupInput()
  }
  window.addEventListener('keyup', function(event) { gameEngine.input.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { gameEngine.input.onKeydown(event); }, false);
  setInterval(gameLoop, 50, gameEngine);
}

function initializeEngine() {
  return {
    scene: 0
  }
}

function setupInput() {
  return {
    keys: {},
    keyCodes: {},
    
    isKeyDown: function(key) {
      return this.keys[key];
    },

    isKeyCodeDown: function(keyCode) {
      return this.keyCodes[keyCode];
    },
    
    onKeydown: function(event) {
      this.keys[event.key] = true;
      this.keyCodes[event.keyCode] = true;
    },
    
    onKeyup: function(event) {
      delete this.keys[event.key];
      delete this.keyCodes[event.keyCode];
    }
  }
}

function gameLoop(gameEngine) {
  const { settings, engine, state, input } = gameEngine;
  settings.scenes[engine.scene].handleInput(gameEngine);
  settings.scenes[engine.scene].gameUpdate(gameEngine);
  document.body.getElementsByTagName("pre")[0].innerText = settings.scenes[engine.scene].render(settings, state);
}

function initializeInternalState() {
  return {
    scene: 0
  }
}
