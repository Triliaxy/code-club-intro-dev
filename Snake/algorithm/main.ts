import type { Direction, Position, SnakeGame } from '../types';

/*
PROGRAMME TON SNAKE

Le README de ce dossier décrit les propriétés, les méthodes et leurs types.
La région CODE ICI, après les étapes, contient le squelette à compléter.

Comment lire les consignes :
- DÉJÀ FOURNI : existe dans le projet dès le départ.
- APRÈS LES ÉTAPES PRÉCÉDENTES : fonctionnera si tu as terminé ces étapes.
- À FAIRE : code que tu dois écrire pour cette étape.
- TEST : résultat à observer avant de passer à la suite.

Les fonctions existent déjà, mais leur traitement reste à programmer.
Leurs paramètres et leurs types de retour sont déjà écrits.
Les return false et return null marqués PROVISOIRE permettent de compiler :
ils ne font pas encore les vérifications demandées.

Complète les fonctions existantes, sans les recopier ni créer une deuxième
gameLoop. Garde-les à l'intérieur de gameLoop, avant son return final.
Une consigne en commentaire ne s'exécute pas : écris ton code à côté.

Au départ, le serpent est dessiné mais reste immobile.
Aucune pomme n'est affichée et aucun minuteur n'est démarré.
*/

//#region Étape 1 — Comprendre le point de départ

/*
OBJECTIF
Repérer comment la page appelle ton programme.

DÉJÀ FOURNI
- Les types Direction, Position et SnakeGame sont importés en haut du fichier.
- GamePage crée l'instance de Snake et la transmet à gameLoop.
- gameLoop est déclarée et exportée pour être accessible depuis GamePage.
- Toutes les petites fonctions sont déjà déclarées à l'intérieur de gameLoop.
- Le return final transmet changeDirection et stop à GamePage.
- La page relie déjà les flèches à changeDirection et le nettoyage à stop.
  Leur contenu reste à compléter aux étapes 4 et 5.

À FAIRE
Aucune nouvelle fonction ni aucun import à écrire à cette étape.
Retrouve ces éléments dans CODE ICI et lis leurs commentaires JSDoc.
Repère l'accolade qui ferme gameLoop : les petites fonctions restent dedans.

TEST
Lance npm run dev, puis clique sur « Commencer ».
Le serpent apparaît et reste immobile : c'est normal pour le squelette.
*/

//#endregion

//#region Étape 2 — Comprendre la mémoire de la partie

/*
OBJECTIF
Comprendre les informations conservées entre deux tours.

DÉJÀ FOURNI
Les six variables suivantes sont déjà déclarées et initialisées dans gameLoop :
- direction : Direction, commence avec snake.direction.
  Elle gardera le dernier choix autorisé pour le prochain déplacement.
- score : number, commence à 0.
  Il comptera les pommes mangées.
- isGameOver : boolean, commence à false.
  Il indiquera si la partie est terminée.
- timer : ReturnType<typeof setInterval> | undefined, commence à undefined.
  Il gardera l'identifiant du minuteur quand tu le démarreras à l'étape 4.
- applePosition : Position | null, commence à null.
  La première pomme sera choisie et affichée à l'étape 8.
- stepDuration : number, vaut 400.
  Ce délai constant correspond à 400 millisecondes entre deux tours.

À FAIRE
Aucune variable de partie à recréer à cette étape.
Repère leur type et explique ce que chacune mémorise.
Observe let pour les valeurs qui changeront et const pour le délai.
Les calculs temporaires, comme nextPosition, seront ajoutés plus tard
dans la fonction qui en a besoin.

TEST
Affiche temporairement score, direction et snake.segments.length
dans la console. Tu dois lire 0, 'right' et 3.
Retire ensuite cet affichage d'essai.
*/

//#endregion

//#region Étape 3 — Compléter moveSnake

