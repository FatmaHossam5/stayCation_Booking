import img1 from '../../assets/imgs/pexels-andrew-3201763.jpg';
import img2 from '../../assets/imgs/pexels-lamiko-5088877.jpg';
import img3 from '../../assets/imgs/pexels-medhat-ayad-122846-439227.jpg';
import img4 from '../../assets/imgs/pexels-pixabay-262048.jpg';
import img5 from '../../assets/imgs/pexels-pixabay-271624.jpg';

export interface Room {
  id: number;
  image: string;
  name: string;
  type: string;
  price: string;
  rating: number;
  guests: number;
  beds: number;
}

const rooms: Room[] = [
  {
    id: 1,
    image: img1,
    name: "Ocean View Suite",
    type: "Luxury Suite",
    price: "$299/night",
    rating: 4.9,
    guests: 4,
    beds: 2
  },
  {
    id: 2,
    image: img2,
    name: "Mountain Retreat",
    type: "Villa",
    price: "$199/night",
    rating: 4.8,
    guests: 6,
    beds: 3
  },
  {
    id: 3,
    image: img3,
    name: "City Center Apartment",
    type: "Apartment",
    price: "$399/night",
    rating: 4.7,
    guests: 2,
    beds: 1
  },
  {
    id: 4,
    image: img4,
    name: "Tropical Paradise",
    type: "Beach House",
    price: "$599/night",
    rating: 4.9,
    guests: 8,
    beds: 4
  },
  {
    id: 5,
    image: img5,
    name: "Historic Castle Room",
    type: "Heritage Room",
    price: "$249/night",
    rating: 4.6,
    guests: 2,
    beds: 1
  }
];

export default rooms;