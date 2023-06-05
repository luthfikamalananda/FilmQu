import tmdbConfig from './tmdbConfig';

const API_ENDPOINT = {
  NOW_PLAYING: `${tmdbConfig.BASE_URL}movie/now_playing?api_key=${tmdbConfig.KEY}&language=${tmdbConfig.DEFAULT_LANGUAGE}&page=1`,
  POPULAR: `${tmdbConfig.BASE_URL}movie/top_rated?api_key=${tmdbConfig.KEY}&language=${tmdbConfig.DEFAULT_LANGUAGE}&page=1`,
  DETAIL: (id) => `${tmdbConfig.BASE_URL}movie/${id}?api_key=${tmdbConfig.KEY}`,
};

export default API_ENDPOINT;