/*
OBJECTIF
Demander exactement un déplacement dans la direction choisie.

DÉJÀ FOURNI
- moveSnake n'a pas de paramètre et son type de retour est boolean.
- La variable direction est accessible depuis cette fonction.
- Snake fournit MoveUp, MoveDown, MoveLeft et MoveRight.
  Ces méthodes mettent déjà à jour les segments et leur dessin.
- Le return false de moveSnake est seulement une valeur PROVISOIRE :
  il n'appelle aucune méthode et ne déplace rien.

À FAIRE DANS moveSnake
1. Lire direction avec des if ou un switch.
2. Choisir la méthode de Snake correspondant à cette direction.
3. Appeler une seule méthode de déplacement.
4. Renvoyer son résultat : true si le serpent avance, false s'il est bloqué.
Remplace le retour provisoire par ton traitement.
Ne modifie pas toi-même le tableau snake.segments.

TEST
Avant le return final de gameLoop, appelle temporairement moveSnake une fois.
Sur le plateau actuel de 9 cases, la tête passe de (5, 4) à (6, 4)
en avançant à droite, et le serpent garde trois morceaux.
Retire cet appel d'essai avant de programmer le minuteur.
*/

//#endregion

//#region Étape 4 — Compléter playTurn, stop et le démarrage

/*
OBJECTIF
Répéter les déplacements et pouvoir arrêter cette répétition.

DÉJÀ FOURNI
- playTurn et stop sont déclarées sans paramètre, avec un retour void.
- timer existe, mais ne contient encore aucun identifiant.
- stepDuration vaut déjà 400.
- La région « Démarrage de la partie » existe à la fin de gameLoop.
  Elle contient seulement des consignes : aucun minuteur n'est créé.
- GamePage appellera stop en quittant ou en remplaçant la partie.

APRÈS L'ÉTAPE 3
moveSnake sait demander un seul déplacement.

À FAIRE
1. Dans playTurn, appeler seulement moveSnake pour le moment.
2. Dans stop, vérifier si timer est différent de undefined.
3. Si un identifiant existe, le transmettre à clearInterval,
   puis remettre timer à undefined.
4. Dans la région « Démarrage de la partie », créer un seul minuteur
   avec setInterval et conserver son identifiant dans timer.
   Le minuteur doit appeler playTurn avec le délai stepDuration.
   Transmets le nom de la fonction, sans l'appeler immédiatement.

TEST
Le serpent avance d'une case toutes les 400 ms.
À ce stade, Snake bloque déjà les murs mais tu n'as pas encore programmé
la défaite : le serpent restera bloqué au bord, ce qui est attendu.
Appeler stop plusieurs fois doit rester possible sans erreur.
*/

//#endregion

//#region Étape 5 — Compléter changeDirection

/*
OBJECTIF
Garder uniquement le dernier choix autorisé pour le prochain tour.

DÉJÀ FOURNI
- changeDirection reçoit nextDirection de type Direction et renvoie void.
- GamePage et keyboard.ts transmettent déjà les touches à cette fonction.
  Tu n'as pas d'écouteur clavier à ajouter.
- Snake.CanTurn vérifie les demi-tours par rapport au dernier déplacement.
  La direction actuelle est aussi autorisée.
- direction et isGameOver sont déjà déclarées.

APRÈS LES ÉTAPES 3 ET 4
Le minuteur appelle playTurn, qui utilise moveSnake et la valeur de direction.

À FAIRE DANS changeDirection
1. Quitter si la partie est terminée.
2. Vérifier nextDirection avec snake.CanTurn.
3. Si la demande est autorisée, remplacer direction par ce nouveau choix.
4. Sinon, conserver le choix précédent.
Ne crée pas de tableau d'inputs et ne déplace pas le serpent ici.
L'affectation de isGameOver à true arrivera à l'étape 6.

TEST
Pendant que le serpent avance à droite, avant le même tick :
- Haut puis bas : bas remplace haut.
- Haut puis droite : droite annule le virage.
- Haut puis gauche : gauche est un demi-tour, donc haut reste choisi.
Il n'y a qu'un déplacement au tick. Sans nouvel appui, le serpent continue.
*/

//#endregion

//#region Étape 6 — Compléter hitsWall et gameOver, enrichir playTurn

