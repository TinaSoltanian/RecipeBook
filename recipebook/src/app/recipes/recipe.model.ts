import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public Name: string;
    public Description: string;
    public ImagePath: string;
    public Ingredients: Ingredient[];

    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
        this.Name = name;
        this.Description = desc;
        this.ImagePath = imagePath;
        this.Ingredients = ingredients;
    }
}
