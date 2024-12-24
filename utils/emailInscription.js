const emailTemplates = {
  email_inscription: (prenom_etudiant, nom_etudiant, code_etudiant) =>
    `
      <html>
    <body
      style="
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          sans-serif;
      "
    >
      <h3>Cher ` +
    prenom_etudiant +
    ` ` +
    nom_etudiant +
    `,</h3>
      <p>
      Nous avons le plaisir de vous informer que votre inscription a été effectuée avec succès. Vous êtes désormais officiellement inscrit et pouvez accéder à votre compte 
      via notre application mobile.
      </p>
<p>
Voici vos identifiants de connexion :
</p>
<span>Code d'accès : <span style="font-size: 17px"> <strong>` +
    code_etudiant +
    `</strong></span></span>
<p>Pour commencer :</p>
<ul>
<li>Téléchargez notre application mobile depuis [Lien Google Store]</li>
<li>Ouvrez l'application et cliquez sur « Connexion ».</li>
<li>Entrez votre email et votre code d'accès pour accéder à votre compte.</li>
</ul>
<p>Si vous rencontrez des problèmes ou si vous avez besoin d'aide, n'hésitez pas à nous contacter à [E-mail d'assistance] ou [Numéro de téléphone d'assistance].</p>

<p>Nous vous souhaitons une merveilleuse expérience avec nous !</p>

<p>Cordialement,</p>
<p>[Nom de votre organisation]</p>
<p>[Coordonnées]</p>
    </body>
  </html>
      `,
};

module.exports = {
  emailTemplates,
};
