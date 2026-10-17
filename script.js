// ============================================
// Mini Feed Simulator
// ============================================

// The "database": an array that holds every post object.
const feed = [];

// A counter so every post gets a unique id (1, 2, 3, ...).
let nextId = 1;

// --------------------------------------------
// 1. Create a post
// --------------------------------------------
function createPost(username, content) {
  const post = {
    id: nextId, // unique id
    username: username, // who wrote it
    content: content, // what they wrote
    likes: 0, // every post starts with 0 likes
    timestamp: Date.now(), // milliseconds since 1970 (bigger = newer)
  };

  nextId++; // next post will get the next number
  feed.push(post); // add the post to the end of the array
  return post;
}

// --------------------------------------------
// 2. Like a post
// --------------------------------------------
function likePost(postId) {
  // find() returns the first post where the check is true,
  // or undefined if nothing matches.
  const post = feed.find((p) => p.id === postId);

  if (!post) {
    console.log(`No post found with id ${postId}`);
    return null;
  }

  post.likes++; // same as post.likes = post.likes + 1
  return post;
}

// --------------------------------------------
// 3. Get the whole feed
// --------------------------------------------
function getFeed() {
  return feed;
}

// --------------------------------------------
// 4. Sorting
// --------------------------------------------
// sort() changes the original array, so we first make a copy
// with [...feed]. That way the real feed keeps its order.

function sortByNewest() {
  // b - a  => bigger numbers first (newest first).
  // If two posts have the same timestamp (they can be created in the
  // same millisecond), fall back to id: a bigger id means created later.
  return [...feed].sort((a, b) => b.timestamp - a.timestamp || b.id - a.id);
}

function sortByLikes() {
  // most liked first
  return [...feed].sort((a, b) => b.likes - a.likes);
}

// --------------------------------------------
// 5. Filter by user
// --------------------------------------------
function getPostsByUser(username) {
  // filter() keeps only the posts where the check is true
  return feed.filter((post) => post.username === username);
}

// ============================================
// Try it out
// ============================================
createPost("alex", "Hello world");
createPost("paul", "Learning JavaScript is fun");
createPost("alex", "Second post from me");

likePost(1);
likePost(1);
likePost(2);

console.log("--- Sorted by likes ---");
console.log(sortByLikes());

console.log("--- Alex's posts ---");
console.log(getPostsByUser("alex"));

console.log("--- Newest first ---");
console.log(sortByNewest());
