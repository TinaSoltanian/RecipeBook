import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public Id: number;
    public Name: string;
    public Description: string;
    public ImagePath: string;
    public Ingredients: Ingredient[];

    constructor(id: number, name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
        this.Id = id;
        this.Name = name;
        this.Description = desc;
        this.ImagePath = imagePath;
        this.Ingredients = ingredients;
    }
}
