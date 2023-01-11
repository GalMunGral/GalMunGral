#!/bin/bash

cd /github/workspace/
ls -la

for f in $*; do
  xelatex $f
done

mkdir dist
cp **/*.pdf dist
