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
  const [queryParams, setQueryParams] = useSearchParams();
  const navigate = useNavigate();
  const [fetchPokemons, fetchPokemonsResponse] = useGetPokemonsMutation();
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const [offset, setOffset] = useState(0);
  const limitParam = queryParams.get("limit" || "");
  const offsetParam = queryParams.get("offset" || "");

  useEffect(() => {
    setisLoading(true);
    if (
      limitParam &&
      offsetParam &&
      (parseInt(limitParam) == 4 ||
        parseInt(limitParam) >= 8 ||
        parseInt(limitParam) >= 16)
    ) {
      setLimit(parseInt(limitParam));
      setOffset(parseInt(offsetParam));
      fetchPokemons({
        limit: limitParam,
        offset: offsetParam
      });
    } else {
      fetchPokemons({
        limit: limit,
        offset: offset
      });
    }
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

  const nextPage = () => {
    let currOffset = offset + limit;
    setQueryParams({ limit: limit.toString(), offset: currOffset.toString() });
    setOffset(currOffset);
  };

  const prevPage = () => {
    let currOffset = offset - limit;
    setQueryParams({ limit: limit.toString(), offset: currOffset.toString() });
    setOffset(currOffset);
  };

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
                <div className="d-flex align-items-center justify-content-end">
                  <div className="me-2">
                    <select
                      className="form-select"
                      id="limit"
                      name="limit"
                      aria-label="Floating label select example"
                      onChange={(event) => {
                        setLimit(parseInt(event.target.value));
                        setQueryParams({
                          limit: event.target.value,
                          offset: offset.toString()
                        });
                      }}
                      defaultValue={limit}
                    >
                      <option value={4}>Limit: 4</option>
                      <option value={8}>Limit: 8</option>
                      <option value={16}>Limit: 16</option>
                    </select>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary me-2"
                      disabled={offset === 0}
                      onClick={prevPage}
                    >
                      <i className="bi bi-chevron-left me-1"></i>
                      Prev
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={nextPage}
                      disabled={false}
                    >
                      Next
                      <i className="bi bi-chevron-right ms-1"></i>
                    </button>
                  </div>
                </div>
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
                      onClick={() => {
                        pokemonDetails(pokemon);
                      }}
                    >
                      <div className="card pokeball-card rounded-3 bg-electric border-0 overflow-hidden p-1 cursor-pointer shadow">
                        <div className="bg-white p-3 rounded-3 d-flex align-items-center justify-content-center">
                          <img
                            src={PokeBall}
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
          </div>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
