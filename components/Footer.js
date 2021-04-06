import React from "react";

const Footer = () => {
  return (
    <div className="container">
      <footer>
        <div className="image">
          <img src="/logo.svg" alt="" />
        </div>
        <div className="containerOpen">
          <div className="open">
            <p>Horaires</p>
            <p>Lundi: 09h00 - 13h00, 16h00 - 18h45</p>
            <p>Mardi: 09h00 - 14h00, 16h00 - 18h45</p>
            <p>Mercredi: Fermé</p>
            <p>Jeudi: 09h00 - 14h00, 16h00 - 18h45</p>
            <p>Vendredi: 09h00 - 14h00, 16h00 - 18h45</p>
            <p>Samedi: 08h30 - 15h00</p>
            <p>Dimanche: Fermé</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
