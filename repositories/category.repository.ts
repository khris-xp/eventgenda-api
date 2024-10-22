import { default as Category } from '../models/category.model';
import {CreateCategoryDto} from '../common/dto/category.dto';
import categoryModel from '../models/category.model';
import {CategoryDocument} from '../types/category';
import BaseRepository from './entity.repository';

class CategoryRepository{
    async getAllCategories(): Promise<CategoryDocument[]>{
        return await Category.find().exec();
    }

    async getCategoryById(_id: string): Promise<CategoryDocument>{
        const result = await Category.findById(_id).exec();
        if(result === null){
            throw new Error('Category not found');
        }
        return result;
    }

    async getCategoryByName(name: string): Promise<CategoryDocument>{
        const result =  await Category.findOne({name: name}).exec();
        return result;
    }

    async createCategory(category: CreateCategoryDto): Promise<CategoryDocument>{
        const newCategory = new Category(category);
        return await newCategory.save();
    }

    async updateCategory(id : string, updates: CreateCategoryDto): Promise<CategoryDocument>{
        const category = await Category
        .findByIdAndUpdate(id, updates, {new: true})
        .exec();

        if (category === null){
            throw new Error("update category failed");
        }
        return category;
    }

    async deleteCategory(id: string): Promise<void> {
        await Category.findByIdAndDelete(id).exec();
    }
};
export default new CategoryRepository();
