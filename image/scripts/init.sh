#!/bin/bash -eu

chown -R node:node /home/node
gosu node:node $@
