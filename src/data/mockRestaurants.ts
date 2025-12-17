import { IRestaurant, RestaurantType } from "../types/restaurant";
// Mock data for restaurants
export const mockRestaurants: IRestaurant[] = [
  {
    id: "1",
    name: "Citta di Milano",
    description: "Észak olasz ízek",
    address: "Budapest, Andrássy út 12.",
    rating: 4.5,
    reviewCount: 12,
    slug: "italian-kitchen",
    type: 'Italian' 
  },
  {
    id: "2",
    name: "Sushi Paradise",
    description: "Fresh Japanese sushi and seafood",
    address: "Budapest, XI. kerület, Fő u. 12.",
    rating: 4.8,
    reviewCount: 28,
    slug: "sushi-paradise",
    type: 'East-Asian' 
  },
  {
    id: "3",
    name: "Best Burger",
    description: "Classic American burgers",
    address: "Budapest, VII. kerület, Rákóczi út 45.",
    rating: 4.2,
    reviewCount: 45,
    slug: "burger-house",
    type: 'American' 
  },
  {
    id: "4",
    name: "Tropicana Grill",
    description: "Karib-tengeri hangulat és ízek",
    address: "Budapest, Tavasz utca 5.",
    rating: 4.0,
    reviewCount: 15,
    slug: "tropicana-grill",
    type: 'South-American' 
  },
  {
    id: "5",
    name: "Párizsi Kifli",
    description: "Autentikus magyar konyha elegáns környezetben",
    address: "Budapest, Váci utca 3.",
    rating: 4.6,
    reviewCount: 30,
    slug: "parizsi-kifli",
    type: 'Hungarian' 
  },
  {
    id: "6",
    name: "Wok Express",
    description: "Gyors, friss ázsiai tészták és levesek",
    address: "Budapest, Károly körút 11.",
    rating: 3.9,
    reviewCount: 50,
    slug: "wok-express",
    type: 'East-Asian' 
  },
  {
    id: "7",
    name: "Mama Mia Pizza",
    description: "Nápolyi stílusú pizzák fatüzelésű kemencéből",
    address: "Budapest, Bajcsy-Zsilinszky út 7.",
    rating: 4.9,
    reviewCount: 80,
    slug: "mama-mia-pizza",
    type: 'Italian' 
  },
  {
    id: "8",
    name: "The Texan BBQ",
    description: "Hosszú füstölésű marha és sertés",
    address: "Budapest, Nagykörút 22.",
    rating: 4.1,
    reviewCount: 25,
    slug: "the-texan-bbq",
    type: 'American' 
  },
  {
    id: "9",
    name: "Andes Delights",
    description: "Perui és chilei specialitások",
    address: "Budapest, Rózsa utca 1.",
    rating: 4.7,
    reviewCount: 18,
    slug: "andes-delights",
    type: 'South-American' 
  },
  {
    id: "10",
    name: "Noname Kocsma",
    description: "Kevéssé ismert, de finom házias ételek",
    address: "Budapest, Kiss utca 10.",
    rating: 3.5,
    reviewCount: 5,
    slug: "noname-kocsma",
    type: 'Other' 
  },
  {
    id: "11",
    name: "Gulyás Csárda",
    description: "A legjobb gulyásleves a városban",
    address: "Budapest, Gellért tér 9.",
    rating: 4.4,
    reviewCount: 40,
    slug: "gulyas-csarda",
    type: 'Hungarian' 
  },
  {
    id: "12",
    name: "Legendary Incheon",
    description: "Autentikus koreai étterem",
    address: "Budapest, András tér 1.",
    rating: 4.3,
    reviewCount: 22,
    slug: "legendary-incheon",
    type: 'East-Asian' 
  },
  {
    id: "13",
    name: "Roadside Diner",
    description: "24 órás klasszikus amerikai ételbár",
    address: "Budapest, M3 kivezető szakasz.",
    rating: 3.8,
    reviewCount: 10,
    slug: "roadside-diner",
    type: 'American' 
  },
];