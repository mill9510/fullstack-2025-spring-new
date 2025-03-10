import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePlatforms";
import { Store } from "./hooks/useStores";
import StoreList from "./components/StoreList";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleOnSelectedGenre = (genre: Genre | null) =>
    setSelectedGenre(genre);
  const handleOnSelectedPlatform = (platform: Platform | null) =>
    setSelectedPlatform(platform);
  const handleSelectedStore = (store: Store | null) => setSelectedStore(store);

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem pl="2" area={"header"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem pl="2" area={"aside"}>
          <GenreList
            onSelectedGenre={handleOnSelectedGenre}
            selectedGenre={selectedGenre}
          />
          <StoreList
            onSelectedStore={handleSelectedStore}
            selectedStore={selectedStore}
          />
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelectedPlatform={handleOnSelectedPlatform}
        />
        <GameGrid
          selectedGenre={selectedGenre}
          selectedPlatform={selectedPlatform}
          selectedStore={selectedStore}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
