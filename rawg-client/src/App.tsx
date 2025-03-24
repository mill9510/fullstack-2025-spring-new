import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import { useState } from "react";
import useGenres, { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePlatforms";
import useStores, { Store } from "./hooks/useStores";
import CustomList from "./components/CustomList";
import SortSelector from "./components/SortSelector";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  store: Store | null;
  sortOrder: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const handleOnSelectedGenre = (genre: Genre | null) =>
    setGameQuery({ ...gameQuery, genre });
  const handleOnSelectedPlatform = (platform: Platform | null) =>
    setGameQuery({ ...gameQuery, platform });
  const handleSelectedStore = (store: Store | null) =>
    setGameQuery({ ...gameQuery, store });
  const handleOnSelectedSortOrder = (sortOrder: string) =>
    setGameQuery({ ...gameQuery, sortOrder });

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
          {/* <GenreList
            onSelectedGenre={handleOnSelectedGenre}
            selectedGenre={gameQuery.genre}
          />
          <StoreList
            onSelectedStore={handleSelectedStore}
            selectedStore={gameQuery.store}
          /> */}
          <CustomList
            title="Genres"
            onSelectedItem={handleOnSelectedGenre}
            selectedItem={gameQuery.genre}
            useDataHook={useGenres}
          />
          <CustomList
            title="Stores"
            onSelectedItem={handleSelectedStore}
            selectedItem={gameQuery.store}
            useDataHook={useStores}
          />
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        <HStack>
          <PlatformSelector
            selectedPlatform={gameQuery.platform}
            onSelectedPlatform={handleOnSelectedPlatform}
          />
          <SortSelector
            sortOrder={gameQuery.sortOrder}
            onSelectSortOrder={handleOnSelectedSortOrder}
          />
        </HStack>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