/*
OBJECTIF
Détecter un mur avant le déplacement et afficher la défaite.

DÉJÀ FOURNI
- hitsWall reçoit une Position et doit renvoyer un boolean.
  Son return false provisoire ne détecte encore aucun mur.
- gameOver reçoit won de type boolean et renvoie void.
  Son contenu reste à écrire.
- Snake.GetNextPosition prévoit une position sans déplacer le serpent.
- snake.gridSize donne la taille du plateau.
- Snake.GameOver affiche déjà le résultat et le bouton Recommencer.
  Cette méthode d'affichage n'arrête pas le minuteur de ton algorithme.

APRÈS LES ÉTAPES 4 ET 5
stop sait annuler le minuteur et changeDirection refuse les demi-tours.
playTurn contient déjà l'appel de déplacement ajouté à l'étape 4.

À FAIRE DANS hitsWall
Remplacer le retour provisoire par les vérifications des deux coordonnées.
Une case sort si x ou y est négatif ou supérieur ou égal à gridSize.
Renvoyer true pour une case extérieure, false pour une case intérieure.

À FAIRE DANS gameOver
Marquer isGameOver à true, appeler stop, puis transmettre won à snake.GameOver.

À AJOUTER DANS playTurn, AVANT SON DÉPLACEMENT EXISTANT
1. Quitter le tour si la partie est déjà terminée.
2. Créer nextPosition avec snake.GetNextPosition(direction).
3. Vérifier cette position avec hitsWall.
4. En cas de mur, demander une défaite avec gameOver et quitter le tour.
Conserve un seul déplacement après ces vérifications.
Tu n'as pas besoin d'une deuxième condition sur le résultat de moveSnake :
les murs et les demi-tours auront déjà été vérifiés à ce stade.

TEST
Sur le plateau actuel, les coordonnées vont de 0 à 8.
Vérifie notamment -1, 0, 8 et 9 sur les deux axes.
Toucher chacun des quatre bords doit afficher la défaite sans sortir la tête.
*/

//#endregion

//#region Étape 7 — Compléter placeApple

/*
OBJECTIF
Choisir une case libre avec des boucles et un tableau.

DÉJÀ FOURNI
- placeApple n'a pas de paramètre et son retour est Position | null.
- snake.gridSize et snake.segments sont accessibles.
- Le return null provisoire ne cherche aucune case.
  Il ne signifie pas encore que le plateau a réellement été vérifié.
- Aucun tableau freePositions ni aucune boucle n'est fourni dans la fonction.

À FAIRE DANS placeApple
1. Créer un tableau vide freePositions de type Position[].
2. Parcourir chaque ligne y et, dans cette ligne, chaque colonne x.
3. Pour chaque case, préparer un booléen isOccupied avec la valeur false.
4. Parcourir les segments et comparer les deux coordonnées à celles de la case.
5. Si un segment correspond, marquer la case occupée.
   Tu peux quitter la boucle des segments avec break.
6. Ajouter uniquement les cases libres dans freePositions avec push.
7. Après la visite de tout le plateau, renvoyer null si la liste est vide.
8. Sinon, choisir un indice au hasard et renvoyer la position correspondante.
Consulte le README pour Math.random et Math.floor.

La fonction choisit une position sans modifier le serpent ni afficher la pomme.
Elle sera utilisée au démarrage à l'étape 8, puis après les repas à l'étape 9.

TEST
Sur un plateau de 9 × 9 avec trois segments, il y a 78 cases libres.
Tu peux afficher temporairement la longueur de freePositions pour vérifier,
puis retirer ce message. La position choisie ne doit appartenir à aucun segment.
*/

//#endregion

//#region Étape 8 — Ajouter l'affichage initial

/*
OBJECTIF
Préparer le score et la première pomme avant de lancer les tours.

DÉJÀ FOURNI
- score vaut déjà 0 et applePosition vaut encore null au départ.
- Snake.ShowScore affiche un nombre.
- Snake.ShowApple affiche une position ou retire la pomme avec null.
- La région « Démarrage de la partie » est déjà réservée à la fin de gameLoop.
- Aucune fonction supplémentaire n'est nécessaire pour cette étape.

APRÈS LES ÉTAPES 4 ET 7
Un seul minuteur démarre dans cette région, et placeApple choisit une case libre.

À AJOUTER DANS LA RÉGION DE DÉMARRAGE
1. AVANT le minuteur existant, demander la première position à placeApple.
2. Garder son résultat dans la variable applePosition déjà déclarée.
3. Afficher le score avec ShowScore.
4. Afficher la pomme avec ShowApple.
Ne crée pas un deuxième minuteur et ne redéclare pas applePosition.
La détection d'une victoire dès le démarrage sera ajoutée à l'étape 11.

TEST
Le score affiche 0 et la pomme apparaît sur une case libre.
Elle conserve sa position entre deux tours.
Elle n'est pas encore mangée : cette règle arrive à l'étape suivante.
*/

