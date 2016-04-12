#!/usr/bin/env bash
set -ev
echo "inside deploy"
if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
  echo "about to firebase deploy dev"
  firebase deploy --token $FIREBASE_TOKEN_DEV
  echo "after firebase deploy dev"
fi

if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
    echo "about to firebase deploy"
    firebase deploy --token $FIREBASE_TOKEN
    echo "after firebase deploy"
fi
