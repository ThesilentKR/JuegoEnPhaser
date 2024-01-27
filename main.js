var menuConfig = {
    width: 370,
    height: 550,
    renderer: Phaser.CANVAS,
    parent: 'Parte_juego',
};

var menu = new Phaser.Game(menuConfig);

menu.state.add('menu', menuState);
menu.state.add('juego', juego);

menu.state.start('menu');
