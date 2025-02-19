import { useState, useEffect } from 'react';
import axios from 'axios';


const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAboutData(response.data);
      })
      .catch(err => {
        setError(JSON.stringify(err, null, 2));
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  if (!loaded) return <p>Loading...</p>;
  if (error) return <p className="About-error">{error}</p>;

  return (
    <div className="About">
      {aboutData && aboutData.paragraphs && aboutData.paragraphs.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
      {aboutData && aboutData.imageUrl && (
        <img src={aboutData.imageUrl} alt="About me is here" />
      )}
    </div>
  );
};

export default About;
