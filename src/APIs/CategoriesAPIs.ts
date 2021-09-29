

const getCategoryIndex = (categories: string[], category: string): number => {
  const categoryIndex = categories.indexOf(category);
  if (categoryIndex === -1) {
    throw new Error("Shouldn't happen");
  }
  return categoryIndex;
};

const setCategories = (categories: string[]) => {
  localStorage.setItem("categories", JSON.stringify(categories));
};

const categoryAlreadyExists = (newName: string):boolean => {
return getCategories().indexOf(newName) !== -1;
}

export const getCategories = (): string[] => {
  return JSON.parse(localStorage.getItem("categories") || "[]");
};

export const updateCategoryAPI = (category: string, newName: string) => {
  if (categoryAlreadyExists(newName)) {
    return false;
  }
  const oldCategories = getCategories();
  const categoryIndex = getCategoryIndex(oldCategories, category);
  oldCategories[categoryIndex] = newName;
  setCategories(oldCategories);
  return true;
};

export const addCategoryAPI = (category: string): boolean => {
  const oldCategories = getCategories();
  if (categoryAlreadyExists(category)) {
    return false;
  }
  oldCategories.push(category);  
  setCategories(oldCategories);
  return true;
};

export const deleteCategoryAPI = (category: string) => {
  const oldCategories = getCategories();
  const categoryIndex = getCategoryIndex(oldCategories, category);
  oldCategories.splice(categoryIndex, 1);
  setCategories(oldCategories);
};
