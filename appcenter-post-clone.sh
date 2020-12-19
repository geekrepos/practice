#!/usr/bin/env bash

#Checking the current branch of AppCenter
echo "Current Branch(App Center): ${APPCENTER_BRANCH}"

TODAY_DATE=$(date +%Y%m%d)
BUILD_NUMBER="BUILD "
JQ_INSTALL_STATUS=false

#Defining app.json path
APP_JSON_PATH='./app.json'

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  echo "Installing jq json editor on Linux"
  JQ_INSTALL_STATUS=true
  apt-get install jq
elif [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  echo "Installing jq json editor on MacOS"
  JQ_INSTALL_STATUS=true
  brew install jq
fi

#Execute only if jq is installed
if $JQ_INSTALL_STATUS; then
  #Getting build date from JSON file
  BUILD_DATE=$(jq '.buildNumber | split("-") [0] | split(" ") [1] | tonumber' $APP_JSON_PATH)

  #Getting Version Number and increasing
  VERSION_NUMBER=$(($(jq '.buildNumber | split("-") [1] | tonumber' $APP_JSON_PATH) + 1))

  #Checking if new version number is required or not
  NEW_BUILD_REQUIRED=$([ "$BUILD_DATE" -lt "$TODAY_DATE" ] && echo true || echo false)

  #If new version number is required then setting build date to today and version number to 1
  if $NEW_BUILD_REQUIRED; then
    BUILD_DATE=$TODAY_DATE
    VERSION_NUMBER=1
  fi

  #If version number is below 10 then adding leading zeroes
  VERSION_NUMBER=$([ "$VERSION_NUMBER" -lt "10" ] && printf "%s" "0"$VERSION_NUMBER || echo "$VERSION_NUMBER")

  #Setting the build number
  BUILD_NUMBER=$BUILD_NUMBER$BUILD_DATE-$VERSION_NUMBER

  echo "New build number is $BUILD_NUMBER"

  #Applying the build number to json file
  tmp=$(mktemp)
  jq --arg a "$BUILD_NUMBER" '.buildNumber = $a' $APP_JSON_PATH >"$tmp" && mv "$tmp" $APP_JSON_PATH

  #Committing changes to build-number-update branch and merging back to dev-mobile-branch
  echo "Committing changes to temporary build-number-update branch"
  git stash
  git checkout -b build-number-update --force
  git stash pop
  git add $APP_JSON_PATH
  git commit -m "Build Number updated - '$BUILD_NUMBER'"
  echo "Checking out dev-mobile-branch and merging changes"
  git checkout dev-mobile-branch
  git merge build-number-update --no-ff
  echo "Pushing changes to dev-mobile-branch"
  git push
fi

#Printing app.json after changes
cat $APP_JSON_PATH
