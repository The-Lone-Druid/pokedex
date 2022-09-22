import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.pokedex.app",
  appName: "pokedex",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.177.78:3000",
    cleartext: true
  }
};

export default config;
