# Checkpoint42

A completely free iOS application that allows a user to quickly plan, save, and execute running/biking routes with checkpoints and live audio feedback

## Working on this project

This project has many features still to add! The project trello link is right here:
[Checkpoint 42 Trello Page](https://trello.com/b/bAaQAcBq/checkpoint-42)

Grab a ticket, move it to the work que and assign yourself to it. Comment on the ticket as you make progress. Once complete move the ticket to "Code Review", add me to the ticket and comment that it is ready for review. I will review yor code, and either request additional changes or merge into the main code!

The trello board has a resources section with links to all libraries used, if yo add a library please add a link to that library in the resources section!

## Setting up dev enviornment

run the following in the terminal
```sh
brew install node

brew install watchman

brew install cocoapods

sudo arch -x86_64 gem install ffi

npx react-native start
```
Inside ios folder
```sh
arch -x86_64 pod install

npx react-native run-ios
```
Exit processes and close terminal windows


## Setting up local workspace

fork and clone project to your own machine

navigate to project folder

### Install dependancies

```sh
npm install
```

Always pod install after npm installing

navigate to iOS

```sh
pod install
```

### Run the following 2 commands to init simulator

```sh
npm react-native start

npx react-native run-ios
```
