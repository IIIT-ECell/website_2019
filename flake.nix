{
  description = "Jekyll development environment";

  inputs = {
    # Assuming you pinned to an older working nixpkgs for Ruby 2.7
    nixpkgs.url = "github:nixos/nixpkgs/nixos-22.11"; 
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          ruby_2_7
          bundler
          nodejs-16_x
          gnumake
          gcc
          zlib
          libffi
          openssl       # Provides the crypto and ssl libraries
          pkg-config    # Helps build tools auto-detect dependencies
        ];

        shellHook = ''
          export GEM_HOME="$PWD/.nix-gems"
          export PATH="$GEM_HOME/bin:$PATH"

          # Force the compiler to locate the nix-stored OpenSSL files
          export WITH_OPENSSL_DIR="${pkgs.openssl.dev}"
          export CGO_CFLAGS="-I${pkgs.openssl.dev}/include"
          export CGO_LDFLAGS="-L${pkgs.openssl}/lib"
        '';
      };
    };
}
