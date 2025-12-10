# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages_latest.npm
    pkgs.docker
    pkgs.openssl
      ];

      # --- HIER EINFÜGEN ---
  services.postgres = {
    enable = true;
    enableTcp = true;
  };
  # ---------------------

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "Prisma.prisma"
    
    ];

    # Enable previews and define the web preview
    previews = {
      enable = true;
      previews = {
        web = {
          # Command to run for the web preview
          command = ["npm" "run" "dev"];
          manager = "web";
          env = {
            # Set the PORT environment variable for the server
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Install JS dependencies from NPM
        npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # No tasks needed on start for now
      };
    };
  };
}
