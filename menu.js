var fondoMenu;
var botonIniciar;
var musicaMenu;

var menuState = {
    preload: function() {
        menu.load.image('fondoMenu', 'img/espaciofondo.jpg');
        menu.load.image('botonImagen', 'img/Btton.png');
        menu.load.audio('musicaMenu', 'img/SaturnSpaceInvadersPS1Soundtrack.mp3');
    },

    create: function() {
        fondoMenu = menu.add.tileSprite(0, 0, juegoConfig.width, juegoConfig.height, 'fondoMenu');

        botonIniciar = menu.add.button(menu.world.centerX, menu.world.centerY, 'botonImagen', this.iniciarJuego, this, 1, 0, 2);
        botonIniciar.anchor.setTo(0.5);
        botonIniciar.scale.setTo(0.5, 0.5);
        musicaMenu = menu.add.audio('musicaMenu');
        musicaMenu.loop = true;
        musicaMenu.play();
    },

    update: function() {
        if (menu.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.iniciarJuego();
        }
    },

    iniciarJuego: function() {
        musicaMenu.stop();
        menu.state.start('juego');
    }
};
