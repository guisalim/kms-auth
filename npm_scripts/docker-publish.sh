#!/bin/bash

if [ -z "$npm_package_name" ]; then
    echo -e "\nFailed to load package name"
    exit 1
fi
if [ -z "$npm_package_version" ]; then
    echo -e "\nFailed to load package version"
    exit 1
fi

PACKAGE_TAG=${npm_package_name//\//-}
PACKAGE_TAG=${PACKAGE_TAG//@/""}
echo -e "\nPackage name: $PACKAGE_TAG"

docker build -t ${PACKAGE_TAG} -f dockerfile.prod .

docker login

echo -e "\nCreating tags"
REPO="$PACKAGE_TAG"
TAG_LATESTV="$REPO:latest"
TAG_VERSION="$REPO:$npm_package_version"

echo -e "\nPushing to Repo: $TAG_LATESTV"
docker tag $TAG_LATESTV guisalim/$TAG_LATESTV
docker push guisalim/$TAG_LATESTV
