#!/bin/sh
# 不要なファイルを削除する
if [ -e myFunc.zip ]; then
   rm myFunc.zip
   echo "myFunc.zip removed"
fi

if [ -e node_modules ]; then
   rm -rf node_modules
   echo "node_modules/ removed"
fi

if [ -e dist ]; then
   rm -rf dist
   echo "dist/ removed"
fi

npm install

npx tsc
if test $? -ne 0; then
  echo "TypeScript build failed!"
  exit 1
fi
echo "TypeScript build succeeded"

#npm test
#if test $? -ne 0; then
#  echo "Test failed!"
#  exit 1
#fi
#echo "Test succeeded"


# 改めてnode_modulesを削除して入れ直す
rm -rf node_modules
npm install --production
cd dist/src
zip ../../myFunc.zip -r *
cd ../..
zip myFunc.zip -r node_modules/

# 後始末
npm install
