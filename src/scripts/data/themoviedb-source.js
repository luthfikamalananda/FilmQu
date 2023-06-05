/* eslint-disable no-unused-vars */
import API_ENDPOINT from '../globals/api-endpoint';

class TheMovieDbSource {
  static async nowPlayingMovies() {
    const response = await fetch(API_ENDPOINT.NOW_PLAYING);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async popularMovies() {
    const response = await fetch(API_ENDPOINT.POPULAR);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailMovie(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async searchMovie(query){
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    return responseJson.results;
  }
}

export default TheMovieDbSource;
