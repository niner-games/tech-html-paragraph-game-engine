<!--suppress ALL -->

<p align="center">
    <a href="https://www.ninergames.com/" target="_blank">
        <img src="https://github.com/niner-games/template-repository/assets/2903392/8ded911a-66d9-44d3-a7cf-b1be285be536" alt="Logo of Niner Games" width="500" height="396">
    </a><br />
</p>

<h1 align="center">Paragraph Game's Engine</h1><br />

This is a HTML implementation of our paragraph game's engine. It is 100% aimed to be working in pure JavaScript / bare-bone
web browsers. No Node.js etc. or installing anything needed. Just launch [`index.html`](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/index.html)
file in your browser and you should be ready to go.

If you want to read about game configuration or creating new game process then you follow to [our Wiki](https://github.com/niner-games/tech-html-paragraph-game-engine/wiki).

- [Repository Structure](#repository-structure)
- [Creating a new game](#creating-a-new-game)
    * [Create a GAME repository](#create-a-game-repository)
    * [Clone ENGINE repository locally](#clone-engine-repository-locally)
    * [Add GAME repository as local submodule](#add-game-repository-as-local-submodule)
    * [Build your new game](#build-your-new-game)
    * [Commit changes](#commit-changes-to-game-repository)
- [Playing existing game](#playing-existing-game)
    * [Firefox](#firefox)

# Repository Structure

Each paragraph game consists of:

- Game data, styles and configuration stored in [`data`](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/main/data) folder
- Game engine stored in [`engine`](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/main/engine) folder
- Game views stored in [_root_](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/main) folder

The **core** element of each game is _a set of files_ stored in [`data`](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/main/data)
folder. In this repository (main, engine) you will find some files stored there, so the game should not crash, after you
run it from [`index.html`](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/index.html) file. But,
please **keep in mind** that you you **MUST delete all these files** before you start working on a new game. See the instruction
below for details.

# Creating a new game

## Create a GAME repository

1. Create a new GitHub repository for storing app-specific settings, data and styles.
2. Remember that new repository's URL.
3. You don't have to clone it locally.

## Clone ENGINE repository locally

1. Clone current repository locally:

```bash
git clone git@github.com:niner-games/tech-html-paragraph-game-engine.git
```

2. Run [`index.html`](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/index.html) file in your browser to test, if everything works based on default game's configuration
3. Copy contents of [`data`](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/main/data) folder outside repository, if you don't want to start from scratch
4. **Empty [`data`](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/main/data) folder from all its content**!
5. If the folder isn't empty, Git could get confused when managing submodule contents (see below)

## Add GAME repository as local submodule

1. Add GAME repository (previous point) as a _git submodule_ in the [`data`](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/main/data) folder:

```bash
git submodule add git@github.com:niner-games/arizona-gold.git data
```

2. Update everything:

```bash
git pull && git submodule update --remote --merge
```

## Build your new game

Make necessary changes to [`data`](https://github.com/niner-games/tech-html-paragraph-game-engine/tree/main/data) folder based on information provided in [Wiki](https://github.com/niner-games/tech-html-paragraph-game-engine/wiki)

## Commit changes to GAME repository

Commit and push changes to your game:

```bash
git add --all
git commit -m "Commit message"
cd data && git push && cd ..
```

Since game engine is shared among other games, **DO NOT MODIFY it along with some game**. Go back to current repository,
make and test all changes here, commit and push changes here and pull them back over your local setups of your games using
instruction provided above (`git pull && git submodule update --remote --merge`).

# Playing existing game

You should always play in an on-line, production level versions that are published to external servers or game stores.

If, however, for any reason you would like to play a game directly from a repository, then steps to undertake are pretty
much the same as described above.

## Firefox

This code (games engine) is checked on regular occasions and should work in every modern web browser... except for Firefox.

Turns out that Firefox is [a mentally retarded web browser](https://onezeronull.com/2023/11/03/localstorage-vs-firefox/).
As explained in the linked article, [**it doesn't share values stored in _localStorage_ between files**](https://stackoverflow.com/q/78146699/1469208)!

This means that you will go to [Settings page](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/settings.html),
change theme, font or language, go back to [menu](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/menu.html)
or [paragraph](https://github.com/niner-games/tech-html-paragraph-game-engine/blob/main/paragraph.html) and... your settings won't be reflected (or actually... they will be reflected [until you close tab or browser](https://github.com/niner-games/tech-html-paragraph-game-engine/commit/8a1a8121a1ce67c6b048e0e97ab47cbb8e5aeadf#diff-b602b2240cbcb4e4de89f3446fd527f80e57a44d4f7bdb011023f9c109c798de).