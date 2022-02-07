class Tableau1 extends Phaser.Scene {
    preload() {
        // le preload des images
        this.load.image('brick','assets/carre.png');
        this.load.image('balle','assets/cercle.png');

    }


    create() {

        this.tailleraquette = 200
        this.tailleEcran = 800

        this.Bballe = new Balle(this)

        this.murDroite=this.physics.add.sprite(0, 0,'brick').setOrigin(0, 0);
        this.murDroite.setDisplaySize(20,this.tailleEcran);

        this.murGauche=this.physics.add.sprite(780, 0,'brick').setOrigin(0, 0);
        this.murGauche.setDisplaySize(20,this.tailleEcran);

        this.murHaut=this.physics.add.sprite(0, 0,'brick').setOrigin(0, 0);
        this.murHaut.setDisplaySize(this.tailleEcran,20);

        this.joueur=this.physics.add.sprite((this.tailleEcran/2)-100, 680,'brick').setOrigin(0, 0);
        this.joueur.setDisplaySize(this.tailleraquette,20);


        this.initKeyboard();
    }




    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.joueur.setVelocityX(0)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.joueur.setVelocityX(0)
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.joueur.setVelocityX(-200)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.joueur.setVelocityX(200)
                    break;
            }
        })
    }
    update() {
        if(this.joueur.x < 20){
            this.joueur.x = 20;
        }
        if(this.joueur.x > 780 - this.tailleraquette){
            this.joueur.x = 780 - this.tailleraquette;
        }
    }
}