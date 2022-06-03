#!/usr/bin/env bash

git commit -am "chore: release update" > /dev/null
git push \
  && git push --tags