import React from 'react';
import './LegalNotice.css';

const LegalNotice = () => {
  return (
    <div className="legal-wrapper">
      <div className="legal-header">
        <h1>Mentions Légales</h1>
        <p className="last-updated">Dernière mise à jour : 02/09/2024</p>
      </div>

      <div className="legal-content">
        <section>
          <h2>1. Éditeur du site</h2>
          <p>
            Le site <strong>Bluelry</strong> (www.bluelry.com) est édité par Ayoub SOURRAKH, 
            immatriculée au Registre du Commerce et des Sociétés de Pontoise.
          </p>
          <p>
            Siège social : 8 Avenue Adelphe Chauvin, 95300 Pontoise, FRANCE<br />
            Téléphone : 0 6 62 78 51 39<br />
            Email : ayoub.sourrakh@outlook.com
          </p>
        </section>

        <section>
          <h2>2. Directeur de la publication</h2>
          <p>
            Le directeur de la publication du site <strong>Bluelry</strong> est [Nom du directeur de la publication].
          </p>
        </section>

        <section>
          <h2>3. Hébergement du site</h2>
          <p>
            Le site est hébergé par Amazon Web Services, Inc., situé à Amazon Web Services, Inc. 410 Terry Avenue North, Seattle, WA 98109-5210, United States.<br />
          </p>
        </section>

        <section>
          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site www.bluelry.com, y compris les textes, images, graphismes, logo, icônes, 
            et sons, est la propriété de <strong>Bluelry</strong> ou de ses partenaires, et est protégé par les lois en vigueur en France en matière de propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments 
            est strictement interdite sans l'accord exprès par écrit de <strong>Bluelry</strong>.
          </p>
        </section>

        <section>
          <h2>5. Limitation de responsabilité</h2>
          <p>
            <strong>Bluelry</strong> ne saurait être tenu pour responsable des dommages directs ou indirects 
            causés au matériel de l'utilisateur lors de l'accès au site www.bluelry.com, 
            et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées au point 4, 
            soit de l'apparition d'un bug ou d'une incompatibilité.
          </p>
          <p>
            <strong>Bluelry</strong> ne pourra également être tenu responsable des dommages indirects (tels par exemple qu'une perte de marché ou perte d'une chance) 
            consécutifs à l'utilisation du site www.bluelry.com.
          </p>
        </section>

        <section>
          <h2>6. Droit applicable et attribution de juridiction</h2>
          <p>
            Tout litige en relation avec l'utilisation du site www.bluelry.com est soumis au droit français. 
            Il est fait attribution exclusive de juridiction aux tribunaux compétents de Pontoise.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            Pour toute question ou information sur le site, vous pouvez nous contacter à l'adresse suivante : ayoub.sourrakh@outlook.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalNotice;
