/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner";
import CityItem from "./CityItem";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesContext";

//
// eslint-disable-next-line react/prop-types

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Please add your first city by clicking on the map😊" />
    );

  const filterCities = cities
    .filter((city) => city.country === "Germany")
    .map(({ cityName, country, emoji }) => ({ cityName, country, emoji }));

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
