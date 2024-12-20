export interface ILoginResponse {
  userId: string;
  name: string;
  username: string;
  email: string;
  token: string;
  expirationTokenDate: string;
  role: string[];
}
export interface ICategoryProps {
  id: number;
  image: string;
  userId: string;
  products?: IProductProps[];
  name: string;
  description: string;
}
export interface IProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}
export interface IRegisterProps {}
export interface IBannerProps {}
