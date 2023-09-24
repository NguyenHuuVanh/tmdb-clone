const ApiLinks = {
  apiKey: "4f95638c353eb599f9324063d011dc38",
  apiTrendingToday: "https://api.themoviedb.org/3/trending/all/day?api_key=4f95638c353eb599f9324063d011dc38",
  apiTrendingWeek: "https://api.themoviedb.org/3/trending/all/week?api_key=4f95638c353eb599f9324063d011dc38",
  apiTVPopular: "https://api.themoviedb.org/3/tv/popular?api_key=4f95638c353eb599f9324063d011dc38",
  apiDiscoverTv: "https://api.themoviedb.org/3/discover/tv?api_key=4f95638c353eb599f9324063d011dc38",
  apiUpcomingMovie: "http://api.themoviedb.org/3/movie/upcoming?api_key=4f95638c353eb599f9324063d011dc38",
  apiSearchDefault: "https://api.themoviedb.org/3/search/movie?api_key=4f95638c353eb599f9324063d011dc38",
  apiSearch: (search) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=4f95638c353eb599f9324063d011dc38&query=${search}`;
  },
};

export default ApiLinks;
