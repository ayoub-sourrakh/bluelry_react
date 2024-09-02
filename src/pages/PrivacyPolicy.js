import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-wrapper">
      <div className="privacy-header">
        <h1>Politique de Confidentialité</h1>
        <p className="last-updated">Dernière mise à jour : 02/09/2024</p>
      </div>

      <div className="privacy-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            La présente Politique de Confidentialité décrit comment <strong>Bluelry</strong> (www.bluelry.com) collecte, utilise et protège vos données personnelles lorsque vous utilisez notre site. En accédant à notre site, vous acceptez les pratiques décrites dans cette politique.
          </p>
        </section>

        <section>
          <h2>2. Données collectées</h2>
          <p>
            Nous collectons les informations que vous nous fournissez directement, telles que votre nom, adresse, email, et date de naissance lors de la création de compte ou de la réalisation d'un achat. Nous collectons également des informations automatiquement via l'utilisation de cookies et autres technologies similaires.
          </p>
        </section>

        <section>
          <h2>3. Utilisation des données</h2>
          <p>
            Les données collectées sont utilisées pour : 
            <ul>
              <li>Traiter vos commandes et assurer le suivi des livraisons.</li>
              <li>Améliorer notre site et personnaliser votre expérience utilisateur.</li>
              <li>Communiquer avec vous au sujet de vos commandes, des mises à jour de services et des offres promotionnelles.</li>
            </ul>
          </p>
        </section>

        <section>
          <h2>4. Partage des données</h2>
          <p>
            <strong>Bluelry</strong> ne vend ni ne loue vos données personnelles à des tiers. Nous pouvons partager vos données avec des prestataires de services tiers pour traiter vos commandes ou pour fournir des services liés au fonctionnement du site, sous réserve qu'ils respectent la confidentialité de vos données.
          </p>
        </section>

        <section>
          <h2>5. Protection des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, altération, divulgation ou destruction.
          </p>
        </section>

        <section>
          <h2>6. Vos droits</h2>
          <p>
            Conformément à la législation française, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles. Vous pouvez exercer ces droits en nous contactant à l'adresse suivante : [Adresse email de contact].
          </p>
        </section>

        <section>
          <h2>7. Modifications de la Politique de Confidentialité</h2>
          <p>
            <strong>Bluelry</strong> se réserve le droit de modifier cette Politique de Confidentialité à tout moment. Les modifications seront effectives dès leur publication sur le site. Nous vous encourageons à consulter régulièrement cette page pour rester informé des éventuelles mises à jour.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Pour toute question concernant cette Politique de Confidentialité, veuillez nous contacter à l'adresse suivante : ayoub.sourrakh@outlook.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
