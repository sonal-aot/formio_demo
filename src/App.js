import React, { useEffect } from "react";
import { Formio } from "formiojs"; // Form.io library
import './App.css';

const App = () => {
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_GIST_URL);
        const data = await response.json();

        // Create Form.io form with the fetched data
        Formio.createForm(document.getElementById('formio'), data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  return (
    <div>
      <div id="formio"></div>
    </div>
  );
};

export default App;
