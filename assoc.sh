#!/bin/zsh
declare -A assoc
K1="first"
K2="second"
assoc[$K1]="1"
assoc[$K2]="2"
echo "${assoc[@]}"
# echo "${!assoc[@]}"