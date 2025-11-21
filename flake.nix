{
  description = "Frontend public site of dycodev.id dev environment (Node.js 24)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShells.default = pkgs.mkShell {
          name = "fe-public-site";

          packages = with pkgs; [
            nodejs_22     # Node + npm
            git           # optional tapi biasanya berguna
            direnv        # buat auto shell
          ];

          shellHook = ''
            echo "🌐 FE Public DevShell aktif"
            echo "Node: $(node -v)"
            echo "npm : $(npm -v)"
            echo "Siap jalanin Vite & Tailwind via npm"
          '';
        };
      }
    );
}
