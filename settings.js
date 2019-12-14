function initializeSettings() {
  return {
    width: 21,
    height: 20,
    player: [
      " # ",
      "###",
      " # ",
      "###"
    ],
    enemy: [
      "XXX", 
      " X ", 
      "XXX", 
      " X "
    ],
    scenes: [
      game,
      gameOver
    ]
  };
}