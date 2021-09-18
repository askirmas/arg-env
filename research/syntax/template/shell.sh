set -a
source ./shell.env
set +a

env | grep "SPEC_" | sort
