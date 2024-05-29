import { dataEntityTypes, supportedLocalization } from "./mockApiConfiguration";

export type dataEntityType = (typeof dataEntityTypes)[number];
export type sortOrder = "desc" | "asc";

export interface Payload {
  data?: (object | string)[];
  seed?: number;
  locale?: (typeof supportedLocalization)[number];
  limit?: number;
  page?: number;
}

export interface User {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: Date;
  registeredAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: Date;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseYear: number;
  tracks: string[];
}

export interface Review {
  id: string;
  productId: string;
  reviewer: string;
  rating: number;
  review: string;
  createdAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: number;
    lng: number;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export interface Payment {
  cardNumber: string;
  cardType: string;
  transactionId: string;
  amount: string;
}

export interface SocialMediaProfile {
  username: string;
  bio: string;
  followersCount: number;
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
}

export interface File {
  fileName: string;
  fileType: string;
  mimeType: string;
}

export interface EducationalInstitution {
  name: string;
  address: Address;
  established: number;
  motto: string;
  departments: string[];
}

export interface FinancialTransaction {
  date: Date;
  amount: string;
  currency: string;
  type: string;
}

export interface HealthRecord {
  patientId: string;
  diagnosis: string;
  treatment: string;
  appointmentDate: Date;
}

export interface RealEstateListing {
  id: string;
  address: Address;
  price: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
}

export interface TravelPlan {
  destination: string;
  startDate: Date;
  endDate: Date;
  accommodation: string;
}

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string;
  prepTime: string;
}

export interface Order {
  orderId: string;
  customerId: string;
  products: Product[];
  status: string;
  totalAmount: string;
}
