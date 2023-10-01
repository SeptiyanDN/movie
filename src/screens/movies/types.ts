// movieTypes.d.ts

export type Movie = {
  category_name: string;
  genre: string;
  image: string;
  movie_name: string;
  ongoing: boolean;
  rating: string;
  years: string;
  stream_description: string;
  total_views : number;
  cid : number;
  series: Series[];
};

export type Series = {
  image: string;
  is_hd_available: boolean;
  rating: string;
  stream_id: number;
  stream_name: string;
  stream_description: string;
  stream_url: string;
  stream_url_hd: string;
  total_views: number;
};
