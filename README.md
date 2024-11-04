<!--suppress ALL -->

<p align="center">
    <a href="https://www.ninergames.com/" target="_blank">
        <img src="https://github.com/niner-games/template-repository/assets/2903392/8ded911a-66d9-44d3-a7cf-b1be285be536" alt="Logo of Niner Games" width="500" height="396">
    </a><br />
</p>

<h1 align="center">Paragraph Game's Engine</h1><br />

This is a HTML implementation of our paragraph game's engine. It is 100% aimed to be working in pure JavaScript / bare-bone
web browsers. No Node.js etc. or installing anything needed. Just launch `index.html`
file in your browser and you should be ready to go.

If you want to read about game configuration or creating new game process then you follow to [our Wiki](https://github.com/niner-games/tech-html-paragraph-game-engine/wiki).

- [Repository Structure](#repository-structure)
- [Creating a new game](#creating-a-new-game)
    * [Create new game repository](#create-new-game-repository)
    * [Prepare local environment](#prepare-local-environment)
    * [Build your new game](#build-your-new-game)
    * [Commit changes to your game](#commit-changes-to-your-game)
- [Playing existing game](#playing-existing-game)
    * [Firefox](#firefox)

# Repository Structure

Each paragraph game consists of:

- Game data, styles and configuration stored in `data` folder
- - Game engine stored in `engine` folder
- Game views stored in _root_ folder

The **core** element of each game is _a set of files_ stored in `data` folder. But, this folder **is ignored** in this repository
meaning that you must create it manually and put some files there (see below). Otherwise, the game **will crash** after you
run it from `index.html` file.

# Creating a new game

## Create new game repository

1. Create a new GitHub repository for storing game-specific settings, data and styles, if it is not already exist
2. Remember that new repository's URL
3. Don't clone it locally yet!

## Prepare local environment

1. Clone **current repository** (_game engine_) locally:

```bash
git clone git@github.com:niner-games/tech-html-paragraph-game-engine.git game-name
```

2. Clone **external repository** (_game data_) locally to `data` folder:

```bash
cd game-name
git clone git@github.com:niner-games/arizona-gold.git data
```

3. If pulled _game data_ repository is empty, create fresh set of files in `data` folder (see in [Wiki](https://github.com/niner-games/tech-html-paragraph-game-engine/wiki)) or manually copy example files from this repository and adjust them to your needs
4. Run `index.html` file in your browser to test, if everything works fine

If you want to take contents of `data` folder from this repository, you need to browse commit history and find [the last one](https://github.com/niner-games/tech-html-paragraph-game-engine/commit/60f0912c919cd391b112aa0fd39eb36c2dd12396)
that was made before making `data` folder ignored (which removed it from repository index) -- [`60f0912`](https://github.com/niner-games/tech-html-paragraph-game-engine/commit/60f0912c919cd391b112aa0fd39eb36c2dd12396).
Browsing [repository state at that moment](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/60f0912c919cd391b112aa0fd39eb36c2dd12396)
will give you access to the [last stored version](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/60f0912c919cd391b112aa0fd39eb36c2dd12396/data)
of `data` folder. 

## Build your new game

1. Make necessary changes to `data` folder based on information provided in [Wiki](https://github.com/niner-games/tech-html-paragraph-game-engine/wiki)
2. Run `index.html` file in your browser to test, if everything works fine

## Commit changes to your game

Commit and push changes to _game data_:

```bash
cd data
git add --all
git commit -m "Commit message"
git push
```

Since game engine is shared among other games, **DO NOT MODIFY it along with some game**!

# Playing existing game

You should always play in an on-line, production level versions that are published to external servers or game stores.

If, however, for any reason you would like to play a game directly from a repository, then steps to undertake are pretty
much the same as described above.

## Firefox

The code (_game engine_) is checked on regular basis and should work in every modern web browser... except for Firefox.

Turns out that Firefox is [a mentally retarded web browser](https://onezeronull.com/2023/11/03/localstorage-vs-firefox/).
As explained in the linked article, **[it doesn't share values stored in _localStorage_ between files](https://stackoverflow.com/q/78146699/1469208)**!

This means that you will go to [Settings page](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/settings.html),
change theme, font or language, go back to [menu](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/menu.html)
or [paragraph](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/paragraph.html) and... your settings
won't be reflected (or actually... they will be reflected [until you close tab or browser](https://github.com/niner-games/tech-html-paragraph-game-engine/commit/8a1a8121a1ce67c6b048e0e97ab47cbb8e5aeadf#diff-b602b2240cbcb4e4de89f3446fd527f80e57a44d4f7bdb011023f9c109c798de).