//#endregion

//#region Étape 9 — Ajouter les repas dans playTurn

/*
OBJECTIF
Faire grandir le serpent et ajouter un point lorsqu'il mange.

DÉJÀ FOURNI
- score et applePosition sont déjà déclarées dans gameLoop.
- Snake.Grow prépare un morceau supplémentaire au prochain mouvement réussi.
  La méthode ne déplace pas le serpent immédiatement.
- Le déplacement sait déjà conserver la queue lorsqu'une croissance est prévue.
- Le squelette de playTurn contient des repères pour les ajouts de cette étape.
  Ces commentaires n'ont encore aucun effet.

APRÈS LES ÉTAPES 6 À 8
playTurn prévoit nextPosition, vérifie les murs et demande un seul déplacement.
placeApple choisit une case libre, et la première pomme est affichée.

À AJOUTER DANS playTurn
1. Après les murs, créer un booléen willGrow.
   Il est vrai si la pomme existe et si ses deux coordonnées correspondent
   à nextPosition. Vérifie x ET y, pas seulement l'un des deux.
2. Avant le déplacement existant, demander Grow uniquement si willGrow est vrai.
3. Conserver un seul appel à moveSnake, avec ou sans pomme.
4. Après le déplacement, seulement en cas de repas :
   augmenter score, afficher sa valeur, choisir la nouvelle pomme,
   remplacer applePosition et afficher cette position.
Ne redéclare pas les variables de partie et ne rajoute pas un second mouvement.
Choisis la nouvelle pomme APRÈS le déplacement pour éviter de la placer sur la tête.

TEST
Une pomme ajoute exactement un morceau et un point.
Sans pomme, la longueur et le score ne changent pas.
La nouvelle pomme apparaît en dehors du serpent.
*/

//#endregion

//#region Étape 10 — Compléter hitsBody et l'utiliser dans playTurn

/*
OBJECTIF
Détecter une collision avec le corps sans bloquer la case quittée par la queue.

DÉJÀ FOURNI
- hitsBody reçoit position de type Position et willGrow de type boolean.
- Son retour est boolean, mais le return false provisoire ne vérifie rien.
- Les segments vont de la queue à l'indice 0 à la tête au dernier indice.
- Snake déplace et dessine les segments, mais ne termine pas la partie
  lorsque la tête rencontre le corps : c'est la règle que tu dois écrire.

APRÈS LES ÉTAPES 6 ET 9
playTurn possède nextPosition et willGrow. gameOver sait terminer la partie.

À FAIRE DANS hitsBody
1. Choisir le premier indice à examiner.
   Avec croissance, commencer à 0 car la queue reste sur place.
   Sans croissance, commencer à 1 car la queue quitte sa case.
2. Parcourir les segments à partir de cet indice.
3. Renvoyer true dès que x ET y correspondent à position.
4. Renvoyer false seulement après toute la recherche sans collision.
Remplace le retour provisoire par ta vérification.

À AJOUTER DANS playTurn
Après le calcul de willGrow, mais AVANT Grow et le déplacement,
appeler hitsBody. En cas de collision, terminer avec une défaite et quitter le tour.
Ne modifie pas la vérification des murs qui fonctionne déjà.

TEST
Viser le corps termine la partie avant le mouvement.
Cas de la queue : pour les segments (1, 1), (1, 2), (2, 2), (2, 1),
la tête peut aller à gauche vers (1, 1) sans croissance :
la queue quitte cette case au même moment.
*/

//#endregion

//#region Étape 11 — Ajouter la victoire

