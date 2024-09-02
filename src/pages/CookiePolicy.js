import React from 'react';
import './CookiePolicy.css';

const CookiePolicy = () => {
  return (
    <div className="cookie-wrapper">
      <div className="cookie-header">
        <h1>Politique de Cookies</h1>
        <p className="last-updated">Dernière mise à jour : 02/09/2024</p>
      </div>

      <div className="cookie-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            La présente Politique de Cookies explique comment <strong>Bluelry</strong> (www.bluelry.com) utilise des cookies et technologies similaires pour améliorer votre expérience sur notre site. En utilisant notre site, vous consentez à l'utilisation des cookies conformément à cette politique.
          </p>
        </section>

        <section>
          <h2>2. Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte que les sites web placent sur votre appareil (ordinateur, smartphone, etc.) lorsque vous les visitez. Ils sont largement utilisés pour faire fonctionner les sites web, améliorer leur efficacité, ainsi que pour fournir des informations aux propriétaires du site.
          </p>
        </section>

        <section>
          <h2>3. Types de cookies utilisés</h2>
          <p>
            Nous utilisons les types de cookies suivants sur notre site :
          </p>
          <ul>
            <li><strong>Cookies essentiels :</strong> Ces cookies sont nécessaires pour que notre site fonctionne correctement. Ils vous permettent de naviguer sur le site et d'utiliser ses fonctionnalités.</li>
            <li><strong>Cookies de performance :</strong> Ces cookies collectent des informations sur la façon dont vous utilisez notre site, comme les pages que vous visitez le plus souvent. Ces données sont utilisées pour améliorer le fonctionnement du site.</li>
            <li><strong>Cookies de fonctionnalité :</strong> Ces cookies permettent à notre site de se souvenir de vos choix (comme votre langue ou la région dans laquelle vous vous trouvez) et de vous offrir des fonctionnalités améliorées et plus personnalisées.</li>
            <li><strong>Cookies de ciblage/publicité :</strong> Ces cookies sont utilisés pour afficher des publicités qui sont plus pertinentes pour vous et vos intérêts.</li>
          </ul>
        </section>

        <section>
          <h2>4. Gestion des cookies</h2>
          <p>
            Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez en utilisant les paramètres de votre navigateur. Vous pouvez également configurer votre navigateur pour qu'il vous avertisse avant qu'un cookie soit placé ou refuser tous les cookies. Cependant, si vous choisissez de désactiver les cookies, certaines parties de notre site pourraient ne pas fonctionner correctement.
          </p>
        </section>

        <section>
          <h2>5. Modifications de cette Politique de Cookies</h2>
          <p>
            <strong>Bluelry</strong> se réserve le droit de modifier cette Politique de Cookies à tout moment. Les modifications seront effectives dès leur publication sur le site. Nous vous encourageons à consulter régulièrement cette page pour rester informé des éventuelles mises à jour.
          </p>
        </section>

        <section>
          <h2>6. Contact</h2>
          <p>
            Pour toute question concernant cette Politique de Cookies, veuillez nous contacter à l'adresse suivante : [Adresse email de contact].
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
