export interface IMovieRepository {
    searchMovies(query: string, page?: string): Promise<any>;
}
