#!/bin/bash

cd /github/workspace/

for f in $*; do
  xelatex $f
done
