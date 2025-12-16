import { IReview } from "../types/review";
// Mock data for reviews
export const initialReviews: IReview[] = [
  {
    id: "r1",
    restaurantId: "1",
    username: "bestuser12",
    rating: 5,
    comment: "best pasta I've ever had",
    createdAt: Date.now() - 86400000
  },
  {
    id: "r2",
    restaurantId: "1",
    username: "immer_fresser",
    rating: 4,
    comment: "Good food, a bit slow service.",
    createdAt: Date.now() - 172800000
  },
  {
    id: "r3",
    restaurantId: "2",
    username: "katica92",
    rating: 5,
    comment: "excellent ramen",
    createdAt: Date.now() - 259200000
  },
  {
    id: "r4",
    restaurantId: "3",
    username: "burgerfan",
    rating: 4,
    comment: "Perfectly cooked patty and crispy fries.",
    createdAt: Date.now() - 10000000
  },
  {
    id: "r5",
    restaurantId: "3",
    username: "foodcritic",
    rating: 5,
    comment: "Best Burger lives up to its name. A classic.",
    createdAt: Date.now() - 20000000
  },
  {
    id: "r6",
    restaurantId: "4",
    username: "beachlover",
    rating: 4,
    comment: "Great cocktails and spicy dishes.",
    createdAt: Date.now() - 30000000
  },
  {
    id: "r7",
    restaurantId: "5",
    username: "magyar_konyha",
    rating: 5,
    comment: "Ami a nagymama főztje volt, csak éttermi változatban.",
    createdAt: Date.now() - 40000000
  },
  {
    id: "r8",
    restaurantId: "5",
    username: "turista_bp",
    rating: 4,
    comment: "Traditional Hungarian food, great portions.",
    createdAt: Date.now() - 50000000
  },
  {
    id: "r9",
    restaurantId: "6",
    username: "quickbite",
    rating: 3,
    comment: "Fast service, but the noodles were a bit greasy.",
    createdAt: Date.now() - 60000000
  },
  {
    id: "r10",
    restaurantId: "7",
    username: "pizza_king",
    rating: 5,
    comment: "Authentic Neapolitan pizza! Thin crust, perfect sauce.",
    createdAt: Date.now() - 70000000
  },
  {
    id: "r11",
    restaurantId: "7",
    username: "date_night",
    rating: 5,
    comment: "Romantic setting and delicious pasta.",
    createdAt: Date.now() - 80000000
  },
  {
    id: "r12",
    restaurantId: "8",
    username: "meat_eater",
    rating: 4,
    comment: "The brisket was tender and smoky. Great ribs!",
    createdAt: Date.now() - 90000000
  },
  {
    id: "r13",
    restaurantId: "9",
    username: "explorer",
    rating: 5,
    comment: "Loved the Ceviche! Unique flavors.",
    createdAt: Date.now() - 100000000
  },
  {
    id: "r14",
    restaurantId: "9",
    username: "south_foodie",
    rating: 4,
    comment: "Good South American fare, a bit pricey.",
    createdAt: Date.now() - 110000000
  },
  {
    id: "r15",
    restaurantId: "10",
    username: "local_guy",
    rating: 3,
    comment: "Solid, no-frills Hungarian food. Cheap beer.",
    createdAt: Date.now() - 120000000
  },
  {
    id: "r16",
    restaurantId: "11",
    username: "soup_fan",
    rating: 5,
    comment: "The Gulyás was incredible. Must try!",
    createdAt: Date.now() - 130000000
  },
  {
    id: "r17",
    restaurantId: "11",
    username: "nagyevő",
    rating: 4,
    comment: "Authentic and hearty. Exactly what I was looking for.",
    createdAt: Date.now() - 140000000
  },
  {
    id: "r18",
    restaurantId: "12",
    username: "korean_lover",
    rating: 5,
    comment: "Excellent Bibimbap and friendly service.",
    createdAt: Date.now() - 150000000
  },
  {
    id: "r19",
    restaurantId: "12",
    username: "spicy_fan",
    rating: 4,
    comment: "Good Kimchi, maybe a little too sweet for my taste.",
    createdAt: Date.now() - 160000000
  },
  {
    id: "r20",
    restaurantId: "13",
    username: "night_owl",
    rating: 3,
    comment: "Szerencsére 24 órás, de a kaja csak átlagos.",
    createdAt: Date.now() - 170000000
  },
  {
    id: "r21",
    restaurantId: "1",
    username: "pasta_lover",
    rating: 5,
    comment: "Tried the Carbonara, 10/10.",
    createdAt: Date.now() - 180000000
  },
  {
    id: "r22",
    restaurantId: "2",
    username: "fish_eater",
    rating: 4,
    comment: "Good selection of fresh fish, prompt service.",
    createdAt: Date.now() - 190000000
  },
  {
    id: "r23",
    restaurantId: "3",
    username: "another_user",
    rating: 4,
    comment: "Solid burger joint, would come again.",
    createdAt: Date.now() - 200000000
  },
];