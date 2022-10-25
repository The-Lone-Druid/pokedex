import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PokeBall from "../../assets/images/pokeball.png";
import Loader from "../../components/Loader";
import { useGetPokemonsMutation } from "../../features/pokemon/pokemonAPI";
import { motion } from "framer-motion";
import {
  selectPokemons,
  setPokemonState
} from "../../features/pokemon/pokemonSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const cachedPokemons = useAppSelector(selectPokemons);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fetchPokemons, fetchPokemonsResponse] = useGetPokemonsMutation();
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const [offset, setOffset] = useState(0);
  const [lastElement, setLastElement]: any = useState("");

  useEffect(() => {
    setisLoading(true);
    fetchPokemons({
      limit: limit,
      offset: offset
    });
  }, [limit, offset]);

  useEffect(() => {
    if (fetchPokemonsResponse.isSuccess) {
      dispatch(setPokemonState(fetchPokemonsResponse.data));
    } else if (fetchPokemonsResponse.isError) {
      setisLoading(false);
    }
  }, [fetchPokemonsResponse.isSuccess, fetchPokemonsResponse.isError]);

  useEffect(() => {
    if (cachedPokemons && cachedPokemons.length > 0) {
      setPokemons(cachedPokemons);
      setisLoading(false);
    }
  }, [cachedPokemons]);

  const pokemonDetails = (pokemon: any) => {
    navigate(`/pokemon-details/${pokemon?.name}`);
  };

  return (
    <div>
      <div className="container py-5">
        {isLoading ? (
          <h4>Fetching Pokemons...</h4>
        ) : (
          <div>
            <div className="div mb-4">
              <div className="d-flex align-items-md-center justify-content-between flex-md-row flex-column">
                <h1 className="fw-bold">List of Pokemons...</h1>
              </div>
            </div>
            <div className="row">
              {pokemons &&
                pokemons.map((pokemon, index) => {
                  const { name } = pokemon;
                  return (
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{
                        ease: "easeOut",
                        duration: 0.5 + parseFloat(`0.${index}`)
                      }}
                      className="col-xl-3 col-lg-4 col-sm-6 pb-md-5 pb-4"
                      key={index}
                      id={name}
                      onClick={() => {
                        pokemonDetails(pokemon);
                      }}
                    >
                      <div className="card pokeball-card rounded-3 bg-electric border-0 overflow-hidden p-1 cursor-pointer shadow">
                        <div className="bg-white p-3 rounded-3 d-flex align-items-center justify-content-center">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                              index + 1
                            }.png`}
                            height={150}
                            width={150}
                            alt=""
                            className="my-3"
                          />
                        </div>
                        <h4 className="pt-3 text-center fw-bold text-dark pokemon-name">
                          {name}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
            <div className="py-4 d-flex align-items-center justify-content-center">
              <button
                className="btn py-3 px-5 rounded-pill btn-dark"
                onClick={() => {
                  setLimit(limit + 8);
                }}
              >
                Load more ...
              </button>
            </div>
          </div>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
