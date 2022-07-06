# Checkpoint42

A completely free iOS application that allows a user to quickly plan, save, and execute running/biking routes with checkpoints and live audio feedback

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

###Install dependancies

```sh
npm install
```

Always pod install after npm installing

navigate to iOS

```sh
pod install
```

### run the following 2 commands to init simulator
```sh
npm react-native start

npx react-native run-ios
```
