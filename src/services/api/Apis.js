const apiKey = "4f95638c353eb599f9324063d011dc38";
const ApiLinks = {
  apiTrendingToday: `trending/all/day?api_key=${apiKey}`,
  apiTrendingWeek: `trending/all/week?api_key=${apiKey}`,
  apiTVPopular: `tv/popular?api_key=${apiKey}`,
  apiDiscoverTv: `discover/tv?api_key=${apiKey}`,
  apiUpcomingMovie: `movie/upcoming?api_key=${apiKey}`,
  apiPopular: `movie/popular?api_key=${apiKey}`,
  apiSearchDefault: `search/movie?api_key=${apiKey}`,
  apiCertification: `certification/movie/list?api_key=${apiKey}`,
  apiGenres: (type) => {
    return `genre/${type}/list?api_key=${apiKey}`;
  },
  apiActors: (id, type) => {
    return `${type}/${id}/credits?api_key=${apiKey}&language=en-US`;
  },
  apiSearch: (search) => {
    return `search/movie?api_key=${apiKey}&query=${search}`;
  },
  apiUrlTraler: (id, type) => {
    return `${type}/${id}/videos?api_key=${apiKey}`;
  },
  apiImagesMovie: (id, type) => {
    return `${type}/${id}/images?api_key=${apiKey}`;
  },
  apiMovieInfomation: (id, type) => {
    return `${type}/${id}?api_key=${apiKey}&append_to_response=images,videos`;
  },
  apiMovieSocial: (id, type) => {
    return `${type}/${id}/external_ids?api_key=${apiKey}`;
  },
  apiCertificationTv: (id) => {
    return `tv/${id}/content_ratings?api_key=${apiKey}`;
  },
  apiCertificationMovie: (id) => {
    return `movie/${id}/release_dates?api_key=${apiKey}`;
  },
  apiKeywordsRecommendation: (id, type) => {
    return `${type}/${id}/keywords?api_key=${apiKey}`;
  },
  apiPostReview: (id, type) => {
    return `${type}/${id}/reviews?api_key=${apiKey}`;
  },
  apiRecommendations: (id, type) => {
    return `${type}/${id}/recommendations?api_key=${apiKey}`;
  },
};

export default ApiLinks;
