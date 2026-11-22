/*
PROGRAMME TON SNAKE

Les propriétés et les méthodes disponibles sont décrites dans README.md,
dans ce même dossier. Tu trouveras ici les étapes pour écrire ton programme.

Écris ton code en dehors des blocs de commentaires.
Place les imports tout en haut du fichier.
Crée une seule fonction gameLoop à l’étape 1.
Les variables et les petites fonctions des étapes suivantes se placent
à l’intérieur de gameLoop, avant son return final.
Garde l’accolade qui ferme gameLoop après ce return.

Un commentaire explique ce que tu dois faire. Il ne fait pas avancer le jeu.
Le projet pourra se lancer après avoir écrit le point de départ de l’étape 1.
*/

/*

//#region Étape 1 - Game Loop

Étape 1 — Préparer la fonction principale

Ton objectif est de permettre à la page d'appeler ton programme.

Écris ce point de départ dans main.ts.

import type { Direction, Position, SnakeGame } from '../types';

export function gameLoop(snake: SnakeGame) {
function changeDirection(nextDirection: Direction): void {
}

function stop(): void {
}

return { changeDirection, stop };
}

Les imports donnent accès aux types. export permet à GamePage de trouver gameLoop. Le paramètre snake reçoit le serpent déjà créé.

GamePage récupère les deux fonctions renvoyées. Il appelle changeDirection quand tu appuies sur une flèche et stop quand il faut nettoyer une ancienne partie.

Tu ajouteras les autres fonctions à l'intérieur de gameLoop, avant son return final.

Ton test — Lance le projet avec npm run dev, puis clique sur « Commencer ». Le serpent doit être dessiné. À cette étape, il attend encore les instructions de déplacement.
*/

//#endregion

//#region Étape 2 - Mémoire

/*
Étape 2 — Préparer la mémoire de la partie

Ton objectif est de garder les informations utiles d'un tour à l'autre.

Déclare ces variables au début de gameLoop, avant les petites fonctions.

direction, de type Direction
Commence avec snake.direction. Choisit le déplacement du tour.

score, de type number
Commence avec 0. Compte les pommes mangées.

isGameOver, de type boolean
Commence avec false. Devient true quand la partie est terminée.

timer, de type ReturnType<typeof setInterval> | undefined
Commence avec undefined. Garde l’identifiant du minuteur.

applePosition, de type Position | null
Commence avec null. Tu choisiras la première pomme à l’étape 7.

stepDuration, de type number
Commence avec 400. C’est le délai entre deux tours, en millisecondes.

Utilise let pour une variable dont tu vas remplacer la valeur. Utilise const pour le délai, qui reste le même pendant la partie.

Le type un peu long de timer signifie « un identifiant de minuteur, ou aucune valeur pour le moment ».

Ton test — Demande à la console d'afficher score, direction et snake.segments.length. Au départ, tu dois lire 0, 'right' et 3.
*/

//#endregion

//#region Etape 3 - Se déplacer

/*
Étape 3 — Demander un déplacement

Ton objectif est de choisir une méthode de déplacement avec une condition.

Crée une fonction moveSnake() qui renvoie un boolean.

1. Regarde la valeur de direction.
2. Si elle vaut 'up', appelle snake.MoveUp().
3. Fais la même chose pour les trois autres directions.
4. Renvoie le résultat de la méthode appelée avec return.

Un appel à moveSnake() doit demander un seul déplacement. Tu peux utiliser des if ou un switch.

Ton test — Appelle temporairement moveSnake() une fois dans gameLoop. Si le serpent commence avec sa tête en (5, 4) et avance à droite, elle doit arriver en (6, 4) sur un plateau assez grand. Le serpent doit garder trois morceaux.

Retire cet appel d'essai avant d'ajouter le minuteur.
*/

//#endregion

//#region Etape 4 - Les ticks

/*
Étape 4 — Faire avancer le temps

Ton objectif est de répéter un tour et de pouvoir arrêter cette répétition.

Crée une fonction playTurn() qui appelle pour le moment moveSnake().

Puis démarre un minuteur à la fin de gameLoop, avant son return.

timer = setInterval(playTurn, stepDuration);

setInterval reçoit une fonction à appeler et un délai en millisecondes. Il renvoie un identifiant que tu conserves dans timer.

Complète ensuite stop().

1. Si timer possède une valeur, passe cette valeur à clearInterval.
2. Remets timer à undefined.

Ton test — Le serpent doit avancer d'une case toutes les 400 ms. Pour essayer l'arrêt, tu peux appeler temporairement stop() après quelques déplacements, puis retirer cet essai.
*/

//#endregion

//#region Etape 5 - Les inputs

