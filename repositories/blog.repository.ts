import { CreateBlogDto } from '../common/dto/blog.dto';
import blogModel from '../models/blog.model';
import { BlogDocument } from '../types/blog';
import BaseRepository from './entity.repository';

class BlogRepository extends BaseRepository<BlogDocument> {
  constructor() {
    super(blogModel);
  }

  async getAllBlogs(): Promise<BlogDocument[]> {
    return await this.model.find().exec();
  }

  async getBlogById(id: string): Promise<BlogDocument> {
    const result = await this.model.findById(id).exec();
    if (result === null) {
      throw new Error('Blog not found');
    }
    return result;
  }

  async getBlogByUserId(userId: string): Promise<BlogDocument[]> {
    return await this.model.find({ author: userId }).exec();
  }

  async getBlogByTitle(title: string): Promise<BlogDocument[]> {
    return await this.model.find({ title }).exec();
  }

  async getBlogByCategory(category: string): Promise<BlogDocument[]> {
    return await this.model.find({ category }).exec();
  }

  async createBlog(blog: CreateBlogDto): Promise<BlogDocument> {
    const newBlog = new this.model(blog);
    return await newBlog.save();
  }

  async updateBlog(id: string, updates: CreateBlogDto): Promise<BlogDocument> {
    const blog = await this.model
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();

    if (blog === null) {
      throw new Error('Update blog failed');
    }

    return blog;
  }

  async deleteBlog(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  
}};
export default new BlogRepository();