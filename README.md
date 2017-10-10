# EZRun

## En bref

EZRun permet de suivre une course/marche pour évaluer l'effort.

##Description avec des mots
suivi, course, marche, distance, stats

## Principe

Cette application permet de mesurer la distance parcourue lors d'une course ou d'une marche. Les données collectées *(altitude, distance, temps, ...)* sont analysées pour distinguer quel type de parcours vous avez fait aujourd'hui : __facile__, __moyen__, __difficile__.

## Equipe
* Rémy KALOUSTIAN - SI5
* Adrian PALUMBO - SI5

## Développement
* Application développée en Angular 2 avec Ionic.
* API développée avec le framework Lumen pour sa rapidité de mise en place.
    * [API ReadMe](./api/)

##Machine learning
Deux facteurs sont pris en compte : la distance parcourue et le dénivelé.

Le machine learning calculera tout cela, et retournera le durée niveau de difficulté de la course effectuée.

## Plateformes visées
* iOS
* Android
