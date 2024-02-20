// text % text → boolean
// Returns true if its arguments have a similarity that is greater than the current similarity threshold set by pg_trgm.similarity_threshold.
export function similar() {}

// text <% text → boolean
// Returns true if the similarity between the trigram set in the first argument and a continuous extent of an ordered trigram set in the second argument is greater than the current word similarity threshold set by pg_trgm.word_similarity_threshold parameter.

// text %> text → boolean
// Commutator of the <% operator.

// text <<% text → boolean
// Returns true if its second argument has a continuous extent of an ordered trigram set that matches word boundaries, and its similarity to the trigram set of the first argument is greater than the current strict word similarity threshold set by the pg_trgm.strict_word_similarity_threshold parameter.

// text %>> text → boolean
// Commutator of the <<% operator.

// text <-> text → real
// Returns the “distance” between the arguments, that is one minus the similarity() value.

// text <<-> text → real
// Returns the “distance” between the arguments, that is one minus the word_similarity() value.

// text <->> text → real
// Commutator of the <<-> operator.

// text <<<-> text → real
// Returns the “distance” between the arguments, that is one minus the strict_word_similarity() value.

// text <->>> text → real
// Commutator of the <<<-> operator.
