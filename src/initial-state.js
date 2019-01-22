const initialState = {
  listName: "",
  fileName: "",
  currentURL: {
    displayName: "Google",
    href: "https://www.google.com/search",
    searchQueryKey: "q"
  },
  queries: [{ id: 0, value: "", checked: false }],
  savedLists: [],
  urls: [
    {
      displayName: "Google",
      href: "https://www.google.com/search",
      searchQueryKey: "q"
    },
    {
      displayName: "YouTube",
      href: "https://www.youtube.com/results",
      searchQueryKey: "search_query"
    },
    {
      displayName: "Wikipedia",
      href: "https://en.wikipedia.org/w/index.php",
      searchQueryKey: "search"
    },
    {
      displayName: "Reddit",
      href: "https://www.reddit.com/search",
      searchQueryKey: "q"
    },
    {
      displayName: "Amazon",
      href: "https://www.amazon.com/s/index.php",
      searchQueryKey: "field-keywords"
    }
  ]
};

export default initialState;
