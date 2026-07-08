# pazimor.github.io

Portfolio personnel — **React + Vite + Tailwind + shadcn/ui** (thème sombre, accent bleu).
Design importé depuis Claude Design (« Portfolio GitHub »).

## Développer en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
npm run preview  # sert le build de prod localement
```

## Ce qui est éditable (sans toucher au code)

Tout le contenu vit dans `public/data/` et est chargé au runtime :

- **`public/data/config.json`** — identité de la sidebar (nom, bio, localisation,
  disponibilité, focus, email), liens (GitHub, LinkedIn, CV) et sélection des dépôts
  (`includeForks`, `includeArchived`, `exclude`, `sort`, `limit`).
- **`public/data/experiences.json`** — la liste des expériences pro (rôle, entreprise,
  période, points clés, technos). Édite ce fichier pour l'onglet « Expérience pro ».
- **`public/data/projects.json`** — surcharge des cartes projets. La **clé = le nom exact
  du dépôt GitHub** ; tous les champs (`tagline`, `description`, `bullets`, `tech`,
  `hidden`) sont optionnels et remplacent la valeur auto de GitHub. C'est ici que tu écris
  les bullet points d'un projet. Un dépôt sans entrée reste affiché avec ses données
  GitHub brutes.

## Cartes projets (automatiques)

Les projets sont récupérés côté client depuis l'API publique GitHub
(`api.github.com/users/<githubUser>/repos`) : nom, description, langage, topics (badges),
étoiles. Aucun token n'est utilisé (site statique public).

- Limite anonyme : 60 requêtes/h par IP visiteur → la réponse est **mise en cache 1h**
  dans le `localStorage`, avec repli sur le cache si la limite est atteinte.
- Les *pinned repos* ne sont pas accessibles sans token : on trie donc tous les dépôts
  publics (par étoiles ou date) et on masque forks/archivés selon `config.json`.
- Pour mettre un dépôt en avant : ajoute-lui une **description** et des **topics** sur
  GitHub — ils deviennent le résumé et les badges de la carte.

## CV téléchargeable

1. Dépose ton PDF dans **`public/`**, par ex. `public/cv.pdf` (tout ce qui est dans
   `public/` est copié tel quel à la racine du site).
2. Dans `public/data/config.json`, mets `"cvUrl": "cv.pdf"` → il sera servi sur
   `https://pazimor.github.io/cv.pdf` et le bouton « Télécharger le CV » l'ouvrira.
3. Tant que `cvUrl` est vide, le bouton affiche « CV bientôt disponible » (pas de lien mort).

## Déploiement (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` build le site et le publie via GitHub Actions
à chaque push sur `master`.

> ⚠️ Une seule action manuelle requise : dans **Settings → Pages → Build and deployment**,
> régler **Source** sur **GitHub Actions** (au lieu de « Deploy from a branch »).
