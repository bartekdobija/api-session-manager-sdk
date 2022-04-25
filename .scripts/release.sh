#!/usr/bin/env bash

git commit -am "chore: release update" > /dev/null
npm version patch \
  && git push \
  && git push --tags