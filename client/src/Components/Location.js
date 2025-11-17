import { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null);
  const [currency, setCurrency] = useState("");
  const [geoData, setGeoData] = useState(null);
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };

  const getGeoLocationData = async () => {
    if (!ip) return;

    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      const geo = response.data;
      setGeoData(geo);

      setCity(geo.city);
      console.log("GeoLocation Data:", geo);

      if (geo.countryCode) {
        try {
          const countryRes = await axios.get(
            `https://restcountries.com/v3.1/alpha/${geo.countryCode}`
          );

          const country = countryRes.data[0];

          const currencies = country.currencies;
          const currencyCode = Object.keys(currencies)[0];
          const currencyName = currencies[currencyCode].name;

          setCurrency(`${currencyCode} - ${currencyName}`);

          // --- Get Language ---
          const langs = Object.values(country.languages);
          setLanguage(langs.join(", "));
        } catch (err) {
          console.error("Error fetching currency/language:", err.message);
        }
      }
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (ip) {
      getGeoLocationData();
    }
  }, [ip]);

  return (
    <div className="location">
      <p>Location Information</p>

      {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}

      {geoData ? (
        <div>
          Country: {geoData.country}
          <br />
          City: {city}
          <br />
          Region: {geoData.regionName}
          <br />
          Currency: {currency}
          <br />
          Language: {language}
        </div>
      ) : (
        <p>Loading Geolocation Data...</p>
      )}
    </div>
  );
};

export default Location;
