import Login from "../auth/login/Login";
import Signup from "../auth/signup/Signup";
import Home from "./home/Home";
import PokemonDetails from "./pokemon-details/PokemonDetails";

const protectedRoutes = [
  {
    id: 0,
    path: "home",
    element: Home,
    isIndex: true
  },
  {
    id: 1,
    path: "pokemon-details/:pokemonName",
    element: PokemonDetails,
    isIndex: false
  }
];

const authRoutes = [
  {
    id: 0,
    path: "login",
    element: Login,
    isIndex: true
  },
  {
    id: 1,
    path: "signup",
    element: Signup,
    isIndex: false
  }
];

export { protectedRoutes, authRoutes };
