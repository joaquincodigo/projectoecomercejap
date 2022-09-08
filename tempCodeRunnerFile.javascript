// Transforming input into a tag list
let searchTags = "oso de goma".toLowerCase().split(" ");

// These tags aren't useful for searching
let excludedTags = ["de", "la", "el", "con", "que"];

// Removing worthless tags
for (const tag of searchTags) {
    // console.log(excludedTags.includes(tag))
  if (excludedTags.includes(tag)) {
    searchTags.pop(tag);
  }
}

console.log(searchTags)

