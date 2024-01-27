var fondoJuego;
var nave;
var cursores;

var balas;
var tiempoBala = 0;
var botonDisparo;

var enemigos;
var puntaje = 0;
var puntajeTexto;
var enemigosRestantes;

var sonidoDisparo;
var sonidoExplosion;

var juegoConfig = {
    width: 370,
    height: 550,
};

var juego = {
    preload: function () {
        this.load.image('fondo', 'img/space.png');
        this.load.image('personaje', 'img/nave.png');
        this.load.image('laser', 'img/laser.png');
        this.load.image('enemigo', 'img/asteroide.png');

        this.load.audio('disparo', 'ruta/Sonidodisparolaser.mp3'); 
        this.load.audio('explosion', 'ruta/SPACEINVADEREXPLOSION.mp3'); 
    },

    create: function () {
        fondoJuego = this.add.tileSprite(0, 0, juegoConfig.width, juegoConfig.height, 'fondo');

        nave = this.add.sprite(juegoConfig.width / 2, juegoConfig.height - 50, 'personaje');
        nave.anchor.setTo(0.5);

        cursores = this.input.keyboard.createCursorKeys();
        botonDisparo = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        balas = this.add.group();
        balas.enableBody = true;
        balas.physicsBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('outOfBoundsKill', true);
        balas.setAll('checkWorldBounds', true);

        enemigos = this.add.group();
        enemigos.enableBody = true;
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;

        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 10; x++) {
                var enemigo = enemigos.create(x * 40 / 1.5, y * 20 / 1, 'enemigo');
                enemigo.anchor.setTo(0.5);
                enemigo.scale.setTo(0.11);
                enemigo.body.setSize(enemigo.width, enemigo.height, 0, 0);
            }
        }

        enemigos.x = 50;
        enemigos.y = 30;

        enemigosRestantes = enemigos.total;

        var animacion = this.add.tween(enemigos).to({ x: 100 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        animacion.onLoop.add(this.descender, this);

        puntajeTexto = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '16px', fill: '#fff' });

        sonidoDisparo = this.add.audio('disparo');
        sonidoExplosion = this.add.audio('explosion');
    },

    update: function () {
        nave.position.x = this.input.x;

        if (this.input.activePointer.isDown) {
            if (this.time.now > tiempoBala) {
                var bala = balas.getFirstExists(false);
                if (bala) {
                    bala.reset(nave.x, nave.y);
                    bala.body.velocity.y = -300;
                    tiempoBala = this.time.now + 600;

                    sonidoDisparo.play();
                }
            }
        }

        this.physics.arcade.overlap(balas, enemigos, this.colision, null, this);
    },

    colision: function (bala, enemigo) {
        bala.kill();
        enemigo.kill();
        puntaje += 10;
        puntajeTexto.text = 'Puntaje: ' + puntaje;

        sonidoExplosion.play();

        enemigosRestantes--;

        if (enemigosRestantes === 0) {
            this.mostrarMensajeVictoria();
            this.physics.arcade.isPaused = true;
        }
    },

    descender: function () {
        enemigos.y += 10;
    },

    mostrarMensajeVictoria: function () {
        var mensajeVictoria = this.add.text(this.world.centerX, this.world.centerY, '¡Has ganado!\n¡Todos los enemigos eliminados!', { fontSize: '16px', fill: '#fff', align: 'center' });
        mensajeVictoria.anchor.setTo(0.5);
    }
};