/*
Étape 5 — Choisir la direction de ce tour

Ton objectif est de garder la dernière direction autorisée avant chaque déplacement.

Imagine que le serpent avance à droite. Tu appuies sur haut, puis sur bas avant le prochain tick. Bas remplace haut : le serpent descend au prochain déplacement. Aucun appui n'est conservé pour les tours suivants.

La variable direction garde le dernier choix autorisé. Chaque nouvel appui autorisé remplace sa valeur.

Dans changeDirection(nextDirection)…

1. Quitte la fonction si isGameOver vaut true.
2. Appelle snake.CanTurn(nextDirection) pour vérifier que la demande évite un demi-tour par rapport au dernier déplacement effectué.
3. Si cette méthode renvoie true, donne la valeur nextDirection à direction. Sinon, garde le choix précédent.
4. Accepte aussi la direction actuelle : elle permet d'annuler un virage choisi avant le déplacement.

Dans playTurn(), utilise direction pour demander un seul déplacement. CanTurn compare toujours avec snake.direction, jamais avec le choix provisoire : plusieurs appuis ne doivent pas permettre un demi-tour entre deux déplacements.

Sans nouvel appui, le serpent continue dans la même direction.

Ton test — En avançant à droite, appuie sur haut puis bas avant un tick. Le serpent doit descendre et continuer dans cette direction sans nouvel appui. Essaie aussi haut puis droite : le serpent doit continuer à droite.

Autre test — En avançant à droite, appuie sur haut puis gauche avant le tick. Gauche est un demi-tour par rapport au déplacement actuel : cet appui est refusé, et haut reste sélectionné.
*/

//#endregion

//#region Étape 6 - Collisions

/*
Étape 6 — Détecter les murs et arrêter la partie

Ton objectif est de vérifier la prochaine case avant d'avancer.

Crée hitsWall(position: Position): boolean.

La fonction doit répondre à quatre questions.

- Est-ce que x est plus petit que 0 ?
- Est-ce que x est supérieur ou égal à snake.gridSize ?
- Est-ce que y est plus petit que 0 ?
- Est-ce que y est supérieur ou égal à snake.gridSize ?

Si au moins une réponse est vraie, la position est hors du plateau. L'opérateur || permet de dire « ou ».

Crée aussi gameOver(won: boolean).

1. Donne la valeur true à isGameOver.
2. Appelle stop() pour arrêter les tours.
3. Appelle snake.GameOver(won) pour afficher le résultat et le bouton « Recommencer ».

Complète playTurn().

1. Quitte immédiatement si la partie est déjà terminée.
2. Utilise direction, qui contient le choix pour ce tick.
3. Appelle snake.GetNextPosition(direction) et conserve le résultat dans nextPosition.
4. Si hitsWall(nextPosition) est vrai, appelle gameOver(false) puis quitte le tour avec return.
5. Sinon, demande le déplacement. Si moveSnake() renvoie false, termine aussi la partie.

Ton test sur papier — Pour un plateau de 9 cases, x = 8 est encore valide et x = 9 est hors du plateau. Vérifie aussi x = -1, y = -1 et y = 9.

Ton test dans le jeu — Va contre un bord. La tête doit rester dans sa dernière case valide et « Partie terminée » doit apparaître.
*/

//#endregion

//#region Etape 7 - La pomme

/*
Étape 7 — Trouver une place pour la pomme

Ton objectif est de combiner des boucles et un tableau pour choisir une case libre.

Crée placeApple(): Position | null.

1. Prépare un tableau vide freePositions de type Position[].
2. Avec une première boucle, visite chaque ligne y, de 0 à snake.gridSize - 1.
3. Dans cette boucle, utilise une deuxième boucle pour visiter chaque colonne x.
4. Pour chaque case, prépare un booléen isOccupied avec la valeur false.
5. Parcours les segments du serpent avec une troisième boucle.
6. Compare les deux coordonnées. Une case est occupée si son x et son y sont les mêmes que ceux d'un segment.
7. Quand tu trouves un segment sur cette case, mets isOccupied à true. Tu peux quitter la boucle des segments avec break.
8. Si la case est libre, ajoute { x, y } à freePositions avec push().
9. Après avoir visité tout le plateau, renvoie null si le tableau est vide.
10. Sinon, tire un indice au hasard et renvoie la position située à cet indice.

Pour tirer un indice au hasard, utilise cette expression.

Math.floor(Math.random() * freePositions.length)

Math.random() donne un nombre entre 0 inclus et 1 exclu. Math.floor() arrondit vers le bas. Avec cinq cases libres, l'indice obtenu sera donc 0, 1, 2, 3 ou 4.

Ton test — Sur un plateau de 9 × 9 contenant trois segments, le tableau doit contenir 78 cases libres. Tu peux afficher temporairement sa longueur dans la console avant de choisir une case.
*/

//#endregion

//#region Etape 8 - Affichages 