/*
OBJECTIF
Terminer la partie quand aucune case libre ne reste.

DÉJÀ FOURNI
- Le type de retour de placeApple autorise null.
  Le simple retour provisoire du squelette ne constitue pas cette détection.
- Snake.ShowApple sait déjà retirer la pomme quand on lui transmet null.
- Snake.GameOver sait afficher une victoire avec true.
- Le bouton Recommencer recrée déjà le serpent et appelle gameLoop.
  Tu n'as pas de bouton ni d'écouteur à programmer.

APRÈS LES ÉTAPES 6 À 9
placeApple renvoie réellement null si toutes les cases sont occupées.
gameOver sait arrêter la partie. Le démarrage et les repas appellent ShowApple.

À AJOUTER APRÈS UN REPAS DANS playTurn
Après le choix ET l'affichage de la nouvelle pomme, examiner applePosition.
Si elle vaut null, terminer avec une victoire.
Conserve l'affichage avant la victoire : ShowApple doit recevoir null
pour retirer la dernière pomme.

À ADAPTER DANS LE DÉMARRAGE
Après les affichages initiaux, examiner aussi applePosition.
Si aucune case libre n'existe, terminer immédiatement avec une victoire.
Sinon, démarrer le minuteur déjà prévu. Il ne doit pas démarrer après une victoire.

TEST
Un plateau de 9 × 9 contient 81 cases.
Avec trois segments au départ, 78 pommes permettent de le remplir.
À la victoire : plus de pomme visible, plus de mouvement et bouton Recommencer.
Un plateau déjà rempli au démarrage ne doit lancer aucun minuteur.
*/

//#endregion

//#region Étape 12 — Vérifier l'ensemble

/*
OBJECTIF
Vérifier que tes fonctions respectent les règles et s'appellent dans le bon ordre.

DÉJÀ FOURNI
Le projet sait compiler le TypeScript avec npm run build.
La page et le bouton Recommencer sont déjà reliés au jeu.
Aucun test de logique n'est exécuté automatiquement par les commentaires.

APRÈS LES ÉTAPES 1 À 11
Les traitements des fonctions et le démarrage auront été écrits par toi.

À FAIRE
Relire playTurn dans cet ordre :
1. Vérifier que la partie continue.
2. Prévoir la prochaine position dans la direction choisie.
3. Vérifier les murs et quitter le tour en cas de défaite.
4. Déterminer si la prochaine case contient la pomme.
5. Vérifier le corps en tenant compte de la croissance.
6. Préparer Grow uniquement si une pomme va être mangée.
7. Demander un seul déplacement.
8. Après un repas : actualiser le score, choisir ET afficher la nouvelle pomme.
9. Détecter une éventuelle victoire.

Puis tester chaque situation :
- Avancer sans pomme conserve la longueur et le score.
- Le dernier choix autorisé avant le tick remplace le précédent.
- La direction actuelle permet d'annuler un virage en attente.
- Un demi-tour est refusé sans effacer le dernier choix autorisé.
- Chaque bord et le corps déclenchent une défaite avant le déplacement.
- La case quittée par la queue reste accessible sans croissance.
- Une pomme ajoute exactement un morceau et un point.
- Aucune nouvelle pomme n'apparaît sur le serpent.
- La victoire retire la pomme et arrête les tours.
- Recommencer remet le score et le serpent à leurs valeurs initiales.
- Plusieurs redémarrages conservent un seul minuteur et la même vitesse.

Un return quitte seulement la fonction en cours.
stop annule les prochains appels du minuteur.

TEST FINAL
Lance npm run build depuis la racine du projet, puis rejoue tes scénarios.
Une compilation réussie vérifie les types, pas toutes les règles du jeu.
*/

//#endregion

//#region CODE ICI

/**
 * Étape 1 — Préparer la mémoire et les fonctions d'une nouvelle partie.
 * La page crée déjà le serpent et relie les flèches à changeDirection.
 * @param snake Serpent fourni par GamePage. Ses méthodes déplacent et dessinent les segments.
 * @returns Les fonctions changeDirection pour le clavier et stop pour arrêter le minuteur.
 */
