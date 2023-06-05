const tmdbConfig = {
    KEY: 'f8f6c5eacfe95af9e685c56bba5d2f15', // api_key account
    BASE_URL: 'https://api.themoviedb.org/3/',
    BASE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500/',
    ORIGINAL_IMAGE_URL: 'https://image.tmdb.org/t/p/original/',
    DEFAULT_LANGUAGE: 'en-us',
    // ----- CACHE ------
    CACHE_NAME: new Date().toISOString(),
    // ----- IndexedDB ------
    DATABASE_NAME: 'movie-catalogue-database',
    DATABASE_VERSION: 1,
    OBJECT_STORE_NAME: 'movies',
    // ----- Web Socket ------
    WEB_SOCKET_SERVER: 'wss://movies-feed.dicoding.dev',
  };
  
  export default tmdbConfig;
  