/*
Étape 8 — Afficher la première pomme et le score

Ton objectif est de préparer l'écran avant de démarrer le minuteur.

À la fin de gameLoop, avant setInterval…

1. Donne à applePosition le résultat de placeApple().
2. Appelle snake.ShowScore(score).
3. Appelle snake.ShowApple(applePosition).
4. Démarre ensuite le minuteur.

Ton test — Une pomme doit apparaître sur une case libre et le score doit afficher 0. Pendant que le serpent avance, la pomme doit garder sa place.
*/

//#endregion

//#region Etape 9 - Grandir

/*
Étape 9 — Manger une pomme et grandir

Ton objectif est de comparer deux positions puis de mettre à jour le score.

Dans playTurn(), après la vérification des murs, prépare un booléen willGrow.

Il est vrai lorsque la pomme existe et que les deux coordonnées de nextPosition sont égales à celles de applePosition. Utilise === pour comparer les valeurs et && pour demander que plusieurs conditions soient vraies ensemble.

Pour un tour où le serpent mange…

1. Appelle snake.Grow() avant le déplacement. Cela prépare la conservation de la queue.
2. Appelle moveSnake() une seule fois, comme pour un déplacement ordinaire.
3. Si le mouvement échoue, termine le tour avec une défaite.
4. Après un repas réussi, ajoute 1 à score et affiche-le.
5. Appelle placeApple() pour choisir une nouvelle position.
6. Mets à jour applePosition, puis affiche cette pomme.

Choisis la nouvelle pomme après le déplacement pour prendre en compte la nouvelle tête et la croissance du serpent.

Ton test — Quand un serpent de trois morceaux mange sa première pomme, il passe à quatre morceaux et son score passe à 1. Au déplacement suivant sans pomme, il garde quatre morceaux.
*/

//#endregion

//#region Etape 10 - Collisions 2

/*
Étape 10 — Vérifier si le serpent touche son corps

Ton objectif est de parcourir les positions et de quitter une boucle dès qu'une collision est trouvée.

Crée hitsBody(position: Position, willGrow: boolean): boolean.

La première information est la prochaine position de la tête. La seconde indique si le serpent va grandir pendant ce tour.

1. Choisis le premier indice à vérifier.
2. Si le serpent grandit, commence à l'indice 0, car la queue garde sa case.
3. Sinon, commence à l'indice 1, car la queue quitte sa case pendant ce déplacement.
4. Parcours les segments jusqu'au dernier indice.
5. Si les deux coordonnées d'un segment correspondent à la position donnée, renvoie true.
6. Si tu arrives à la fin sans trouver de correspondance, renvoie false.

Dans playTurn(), appelle hitsBody(nextPosition, willGrow) après avoir calculé willGrow, mais avant de demander la croissance et le déplacement.

Si la fonction renvoie true, appelle gameOver(false) puis quitte le tour.

Ton test — Faire arriver la tête sur un morceau du corps termine la partie.

Le petit cas à comprendre — Imagine une queue en (1, 1), puis les morceaux (1, 2), (2, 2) et la tête en (2, 1). Aller à gauche mène à la case de la queue. Sans croissance, ce déplacement est autorisé puisque la queue quitte cette case au même moment.
*/

//#endregion

//#region Etape 11 - Game Over

/*
Étape 11 — Gagner quand le plateau est rempli

Ton objectif est de reconnaître qu'il ne reste plus de place pour une pomme.

Tu as déjà prévu que placeApple() renvoie null quand toutes les cases sont occupées.

Après avoir mangé et cherché la pomme suivante…

1. Affiche le résultat avec snake.ShowApple(applePosition). Si la valeur est null, l'ancienne pomme est retirée.
2. Si applePosition vaut null, appelle gameOver(true).

Au démarrage de la partie, après le premier appel à placeApple(), vérifie aussi ce cas. Si le plateau est déjà rempli, affiche la victoire. Sinon, démarre le minuteur.

Ton test — Un plateau de 9 × 9 contient 81 cases. Avec trois morceaux au départ et un morceau ajouté par pomme, il faut manger 78 pommes pour le remplir.
*/

//#endregion

//#region Etape 12 - Tests

/*
Étape 12 — Relire un tour complet

Voici l'ordre final des actions dans playTurn().

1. Vérifier que la partie est encore en cours.
2. Utiliser la direction choisie pour ce tick.
3. Prévoir la prochaine position de la tête.
4. Vérifier les murs et terminer le tour en cas de collision.
5. Déterminer si la prochaine case contient une pomme.
6. Vérifier le corps en tenant compte de la croissance.
7. Demander la croissance si une pomme va être mangée.
8. Demander un seul déplacement.
9. Terminer la partie si le déplacement échoue.
10. Après un repas réussi, actualiser le score et choisir une nouvelle pomme.
11. Vérifier si le plateau est rempli.

Un return dans une fonction quitte seulement cette fonction. C'est stop() qui arrête les prochains appels du minuteur.
*/

