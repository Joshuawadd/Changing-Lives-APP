# Run this program if "npm start" gives you an error like the following:
# error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.

import os

filename_fixed = "./blacklist_for_invalid_regular_expression_fix.js"
#filename_broken = "./node_modules/metro/node_modules/metro-config/src/defaults/blacklist.js"
filename_broken = "./node_modules/react-native/node_modules/@react-native-community/cli/node_modules/metro-config/src/defaults/blacklist.js"

f_fixed = open(filename_fixed, "r")
fixed_content = f_fixed.read()
f_fixed.close()

f_broken = open(filename_broken, "w")
f_broken.write(fixed_content)
f_broken.close()