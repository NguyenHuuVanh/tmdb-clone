const ApiLinks = {
  apiKey: "4f95638c353eb599f9324063d011dc38",
  apiTrendingToday: "https://api.themoviedb.org/3/trending/all/day?api_key=4f95638c353eb599f9324063d011dc38",
  apiTrendingWeek: "https://api.themoviedb.org/3/trending/all/week?api_key=4f95638c353eb599f9324063d011dc38",
  apiTVPopular: "https://api.themoviedb.org/3/tv/popular?api_key=4f95638c353eb599f9324063d011dc38",
  apiDiscoverTv: "https://api.themoviedb.org/3/discover/tv?api_key=4f95638c353eb599f9324063d011dc38",
  apiUpcomingMovie: "http://api.themoviedb.org/3/movie/upcoming?api_key=4f95638c353eb599f9324063d011dc38",
  apiPopular: "https://api.themoviedb.org/3/movie/popular?api_key=4f95638c353eb599f9324063d011dc38",
  apiSearchDefault: "https://api.themoviedb.org/3/search/movie?api_key=4f95638c353eb599f9324063d011dc38",
  apiCertification: "https://api.themoviedb.org/3/certification/movie/list?api_key=4f95638c353eb599f9324063d011dc38",
  apiGenres: (type) => {
    return `https://api.themoviedb.org/3/genre/${type}/list?api_key=4f95638c353eb599f9324063d011dc38`;
  },
  apiActors: (id, type) => {
    return `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=4f95638c353eb599f9324063d011dc38&language=en-US`;
  },
  apiSearch: (search) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=4f95638c353eb599f9324063d011dc38&query=${search}`;
  },
  apiUrlTraler: (id, type) => {
    return `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=4f95638c353eb599f9324063d011dc38`;
  },
  apiImagesMovie: (id, type) => {
    return `https://api.themoviedb.org/3/${type}/${id}/images?api_key=4f95638c353eb599f9324063d011dc38`;
  },
  apiMovieInfomation: (id, type) => {
    return `https://api.themoviedb.org/3/${type}/${id}?api_key=4f95638c353eb599f9324063d011dc38`;
  },
  apiMovieSocial: (id, type) => {
    return `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=4f95638c353eb599f9324063d011dc38`;
  },
  apiCertificationTv: (id) => {
    return `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=4f95638c353eb599f9324063d011dc38`;
  },
  apiCertificationMovie: (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=4f95638c353eb599f9324063d011dc38`;
  },
  apiKeywordsRecommendation: (id, type) => {
    return `https://api.themoviedb.org/3/${type}/${id}/keywords?api_key=4f95638c353eb599f9324063d011dc38`;
  },
};

export default ApiLinks;
