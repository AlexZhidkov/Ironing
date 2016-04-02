#!/usr/bin/env bash
set -ev

if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
  firebase deploy --token $FIREBASE_TOKEN_DEV
fi

if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
  firebase deploy --token $FIREBASE_TOKEN
fi
