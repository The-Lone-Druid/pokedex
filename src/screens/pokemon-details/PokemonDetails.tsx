import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetPokemonByNameMutation } from "../../features/pokemon/pokemonAPI";
import {
  PokemonDetailsState,
  selectPokemonDetails,
  setPokemonDetailsState
} from "../../features/pokemon/pokemonDetailSlice";
import PokeballBg from "../../assets/images/pokeballbg.svg";
import WeightIcon from "../../assets/images/weight.svg";
import HeightIcon from "../../assets/images/height.svg";
import Loader from "../../components/Loader";

type Props = {};

type ThemeTypes =
  | "rock"
  | "ghost"
  | "steel"
  | "water"
  | "grass"
  | "psychic"
  | "ice"
  | "dark"
  | "fairy"
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "bug"
  | "fire"
  | "electric"
  | "dragon"
  | "dark-gray"
  | "medium-gray"
  | "light-gray"
  | "white"
  | "background";

const PokemonDetails = (props: Props) => {
  const cachedPokemonDetails = useAppSelector(selectPokemonDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [fetchPokemonsDetails, fetchPokemonsDetailsResponse] =
    useGetPokemonByNameMutation();
  const [pokemonDetails, setPokemonDetails] = useState<
    PokemonDetailsState | any
  >();
  const [isLoading, setisLoading] = useState(false);
  const [pokemonTheme, setPokemonTheme] = useState<ThemeTypes>("grass");

  useEffect(() => {
    setisLoading(true);
    fetchPokemonsDetails({
      name: params.pokemonName
    });
  }, []);

  useEffect(() => {
    if (fetchPokemonsDetailsResponse.isSuccess) {
      dispatch(setPokemonDetailsState(fetchPokemonsDetailsResponse.data));
      setPokemonTheme(fetchPokemonsDetailsResponse.data?.types[0]?.type?.name);
    } else if (fetchPokemonsDetailsResponse.isError) {
      setisLoading(false);
    }
  }, [
    fetchPokemonsDetailsResponse.isSuccess,
    fetchPokemonsDetailsResponse.isError
  ]);

  useEffect(() => {
    if (cachedPokemonDetails) {
      setPokemonDetails(cachedPokemonDetails);
      setTimeout(() => {
        setisLoading(false);
      }, 0.5);
    }
  }, [cachedPokemonDetails]);

  return (
    <div className={`bg-${pokemonTheme} p-2`}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="col-lg-8 mx-auto">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <button
                className="btn"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <i className="bi bi-arrow-left fs-1 text-white"></i>
              </button>
              <h1 className="fw-bold text-white text-capitalize">
                {params.pokemonName}
              </h1>
            </div>
            <h4 className="fw-bold text-white"># {pokemonDetails?.id}</h4>
          </div>
          <div className="pokemon-details bg-white position-relative">
            <div className="pokemon-image d-flex align-items-center justify-content-center position-absolute">
              <img
                src={
                  pokemonDetails?.sprites?.other?.["official-artwork"]
                    ?.front_default
                }
                alt="Pokemon image"
                height={200}
                width={200}
                className={"pokemon"}
              />
              <img
                src={PokeballBg}
                alt="decoration"
                height={200}
                width={200}
                className="position-absolute visible-image"
              />
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-center px-4">
                {fetchPokemonsDetailsResponse.data?.types.map(
                  (pokemon: any, index: number) => (
                    <span
                      key={index}
                      className={`form-text text-white fw-bold px-4 py-2 rounded-pill m-2 bg-${pokemon?.type?.name}`}
                    >
                      {pokemon?.type?.name}
                    </span>
                  )
                )}
              </div>
              <div className="py-3">
                <h4 className={`text-${pokemonTheme} fw-bold text-center`}>
                  About
                </h4>
              </div>
              <div className="py-3">
                <div className="row">
                  <div className="col-4 text-center d-flex align-items-center justify-content-center border-end flex-column border-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={WeightIcon}
                        height={24}
                        width={24}
                        alt=""
                        className="me-2"
                      />
                      <h6 className="mb-0 text-black">
                        {pokemonDetails?.weight} kg
                      </h6>
                    </div>
                    <div>
                      <h6 className="mb-0 text-secondary mt-3">Weight</h6>
                    </div>
                  </div>
                  <div className="col-4 text-center d-flex align-items-center justify-content-center border-end flex-column border-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={HeightIcon}
                        height={24}
                        width={24}
                        alt=""
                        className="me-2"
                      />
                      <h6 className="mb-0 text-black">
                        {pokemonDetails?.height} m
                      </h6>
                    </div>
                    <div>
                      <h6 className="mb-0 text-secondary mt-3">Height</h6>
                    </div>
                  </div>
                  <div className="col-4 text-center d-flex align-items-center justify-content-center flex-column">
                    <div className="d-flex align-items-center">
                      <h6 className="mb-0 text-black text-capitalize">
                        {pokemonDetails?.moves &&
                          pokemonDetails.moves[0]?.move?.name}
                      </h6>
                    </div>
                    <div>
                      <h6 className="mb-0 text-secondary mt-3">Special Move</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <h4 className={`text-${pokemonTheme} fw-bold text-center`}>
                  Base Stats
                </h4>
                <div className="mt-4">
                  {pokemonDetails?.stats &&
                    pokemonDetails.stats.map(
                      (pokemonStats: any, index: number) => (
                        <div
                          key={index}
                          className="d-flex align-items-center justify-content-center border-bottom border-2 p-md-3 p-2"
                        >
                          <div className="flex-fill">
                            <h6
                              className={`fw-bold text-${pokemonTheme} text-uppercase`}
                            >
                              {pokemonStats.stat.name}
                            </h6>
                            <div className="d-flex align-items-center">
                              <h6 className={`mb-0`}>
                                0{pokemonStats.base_stat}
                              </h6>
                              <div className="progress w-100 ms-3 rounded-pill">
                                <div
                                  className={`progress-bar bg-${pokemonTheme}`}
                                  role="progressbar"
                                  style={{
                                    width: `${pokemonStats.base_stat}%`
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
