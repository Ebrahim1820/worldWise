import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import styles from "./CountriesList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../../contexts/CitiesContext";

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="There is no country available" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountriesList;
