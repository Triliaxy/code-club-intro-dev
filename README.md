<img src="assets/icon.svg" width="64" height="64" alt="">

# Code-club_intro-dev

Atelier d’initiation à la programmation en TypeScript avec un jeu de Snake. L’exercice permet de découvrir les types, les conditions, les boucles, les tableaux et les fonctions.

L’interface utilise React et Vite. Le projet fournit le plateau, le dessin du serpent et les méthodes de déplacement. Les règles du jeu se programment dans [Snake/algorithm/main.ts](Snake/algorithm/main.ts).

Projet créé avec [T3 Code](https://t3.codes).

## Lancer le projet

Installe une version compatible de Node.js : `^20.19.0` ou `>=22.12.0`, comme indiqué dans `package.json`. npm est fourni avec Node.js.

Ouvre le dossier contenant `package.json` dans Visual Studio Code, puis ouvre un terminal à la racine du projet. Sous Windows, tu peux choisir le profil **Invite de commandes / Command Prompt**.

Installe les dépendances, puis lance le serveur de développement :

```sh
npm install
npm run dev
```

Ouvre l’adresse affichée par Vite dans le navigateur et garde le terminal ouvert pendant que tu travailles.

| Commande | Rôle |
| --- | --- |
| `npm install` | Installe les dépendances du projet. |
| `npm run dev` | Lance le serveur de développement. |
| `npm run build` | Vérifie les types et génère le site dans `Snake/dist`. |
| `npm run preview` | Permet de consulter localement le site généré, après un build. |

## Supports de l’atelier

- [Diaporama de l’atelier](Programmer-un-Snake-en-JavaScript.pptx) : installation guidée, bases de TypeScript et explication visuelle des 12 étapes. Le fichier conserve son nom d’origine, mais son contenu concerne TypeScript.
- [Référence des propriétés et méthodes](Snake/algorithm/README.md) : documentation des outils disponibles pour écrire l’algorithme.
- [Étapes de réalisation](Snake/algorithm/main.ts) : consignes détaillées dans les commentaires du fichier.

Pour les élèves, prépare une version de départ de `main.ts` à compléter et retire le corrigé `backup.main.ts` de la copie distribuée. La version de travail actuelle contient l’algorithme terminé.

## Classes CSS du serpent

Les formes du serpent sont définies dans [snake.css](Snake/DOM_manipulation/snake.css). Le plateau, la classe `cell`, la pomme et les légendes sont définis dans [style.css](Snake/style.css). Les deux feuilles sont importées dans `Snake/main.tsx`. Chaque morceau du serpent occupe une case carrée du composant `BoardGrid`. Ajoute toujours les classes `cell snake-segment`, puis le type de morceau et une seule orientation.

```tsx
<span
  className="cell snake-segment head direction-right"
  style={{ gridColumnStart: 3, gridRowStart: 2 }}
/>
```

Les coordonnées CSS Grid commencent à **1** : pour placer un morceau aux coordonnées du jeu `(x, y)`, utilise `gridColumnStart: x + 1` et `gridRowStart: y + 1`. L'axe `x` augmente vers la droite, l'axe `y` vers le bas.

### Découpage des classes

Les espaces dans `cell snake-segment head direction-right` séparent quatre classes appliquées au même élément. Chaque classe apporte une partie du rendu.

| Classe | Rôle |
| --- | --- |
| `cell` | Centre l'élément dans sa case. Les coordonnées sont données par `gridColumnStart` et `gridRowStart`. |
| `snake-segment` | Donne au morceau la taille d'une case et dessine la bande verte de base. |
| `head` | Donne la couleur et la forme de la tête, puis ajoute les yeux. |
| `direction-right` | Oriente la tête vers la droite. |

Tu peux construire cette combinaison progressivement dans `SnakeRenderer`.

```ts
const element = document.createElement('span');

// Common classes for every snake segment.
element.classList.add('cell', 'snake-segment');

// Choose the body part, then its orientation.
element.classList.add('head');
element.classList.add('direction-right');
```

Le choix des classes se fait avec ces combinaisons.

| Classes communes | Partie du serpent | Orientation à choisir | Courbure facultative |
| --- | --- | --- | --- |
| `cell` et `snake-segment` | `head` | `direction-right`, `direction-down`, `direction-left` ou `direction-up` | Tête droite, orientée selon le déplacement. |
| `cell` et `snake-segment` | `tail` | `direction-right`, `direction-down`, `direction-left` ou `direction-up` | `bend-from-top` ou `bend-from-bottom` |
| `cell` et `snake-segment` | `body` | `horizontal`, `vertical`, `turn-up-right`, `turn-down-right`, `turn-down-left` ou `turn-up-left` | La classe `turn-*` définit déjà le virage. |

Choisis une seule partie du serpent et une seule orientation par élément. Pour une queue courbée, ajoute une seule des classes `bend-from-*` selon le raccord souhaité.

```ts
// A body segment connecting the left and top sides of its cell.
const body = document.createElement('span');
body.classList.add('cell', 'snake-segment');
body.classList.add('body');
body.classList.add('turn-up-left');
```

`classList.add()` ajoute les classes en conservant celles déjà présentes. Pour changer une orientation, remplace la précédente.

```ts
// The element already has direction-right from the first example.
element.classList.replace('direction-right', 'direction-up');
```

Pour remplacer toutes les classes d'un élément, utilise `element.className = 'cell snake-segment head direction-up';`. Avec `classList.add()`, passe chaque classe comme un argument distinct, comme dans les exemples ci-dessus.

### Tête

La tête reste droite et sa direction correspond au côté vers lequel elle regarde et avance. Les yeux pivotent avec la tête.

| Direction | Classes complètes |
| --- | --- |
| Droite → | `cell snake-segment head direction-right` |
| Bas ↓ | `cell snake-segment head direction-down` |
| Gauche ← | `cell snake-segment head direction-left` |
| Haut ↑ | `cell snake-segment head direction-up` |

### Corps droit

Choisis l'orientation selon les deux cases voisines du morceau dans le serpent.

| Côtés reliés | Classes complètes |
| --- | --- |
| Gauche ↔ droite | `cell snake-segment body horizontal` |
| Haut ↕ bas | `cell snake-segment body vertical` |

### Corps dans un virage

Les noms désignent les **deux côtés de la case reliés aux morceaux voisins**, quel que soit le sens de déplacement. Un virage reliant le haut à la droite utilise donc `turn-up-right` dans les deux sens.

| Angle | Côtés reliés | Position des voisins par rapport au morceau `(x, y)` | Classes complètes |
| --- | --- | --- | --- |
| `└` | Haut et droite | `(x, y - 1)` et `(x + 1, y)` | `cell snake-segment body turn-up-right` |
| `┌` | Bas et droite | `(x, y + 1)` et `(x + 1, y)` | `cell snake-segment body turn-down-right` |
| `┐` | Bas et gauche | `(x, y + 1)` et `(x - 1, y)` | `cell snake-segment body turn-down-left` |
| `┘` | Haut et gauche | `(x, y - 1)` et `(x - 1, y)` | `cell snake-segment body turn-up-left` |

Ces quatre formes couvrent les huit changements de direction à angle droit : chaque forme peut être parcourue dans deux sens. Un demi-tour immédiat n'a pas de forme dédiée : dans les règles habituelles de Snake, il est interdit.

### Queue

Pour la queue, la direction désigne le **côté relié au morceau suivant, en allant vers la tête**. La pointe est du côté opposé. Déduis cette orientation de son voisin : elle peut différer de la direction actuelle de la tête lorsque le serpent tourne.

| Position du voisin vers la tête | Position de la pointe | Classes complètes |
| --- | --- | --- |
| À droite → | À gauche | `cell snake-segment tail direction-right` |
| En bas ↓ | En haut | `cell snake-segment tail direction-down` |
| À gauche ← | À droite | `cell snake-segment tail direction-left` |
| En haut ↑ | En bas | `cell snake-segment tail direction-up` |

### Queue courbée

Les classes `bend-from-top` et `bend-from-bottom` ajoutent une courbure à la queue. Leur forme est calculée avant la rotation donnée par `direction-*`. Dans la forme de base orientée vers la droite, elles raccordent respectivement le haut et le bas de la case à sa droite.

Par exemple, cette queue utilise une courbure de haut vers droite.

```html
<span class="cell snake-segment tail direction-right bend-from-top"></span>
```

### Exemple : un serpent qui tourne vers le haut

Dans cet exemple, la queue est en `(1, 3)`, le virage en `(2, 3)` et la tête en `(2, 2)`.

```tsx
<BoardGrid size={5} description="Serpent tournant vers le haut.">
  <span
    className="cell snake-segment tail direction-right"
    style={{ gridColumnStart: 2, gridRowStart: 4 }}
  />
  <span
    className="cell snake-segment body turn-up-left"
    style={{ gridColumnStart: 3, gridRowStart: 4 }}
  />
  <span
    className="cell snake-segment head direction-up"
    style={{ gridColumnStart: 3, gridRowStart: 3 }}
  />
</BoardGrid>
```

`BoardGrid` s'importe avec `import { BoardGrid } from './BoardGrid';` depuis un composant situé dans `Snake/`.

### Autres classes utiles

| Élément | Classes |
| --- | --- |
| Pomme | `cell apple` |
| Pastille de légende du serpent | `snake-swatch` |
| Pastille de légende de la pomme | `apple-swatch` |

Sans orientation explicite, `head` et `tail` sont orientées vers la droite et `body` est horizontal. L'aperçu dans `Snake/HomePage.tsx` utilise les orientations explicites.

### Couche et animations

| Classe | Effet |
| --- | --- |
| `snake-layer` | Utilise `display: contents` pour placer les segments enfants directement sur la grille du plateau. |
| `snake-sliding` | Anime le glissement entre deux positions et la rotation pendant un déplacement. |
| `snake-shape-in` | Ajoute un fondu d'apparition de la nouvelle forme pendant le glissement. |
| `snake-shape-out` | Ajoute un fondu de disparition de l'ancienne forme pendant le glissement. |

Les animations utilisent les variables CSS `--snake-slide-x`, `--snake-slide-y` et `--snake-slide-angle` pour la position et la rotation de départ. `--snake-step-duration` règle la durée, avec une valeur par défaut de `500ms`. Les classes d'animation sont disponibles dans `snake.css` et leur utilisation est actuellement désactivée dans le rendu du jeu.

Le CSS dessine les morceaux à partir des classes choisies et des coordonnées CSS Grid fournies pour chaque segment.
