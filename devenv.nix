{ ... }:

{
  languages.javascript = {
    enable = true;
    npm.enable = true;
    corepack.enable = true;
  };

  enterShell = ''
    node scripts/setup-skills.mjs
  '';
}
