class Tableau1 extends Phaser.Scene {
    preload() {
        // le preload des images
        this.load.image('brick','assets/carre.png');
        this.load.image('balle','assets/cercle.png');

    }


    create() {
        let me = this;
        this.score = 0
        this.tailleraquette = 200
        this.tailleecran = 800
        this.vie = 3



        // this.physics.add.collider(this.balle,this.brique);

        this.murDroite=this.physics.add.sprite(0, 0,'brick').setOrigin(0, 0);
        this.murDroite.setDisplaySize(20,this.tailleecran);
        this.murDroite.setImmovable(true);

        this.murGauche=this.physics.add.sprite(780, 0,'brick').setOrigin(0, 0);
        this.murGauche.setDisplaySize(20,this.tailleecran);
        this.murGauche.setImmovable(true);

        this.murHaut=this.physics.add.sprite(0, 0,'brick').setOrigin(0, 0);
        this.murHaut.setDisplaySize(this.tailleecran,20);
        this.murHaut.setImmovable(true);

        this.joueur=this.physics.add.sprite((this.tailleecran/2)-100, 680,'brick').setOrigin(0, 0);
        this.joueur.setDisplaySize(this.tailleraquette,20);
        this.joueur.setImmovable(true);

        this.balle=this.physics.add.sprite((this.tailleecran/2)-10, this.joueur.y - 20,'balle').setOrigin(0, 0);
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.2,1.2);
        this.balle.body.setMaxVelocityX(300);
        this.balle.body.setMaxVelocityY(300);
        this.balle.setVelocityY(-200);

        for (let i = 1; i < 6; i++) {
            for (let x = 1; x < 10; x++) {

                let brique = this.physics.add.sprite(x* 74 , i* 80, 'brick').setOrigin(0, 0)
                brique.setDisplaySize(60, 30)
                brique.setImmovable(true)

                this.physics.add.collider(this.balle,brique, function(){
                    brique.disableBody(true,true);
                    this.score += 1
                    console.log("Le score est de")
                    console.log(this.score )
                });

            }
        }

        this.physics.add.collider(this.balle, this.murHaut);
        this.physics.add.collider(this.balle, this.murGauche);
        this.physics.add.collider(this.balle, this.murDroite);

        this.physics.add.collider(this.balle,this.joueur, function(){
            me.rebond(me.joueur);
        });

        this.add.text(0, 0, 'Score :', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(50, 0, this.score, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });


        this.initKeyboard();
    }

    rebond(raquette){

        let hauteurRaquette = raquette.displayWidth;

        let positionRelativeRaquette =(this.balle.x-this.joueur.x);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);

        this.balle.setVelocityX( this.balle.body.velocity.x + positionRelativeRaquette * hauteurRaquette)
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
                    me.joueur.setVelocityX(-700)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.joueur.setVelocityX(700)
                    break;
            }
        })
    }



    update() {

        if(this.balle.y > 680){
            this.balle.y = this.joueur.y - 20
            this.balle.x = (this.tailleecran/2)-10
            this.joueur.x = (this.tailleecran/2)-100
            this.balle.setVelocityY(-200);
            this.vie -= 1
            console.log(this.vie)

        }

        if(this.joueur.x < 20){
            this.joueur.x = 20;
        }
        if(this.joueur.x > 780 - this.tailleraquette){
            this.joueur.x = 780 - this.tailleraquette;
        }

    }
}