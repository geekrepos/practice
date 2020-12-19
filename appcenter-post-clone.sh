#!/usr/bin/env bash
 
echo "Current Branch(App Center): ${APPCENTER_BRANCH}"

TODAY_DATE=$(date +%Y%m%d)
BUILD_NUMBER="BUILD "
ZERO=0
APP_JSON_PATH='./app.json'
JQ_INSTALL_STATUS=false
JQ_INSTALL_STATUS=true #Testing purpose

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
		echo "Installing jq json editor on Linux"
		apt-get install jq	
		JQ_INSTALL_STATUS=true
elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac OSX
		echo "Installing jq json editor on MacOS"
		brew install jq
		JQ_INSTALL_STATUS=true
fi

if $JQ_INSTALL_STATUS ; then 
		BUILD_DATE=$(jq '.buildNumber | split("-") [0] | split(" ") [1] | tonumber' $APP_JSON_PATH);
		VERSION_NUMBER=$(($(jq '.buildNumber | split("-") [1] | tonumber' $APP_JSON_PATH)+1)); #Increasing version number
		NEW_BUILD_REQUIRED=$([ "$BUILD_DATE" -lt "$TODAY_DATE" ] && echo true || echo false );
		
		if $NEW_BUILD_REQUIRED ; then
				BUILD_DATE=$TODAY_DATE
				VERSION_NUMBER=1
		fi
		VERSION_NUMBER=$([ "$VERSION_NUMBER" -lt "10" ] && printf "%s" "0"$VERSION_NUMBER || echo "$VERSION_NUMBER");
		BUILD_NUMBER=$BUILD_NUMBER$BUILD_DATE-$VERSION_NUMBER;
		tmp=$(mktemp)
		jq --arg a "$BUILD_NUMBER" '.buildNumber = $a' $APP_JSON_PATH > "$tmp" && mv "$tmp" $APP_JSON_PATH;
		git stash
		git checkout -b build-number-update --force
		git stash pop
		git add $APP_JSON_PATH
		git commit -m "Build Number updated - '$BUILD_NUMBER'"
		git checkout dev-mobile-branch
		git merge build-number-update --no-ff
		git push
fi

cat $APP_JSON_PATH;
