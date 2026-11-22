# Référence pour programmer le Snake

Les étapes de l’exercice sont écrites en commentaires dans [main.ts](main.ts). Cette page décrit les informations et les outils que tu peux utiliser pendant que tu écris ton programme.

Le fichier contient déjà un squelette : les variables sont initialisées et les fonctions sont placées dans `gameLoop`. Complète leur contenu à l’endroit des commentaires « À compléter ». Les commentaires JSDoc expliquent les paramètres et les retours attendus.

Les retours marqués `PROVISOIRE` permettent seulement au projet de compiler. Remplace-les par les résultats de ton algorithme. Au départ, le serpent est visible mais ne bouge pas, et aucun minuteur ne démarre.

`GamePage` crée le serpent, puis appelle ta fonction `gameLoop(snake)`. Le clavier lui transmet ensuite les directions en appelant la fonction `changeDirection` que tu renverras. Les méthodes de `snake` prennent en charge le déplacement des segments et leur affichage.

## Types utiles

Ces types s’importent depuis [types.ts](../types.ts).

| Type | Description | Exemple |
| --- | --- | --- |
| `Direction` | Une direction parmi `'up'`, `'down'`, `'left'`, `'right'`. | `'up'` signifie haut. |
| `Position` | Un objet avec deux coordonnées numériques, `x` et `y`. | `{ x: 2, y: 3 }` |
| `SnakeGame` | Le contrat qui décrit les propriétés et les méthodes du serpent reçu par `gameLoop`. | `snake: SnakeGame` |
| `boolean` | Une réponse vraie ou fausse. | `true`, `false` |
| `void` | Le type de retour d’une fonction qui ne renvoie aucune valeur. | `stop(): void` |
| `null` | Une absence volontaire de valeur. | Aucune place disponible pour la pomme. |
| `undefined` | Une valeur encore absente. | Un minuteur arrêté. |

## Propriétés et coordonnées disponibles

| Expression | Type | Description |
| --- | --- | --- |
| `snake.gridSize` | `number` | Nombre de cases sur chaque côté du plateau. Les coordonnées valides vont de `0` à `snake.gridSize - 1`. |
| `snake.direction` | `Direction` | Direction du dernier déplacement réussi. Elle peut différer du choix fait pour le tick qui arrive. |
| `snake.segments` | Tableau de `Position` | Positions des morceaux dans l’ordre, de la queue à la tête. Les méthodes de déplacement actualisent ce tableau. |
| `snake.segments.length` | `number` | Nombre de morceaux du serpent. |
| `snake.segments[0]` | `Position` | Position de la queue quand le tableau contient des segments. |
| `snake.segments[snake.segments.length - 1]` | `Position` | Position de la tête quand le tableau contient des segments. |
| `position.x` | `number` | Colonne de la position. Augmente vers la droite. |
| `position.y` | `number` | Ligne de la position. Augmente vers le bas. |

Par exemple, aller vers le haut depuis `{ x: 2, y: 3 }` donne `{ x: 2, y: 2 }`. Deux positions correspondent quand leurs deux coordonnées sont égales.

## Méthodes disponibles sur snake

Ces méthodes sont déjà écrites dans [Snake.ts](../DOM_manipulation/Snake.ts).

| Appel | Paramètre | Retour et effet |
| --- | --- | --- |
| `snake.GetNextPosition(direction)` | Une `Direction`. | Renvoie une nouvelle `Position` pour la prochaine tête, même si elle sort du plateau. Conserve la position actuelle du serpent. |
| `snake.CanTurn(direction)` | Une `Direction`. | Renvoie `false` pour un demi-tour et `true` pour un virage ou la direction actuelle. Compare avec le dernier déplacement réussi. |
| `snake.MoveUp()` | Aucun. | Avance d’une case vers le haut et renvoie un `boolean`. |
| `snake.MoveDown()` | Aucun. | Avance d’une case vers le bas et renvoie un `boolean`. |
| `snake.MoveLeft()` | Aucun. | Avance d’une case vers la gauche et renvoie un `boolean`. |
| `snake.MoveRight()` | Aucun. | Avance d’une case vers la droite et renvoie un `boolean`. |
| `snake.Grow()` | Aucun. | Renvoie `void`. Prépare l’ajout d’un morceau au prochain déplacement réussi en conservant la queue. |
| `snake.ShowApple(position)` | Une `Position` ou `null`. | Renvoie `void`. Affiche ou déplace la pomme. Avec `null`, retire la pomme. |
| `snake.ShowScore(score)` | Un `number`. | Renvoie `void`. Affiche le score fourni. |
| `snake.GameOver(won)` | Un `boolean`. | Renvoie `void`. Affiche la victoire avec `true`, la défaite avec `false`, ainsi que le bouton « Recommencer ». |
| `snake.clear()` | Aucun. | Renvoie `void`. Nettoie les éléments affichés. `GamePage` l’appelle déjà quand une partie est quittée ou remplacée. |

Les méthodes `Move...` mettent à jour les coordonnées et le dessin. Elles renvoient `true` après un déplacement réussi, ou `false` si un demi-tour ou un mur bloque le mouvement. Un mouvement bloqué conserve les positions, la direction et la croissance en attente.

`Grow()` doit être appelé avant le déplacement qui mange une pomme. Il prépare la croissance pour ce déplacement. `GameOver()` affiche le résultat, et ta fonction `stop()` arrête le minuteur.

La dernière flèche autorisée fixe le choix pour le tick qui arrive. Chaque appui autorisé remplace le choix précédent, sans file d’attente pour les tours suivants. `CanTurn()` vérifie ce choix par rapport au dernier déplacement effectué. Appuyer dans la direction actuelle permet aussi d’annuler un virage choisi avant le déplacement. Un demi-tour est ignoré et conserve le choix précédent.

