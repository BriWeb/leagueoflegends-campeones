let domain;

if (document.domain == "briweb.github.io") {
  domain = "https://briweb.github.io/leagueoflegends-campeones/";
} else {
  domain = "http://localhost:5500/";
}

export { domain };
