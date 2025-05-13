"use client";

import { useContext, useState } from "react";
import classes from "./YamaatGame.module.css";
import Title from "../../general/SecTitle";
import Search from "./Search";
import CategoriesSet from "./CategoriesSet";
import CatCard from "./CatCard";
import TeamsInfo from "../general/TeamsInfo/TeamsInfo";
import LoadingSpinner from "../../general/LoadingSpinner";

import StartGameContext from "@/store/start-game-ctx";
import GeneralContext from "@/store/general-ctx";

function YamaatGame({ show }) {
  const { yamaatCategories, loadingYamaatCategories, startGame } =
    useContext(StartGameContext);
  const { confirmingAuth, showNotification } = useContext(GeneralContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchResults, setSearchResults] = useState({
    categoriesNormal: [],
    categoriesPremium: [],
  });
  const [searchingCategories, setSearchingCategories] = useState(false);

  const handleToggleCategory = (categoryID) => {
    const newSelectedCategories = [...selectedCategories];

    // 1. Check if we have already selected 6 categories and this category is disabled
    if (
      newSelectedCategories.length === 6 &&
      !newSelectedCategories.includes(categoryID)
    ) {
      return;
    }

    // 2. See if this category is already selected or not
    if (newSelectedCategories.includes(categoryID)) {
      // 2.1. Select the category if it is not selected
      newSelectedCategories.splice(
        newSelectedCategories.indexOf(categoryID),
        1
      );
    } else {
      // 2.2. Deselect the category if it is already selected
      newSelectedCategories.push(categoryID);
    }

    setSelectedCategories(newSelectedCategories);
  };

  const handleSearchCategories = (searchQuery) => {
    let normalCategoriesResults = [],
      premiumCategoriesResults = [];

    if (searchQuery.length) {
      setSearchingCategories(true);

      normalCategoriesResults = yamaatCategories.categoriesNormal.filter(
        (cat) =>
          cat.description.includes(searchQuery) ||
          cat.title.includes(searchQuery)
      );
      premiumCategoriesResults = yamaatCategories.categoriesPremium.filter(
        (cat) =>
          cat.description.includes(searchQuery) ||
          cat.title.includes(searchQuery)
      );
    } else {
      setSearchingCategories(false);
    }

    setSearchResults({
      categoriesNormal: normalCategoriesResults,
      categoriesPremium: premiumCategoriesResults,
    });
  };

  const handleStartGame = (teamsData) => {
    // 1. Chcking the number of categories selected (must be 6 categories)
    if (selectedCategories.length < 6) {
      showNotification("يجب اختيار 6 فئات لتبدأ اللعب", "error");
      return;
    }

    // 2. All Data
    const allData = {
      selectedCategories,
      teamsData,
    };

    startGame(allData, teamsData.gameType);
  };

  if (loadingYamaatCategories || confirmingAuth)
    return <LoadingSpinner fullscreen />;

  return (
    <section className={`${classes.main} ${show ? classes.show : ""}`}>
      <Title>حدد الفئات</Title>
      <p className={classes.description}>
        فريج اليمعات عبارة عن إن كل فريق يختار ٣ فئات، ليصبح المجموع ٦ فئات فيها
        ٣٦ سؤال متنوع، تنويع الفئات يزيد من متعة اللعبة، ومعاهم فقرتين تحديات
        متنوعة تضيف حماس أكثر، وتقدرون تشيلونها لأنها اختيارية، بالإضافة، في
        وسائل مساعدة تقدرون تستخدمونها خلال اللعبة لزيادة فرص الفوز
      </p>

      <Search onSearch={handleSearchCategories} />

      <CategoriesSet
        title="الفئات الحصرية"
        titleBackColor="var(--color-back-orange)"
      >
        {searchingCategories
          ? searchResults.categoriesPremium.map((cat) => {
              return (
                <CatCard
                  key={cat.id}
                  image={cat.image}
                  title={cat.title}
                  description={cat.description}
                  gamesNumber={cat.number_games}
                  onClick={handleToggleCategory.bind(this, cat.id)}
                  isActive={selectedCategories.includes(cat.id)}
                  isDisabled={
                    !selectedCategories.includes(cat.id) &&
                    selectedCategories.length === 6
                  }
                  ranOut={cat.number_games === 0}
                />
              );
            })
          : null}

        {!loadingYamaatCategories && !searchingCategories
          ? yamaatCategories.categoriesPremium.map((cat) => {
              return (
                <CatCard
                  key={cat.id}
                  image={cat.image}
                  title={cat.title}
                  description={cat.description}
                  gamesNumber={cat.number_games}
                  onClick={handleToggleCategory.bind(this, cat.id)}
                  isActive={selectedCategories.includes(cat.id)}
                  isDisabled={
                    !selectedCategories.includes(cat.id) &&
                    selectedCategories.length === 6
                  }
                  ranOut={cat.number_games === 0}
                  endAt={cat.end_at}
                />
              );
            })
          : ""}
      </CategoriesSet>
      <CategoriesSet
        title="فئات فريجنا"
        titleBackColor="var(--color-back-yellow)"
        isCardsSmall
      >
        {searchingCategories
          ? searchResults.categoriesNormal.map((cat) => {
              return (
                <CatCard
                  key={cat.id}
                  isSmall
                  image={cat.image}
                  title={cat.title}
                  description={cat.description}
                  gamesNumber={cat.number_games}
                  onClick={handleToggleCategory.bind(this, cat.id)}
                  isActive={selectedCategories.includes(cat.id)}
                  isDisabled={
                    !selectedCategories.includes(cat.id) &&
                    selectedCategories.length === 6
                  }
                  ranOut={cat.number_games === 0}
                />
              );
            })
          : null}
        {!loadingYamaatCategories && !searchingCategories
          ? yamaatCategories.categoriesNormal.map((cat) => {
              return (
                <CatCard
                  key={cat.id}
                  isSmall
                  image={cat.image}
                  title={cat.title}
                  description={cat.description}
                  gamesNumber={cat.number_games}
                  onClick={handleToggleCategory.bind(this, cat.id)}
                  isActive={selectedCategories.includes(cat.id)}
                  isDisabled={
                    !selectedCategories.includes(cat.id) &&
                    selectedCategories.length === 6
                  }
                  ranOut={cat.number_games === 0}
                />
              );
            })
          : ""}
      </CategoriesSet>

      <TeamsInfo
        gameMode="yamaat"
        playgroundUrl="/yamaat-playground"
        onSubmit={handleStartGame}
      />
    </section>
  );
}

export default YamaatGame;
