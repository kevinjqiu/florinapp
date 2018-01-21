set -ex

export BRANCH=$(git rev-parse --abbrev-ref HEAD)
export COMMIT_HASH=$(git rev-parse HEAD)

cat build/manifest.json | envsubst
