#!/bin/bash

cd /github/workspace/
for f in $*; do
  xelatex $f
done

mkdir dist
cp **/*.pdf dist
