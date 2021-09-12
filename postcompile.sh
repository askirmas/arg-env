#!/bin/bash
# From https://github.com/askirmas/react-classnaming/blob/main/postcompile.sh
mv "$(npm pack --quiet | tail -n 1)" pack.tgz
rm -rf package
tar zxf pack.tgz