export function gameLoop(snake: SnakeGame) {
  //#region Étape 2 — Mémoire de la partie

  // DÉJÀ FOURNI : les six valeurs de départ. Ne les déclare pas une deuxième fois.
  // À FAIRE à l'étape 2 : comprendre leur rôle et vérifier les valeurs dans la console.

  /** Direction choisie pour le prochain déplacement. */
  let direction: Direction = snake.direction;

  /** Nombre de pommes mangées. */
  let score: number = 0;

  /** Devient true après une victoire ou une défaite. */
  let isGameOver: boolean = false;

  /** Identifiant du minuteur, absent tant qu'il n'a pas démarré. */
  let timer: ReturnType<typeof setInterval> | undefined = undefined;

  /** Position de la pomme. placeApple choisira sa première valeur. */
  let applePosition: Position | null = null;

  /** Délai entre deux tours, en millisecondes. */
  const stepDuration: number = 400;

  //#endregion

  //#region Étapes 3 et 4 — Déplacements et temps

  /**
   * Étape 3 — Demander un seul déplacement dans la direction choisie.
   * Aucun paramètre : cette fonction lit la variable direction de la partie.
   * @returns true si le serpent a avancé, false si la méthode de déplacement l'a refusé.
   */
  function moveSnake(): boolean {
    // DÉJÀ FOURNI : la déclaration, son retour boolean et les méthodes de Snake.
    // À compléter : choisir une méthode Move... à partir de direction.
    // Renvoyer le résultat de cette méthode, sans modifier les segments toi-même.
    return false; // PROVISOIRE : remplacer par le résultat du déplacement.
  }

  /**
   * Étapes 4, 6, 9, 10 et 11 — Jouer un tour complet.
   * Aucun paramètre : lire les variables de la partie et les propriétés de snake.
   * @returns Rien. Met à jour le serpent, la pomme et le score, ou termine la partie.
   */
  function playTurn(): void {
    // DÉJÀ FOURNI : la déclaration. Aucun appel ni calcul n'est encore exécuté ici.
    // Étape 4 — À FAIRE : demander un seul déplacement pour tester le minuteur.

    // Étape 6 — À AJOUTER avant le déplacement : ignorer le tour si la partie est terminée.
    // Créer nextPosition pour prévoir la case sans déplacer, puis vérifier les murs.
    // Si la tête vise un mur, terminer la partie et quitter ce tour.

    // Étape 9 — À CRÉER après les murs : willGrow, qui indique si la case contient la pomme.

    // Étape 10 — À AJOUTER après willGrow : vérifier le corps avant toute modification.
    // Tenir compte du fait que la queue quitte sa case seulement sans croissance.

    // Étape 9 — À AJOUTER autour du déplacement existant : préparer Grow si nécessaire.
    // Garder l'unique appel de déplacement écrit à l'étape 4.
    // Après un repas : mettre à jour le score, choisir et afficher la nouvelle pomme.
    // Attention : chercher la nouvelle pomme APRÈS le déplacement.

    // Étape 11 — À VÉRIFIER : l'affichage ajouté à l'étape 9 reçoit aussi une pomme null.
    // S'il ne reste aucune case libre, terminer la partie avec une victoire.
  }

  /**
   * Étape 4 — Arrêter les prochains appels automatiques de playTurn.
   * Aucun paramètre : utiliser l'identifiant conservé dans timer.
   * @returns Rien. Le minuteur est arrêté et timer redevient undefined.
   */
  function stop(): void {
    // DÉJÀ FOURNI : la déclaration et la variable timer. Aucun arrêt n'est encore programmé.
    // À compléter : si un minuteur existe, l'annuler puis effacer son identifiant.
    // Cette fonction doit aussi pouvoir être appelée plusieurs fois sans erreur.
  }

  //#endregion

  //#region Étape 5 — Clavier

  /**
   * Garder la dernière direction autorisée pour le prochain tour.
   * @param nextDirection Direction demandée par la flèche du clavier.
   * @returns Rien. Remplace direction si la demande est autorisée, sinon conserve le choix.
   */
  function changeDirection(nextDirection: Direction): void {
    // DÉJÀ FOURNI : nextDirection est reçu du clavier. Pas d'écouteur à créer.
    // À compléter : ignorer les demandes après la fin de partie.
    // Vérifier la demande avec CanTurn, puis mettre à jour direction si elle convient.
    // La direction actuelle reste autorisée : elle permet d'annuler un virage.
    // Ne pas déplacer ici et ne pas créer de liste d'inputs en attente.
  }

  //#endregion

  //#region Étape 6 — Murs et fin de partie

  /**
   * Vérifier si une position est en dehors du plateau, sans modifier le jeu.
   * @param position Case à vérifier, généralement la prochaine position de la tête.
   * @returns true si x ou y sort du plateau, false si la case est dans le plateau.
   */
  function hitsWall(position: Position): boolean {
    // DÉJÀ FOURNI : le paramètre position et la taille snake.gridSize.
    // À compléter : comparer x et y aux limites de snake.gridSize.
    // La première coordonnée valide est 0 et la dernière vaut gridSize - 1.
    return false; // PROVISOIRE : remplacer par le résultat de tes vérifications.
  }

  /**
   * Terminer la partie et demander l'affichage du résultat.
   * @param won true pour une victoire, false pour une défaite.
   * @returns Rien. Marque la fin de partie, arrête les tours et affiche le résultat.
   */
  function gameOver(won: boolean): void {
    // DÉJÀ FOURNI : le paramètre won et l'affichage Snake.GameOver.
    // stop aura été complétée à l'étape 4 ; appelle-la, sans réécrire son contenu ici.
    // À compléter : mettre à jour isGameOver, arrêter le minuteur avec stop,
    // puis demander à snake d'afficher la victoire ou la défaite.
    // Le bouton Recommencer est déjà fourni par l'interface.
  }

  //#endregion

  //#region Étape 7 — Pomme

  /**
   * Chercher une case libre pour la pomme sans déplacer le serpent.
   * Aucun paramètre : lire snake.gridSize et snake.segments.
   * @returns Une Position libre choisie au hasard, ou null si le plateau est plein.
   */
  function placeApple(): Position | null {
    // DÉJÀ FOURNI : la déclaration et l'accès aux segments. Aucune recherche n'est écrite.
    // À compléter : préparer un tableau freePositions.
    // Visiter les lignes et les colonnes, puis vérifier les segments pour chaque case.
    // Ajouter uniquement les cases libres et choisir l'une d'elles au hasard.
    // Cette fonction choisit une position : son affichage se fait ailleurs.
    return null; // PROVISOIRE : remplacer par une case libre ou null si aucune n'existe.
  }

  //#endregion

  //#region Étape 10 — Corps du serpent

  /**
   * Vérifier si la prochaine tête rencontre un segment qui restera sur le plateau.
   * @param position Prochaine position de la tête, avant le déplacement.
   * @param willGrow true si le serpent va manger une pomme pendant ce tour.
   * @returns true si la case restera occupée par le serpent, false sinon.
   */
  function hitsBody(position: Position, willGrow: boolean): boolean {
    // DÉJÀ FOURNI : les deux paramètres. La détection reste à programmer.
    // À compléter : choisir l'indice de départ selon willGrow, puis parcourir les segments.
    // Sans croissance, ignorer la queue à l'indice 0 : elle quitte sa case.
    // Avec croissance, vérifier aussi la queue : elle reste sur place.
    // Comparer les deux coordonnées pour reconnaître une même case.
    return false; // PROVISOIRE : remplacer par le résultat de la recherche.
  }

  //#endregion

  //#region Étapes 4, 8 et 11 — Démarrage de la partie

  // DÉJÀ FOURNI : l'emplacement du démarrage, les variables et le return final.
  // Aucun appel d'affichage ni aucun minuteur n'est encore écrit dans cette région.

  // Étape 4 : après avoir complété stop, créer ici le minuteur qui appelle playTurn.
  // Utiliser le délai stepDuration et conserver l'identifiant dans timer.
  // Un seul minuteur par partie suffit.

  // Étape 8 : compléter la région en gardant le minuteur déjà écrit à l'étape 4.
  // Ajouter AVANT ce minuteur le choix de la première pomme,
  // la mémorisation de sa position et l'affichage du score et de la pomme.

  // Étape 11 : si aucune case libre n'existe, afficher immédiatement la victoire.
  // Adapter le démarrage pour lancer le minuteur uniquement dans les autres cas.

  //#endregion

  // Ce lien avec GamePage est déjà fourni : conserve-le à la fin de gameLoop.
  return { changeDirection, stop };
}

//#endregion

