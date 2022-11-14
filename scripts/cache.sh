# get all assets from src/ dir
ASSETS=(`find src/** -type f -iname "*.mjs" -or -iname "*.css" -or -iname "*.html" -or -iname "*.wav" -or -iname "*.json" ! -name "sw.js" | awk '{print substr($0, 4)}'`)

# empty file
echo "" > src/cache.mjs
# beginning of object
echo "self.appFileCache = {\n\"files\": [\n" >> src/cache.mjs

for ASSET in "${ASSETS[@]}"; do
  # add item in array, ending with command and new-line
  echo "\".$ASSET\",\n" >> src/cache.mjs
done

# end of object
echo "]\n}" >> src/cache.mjs