## Variables préparées dans main.ts

Ces variables sont déjà déclarées dans `gameLoop`, afin que chaque nouvelle partie ait ses propres valeurs. Tu dois les utiliser et mettre à jour celles qui évoluent.

| Nom | Type | Valeur initiale | Rôle |
| --- | --- | --- | --- |
| `direction` | `Direction` | `snake.direction` | Direction utilisée pour le tour en cours. |
| `score` | `number` | `0` | Nombre de pommes mangées. |
| `isGameOver` | `boolean` | `false` | Indique si la partie est terminée. |
| `timer` | `ReturnType<typeof setInterval> \| undefined` | `undefined` | Identifiant du minuteur à annuler lors de l’arrêt. |
| `applePosition` | `Position \| null` | `null`, puis le résultat de `placeApple()` | Position de la pomme. Après un placement, `null` indique un plateau rempli. |
| `stepDuration` | `number` | `400` | Durée d’un tour en millisecondes. |

Utilise `let` quand tu remplaces la valeur d’une variable et `const` pour une valeur conservée ou un tableau que tu remplis et vides.

Quelques variables temporaires sont aussi utiles dans tes petites fonctions.

| Nom | Rôle |
| --- | --- |
| `nextDirection` | Direction reçue dans `changeDirection`, à vérifier avant de l’utiliser pour ce tick. |
| `nextPosition` | Prochaine position de la tête calculée avant le déplacement. |
| `willGrow` | Booléen indiquant si la prochaine case contient la pomme. |
| `freePositions` | Tableau des cases disponibles pour une pomme. |
| `isOccupied` | Booléen indiquant si une case est occupée par un segment. |
| `randomIndex` | Indice choisi au hasard dans les cases libres. |
| `index` | Indice utilisé pour parcourir les segments. |

## Fonctions à compléter dans main.ts

Les fonctions sont déjà déclarées dans le squelette. Les étapes en commentaires expliquent le traitement à écrire. Voici leurs entrées et leurs sorties.

| Fonction | Paramètres | Retour et rôle |
| --- | --- | --- |
| `gameLoop(snake)` | Le serpent de type `SnakeGame`. | Initialise la partie et renvoie `{ changeDirection, stop }` pour `GamePage`. |
| `changeDirection(nextDirection)` | La `Direction` demandée. | Renvoie `void`. Remplace le choix par la dernière direction autorisée pour ce tick, y compris la direction actuelle. Ignore les demi-tours et les demandes après la fin de partie. |
| `moveSnake()` | Aucun. Lit `direction`. | Renvoie le `boolean` de la méthode `Move...` choisie. Demande un seul déplacement. |
| `playTurn()` | Aucun. | Renvoie `void`. Vérifie la prochaine case, demande le déplacement, puis actualise la pomme et le score si nécessaire. |
| `stop()` | Aucun. | Renvoie `void`. Annule le minuteur et remet son identifiant à `undefined`. Plusieurs appels doivent être possibles. |
| `gameOver(won)` | Un `boolean`. | Renvoie `void`. Marque la partie terminée, appelle `stop()`, puis `snake.GameOver(won)`. |
| `placeApple()` | Aucun. Lit la taille du plateau et les segments. | Renvoie une `Position` libre choisie au hasard, ou `null` si le plateau est rempli. |
| `hitsWall(position)` | La `Position` à vérifier. | Renvoie `true` si elle est hors du plateau, sinon `false`. |
| `hitsBody(position, willGrow)` | Une `Position` et un `boolean`. | Renvoie `true` si la tête atteindrait une case occupée. Commence à l’indice `0` avec croissance, sinon à `1` puisque la queue libère sa case. |

## Outils de JavaScript utiles

| Outil | Utilité |
| --- | --- |
| `setInterval(playTurn, stepDuration)` | Appelle `playTurn` à chaque délai et renvoie l’identifiant du minuteur. À créer une fois par partie, après l’initialisation. |
| `clearInterval(timer)` | Annule le minuteur correspondant à l’identifiant. |
| `array.push(value)` | Ajoute une valeur à la fin du tableau et renvoie sa nouvelle longueur. |
| `array.length` | Donne le nombre de valeurs. |
| `array[index]` | Lit la valeur à un indice. Le premier indice est `0`. |
| `Math.random()` | Donne un nombre compris entre `0` inclus et `1` exclu. |
| `Math.floor(value)` | Arrondit un nombre vers le bas. |
| `Math.floor(Math.random() * array.length)` | Donne un indice valide au hasard lorsque le tableau contient au moins une valeur. |
| `console.log(value)` | Affiche une valeur pour vérifier ce que fait ton programme. |

| Instruction ou opérateur | Utilité |
| --- | --- |
| `if` et `else` | Choisissent des instructions selon une condition. |
| `for` | Répète des instructions, par exemple pour examiner chaque segment. |
| `switch` | Choisit un bloc selon une valeur, par exemple la direction. |
| `===` et `!==` | Vérifient si deux valeurs sont égales ou différentes. |
| `&&` et `\|\|` | Exigent que les conditions soient toutes vraies, ou qu’au moins une soit vraie. |
| `!` | Inverse un booléen. |
| `return` | Termine l’appel de la fonction et renvoie éventuellement une valeur. |
| `break` | Quitte la boucle ou le `switch` qui le contient. |

Le code du clavier est déjà relié par `GamePage`. Pour écrire les règles, utilise les propriétés et les méthodes présentées ici depuis `main.ts`.

