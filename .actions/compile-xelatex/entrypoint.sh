#!/bin/bash

cd /github/workspace/
ll

for f in $*; do
  xelatex $f
done

mkdir dist
cp **/*.pdf dist