/*
Essaie ton jeu

Quand tu as terminé, teste chaque situation.

- Le serpent avance tout seul et garde la même longueur sans manger.
- Chaque flèche permet de choisir une direction autorisée.
- Un demi-tour immédiat est ignoré.
- Le dernier appui autorisé est appliqué au tick qui arrive. Il remplace le choix précédent sans mémoriser de déplacements pour plus tard.
- Appuyer dans la direction actuelle annule un virage choisi avant le déplacement.
- Les quatre bords du plateau déclenchent une défaite.
- Une pomme apparaît toujours sur une case libre.
- Chaque pomme mangée ajoute un morceau et un point.
- La tête qui touche le corps déclenche une défaite.
- La tête peut rejoindre la case quittée par la queue pendant un déplacement sans croissance.
- Un plateau rempli déclenche la victoire.
- Après une victoire ou une défaite, les déplacements s'arrêtent.
- « Recommencer » remet le score à zéro et crée un serpent de trois morceaux.
- Un nouveau changement de direction peut être choisi au redémarrage.
- Plusieurs redémarrages conservent la même vitesse, avec un seul minuteur actif.

Pour terminer, lance npm run build depuis la racine du projet. Cette commande vérifie les types et prépare la version de production.
*/

//#region CODE ICI

import type { Direction, Position, SnakeGame } from '../types';

export function gameLoop(snake: SnakeGame) {
  
  // Etape 2 - Mémoire
  
  let direction: Direction = snake.direction;
  let score: number = 0;
  let isGameOver: boolean = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  let applePosition: Position | null = null;
  
  const stepDuration: number = 300;
  
  // Etape 3 - Se déplacer
  
  function moveSnake(): boolean {
    switch (direction) {
      case 'up':
      return snake.MoveUp();
      case 'down':
      return snake.MoveDown();
      case 'left':
      return snake.MoveLeft();
      case 'right':
      return snake.MoveRight();
    }
  }
  
  // Etape 4 - Les ticks
  
  function playTurn(): void {
    if (isGameOver) return;
    let nextPosition = snake.GetNextPosition(direction);
    if (hitsWall(nextPosition)) {
      gameOver(false);
      return;
    }
    let willGrow:boolean = applePosition !== null && nextPosition.x === applePosition.x && nextPosition.y === applePosition.y;
    if(hitsBody(nextPosition, willGrow)) {
      gameOver(false);
      return;
    }
    if (willGrow) {
      snake.Grow();
    }
    
    moveSnake();
    
    if (willGrow) {
      score++;
      snake.ShowScore(score);
      
      applePosition = placeApple();
      snake.ShowApple(applePosition);
      
      if (applePosition === null) {
        gameOver(true);
        return;
      }
    }
  }
  
  // Etape 5 - Les inputs
  
  function changeDirection(nextDirection: Direction): void {
    if (isGameOver) return;
    
    if (snake.CanTurn(nextDirection)) {
      direction = nextDirection;
    }
  }
  
  function placeApple(): Position | null {
    const freePositions: Position[] = [];
    
    for (let y = 0; y < snake.gridSize; y++) {
      for (let x = 0; x < snake.gridSize; x++) {
        let isOccupied = false;
        
        for (let index = 0; index < snake.segments.length; index++) {
          const segment = snake.segments[index];
          if (segment.x === x && segment.y === y) {
            isOccupied = true;
            break;
          }
        }
        
        if (!isOccupied) freePositions.push({ x, y });
      }
    }
    
    if (freePositions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * freePositions.length);
    return freePositions[randomIndex];
    
  }
  
  function hitsWall(position: Position): boolean {
    if(position.x < 0 || position.x >= snake.gridSize || position.y < 0 || position.y >= snake.gridSize) {
      return true;
    }
    return false;
  }
  
  function hitsBody(position: Position, willGrow: boolean): boolean {
    let firstIndex = willGrow ? 0 : 1;
    for (let index = firstIndex; index < snake.segments.length; index++) {
      const segment = snake.segments[index];
      if (segment.x === position.x && segment.y === position.y) {
        return true;
      }
    }
    return false;
  }
  
  function gameOver(won: boolean): void {
    isGameOver = true;
    stop();
    snake.GameOver(won);
  }
  
  function stop(): void {
    if(timer){
      clearInterval(timer);
      timer = undefined;
    }
  }
  
  applePosition = placeApple();
  snake.ShowScore(score);
  snake.ShowApple(applePosition);
  
  if (applePosition === null) {
    gameOver(true);
  } else {
    timer = setInterval(playTurn, stepDuration);
  }
  
  return { changeDirection, stop };
}

