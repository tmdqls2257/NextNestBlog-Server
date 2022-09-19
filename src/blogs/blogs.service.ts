import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from 'src/blogs/blogs.entity';
import { DataSource, Repository } from 'typeorm';
import { BlogDTO } from './dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly BlogEntityRepository: Repository<BlogEntity>,
  ) {}

  async getAllBlogs() {
    try {
      const blogs = await this.BlogEntityRepository.find();
      return blogs;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getBlog(id: string) {
    try {
      const blog = await this.BlogEntityRepository.findOne({
        where: { id },
      });
      return blog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async blogPost(BlogEntity: BlogDTO) {
    const { title, contents, description } = BlogEntity;

    const newBlog = await this.BlogEntityRepository.save({
      title,
      contents,
      description,
    });
    return newBlog;
  }

  async updateBlog(id: string, body: BlogDTO) {
    const { title, contents, description } = body;
    // const blog = await this.BlogEntityRepository.findOneBy(id);
    // blog[0].title =
    // return blog;
    // const firstBlog = await this.BlogEntityRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });

    const date = new Date(Date.now());
    // firstBlog.title = title;
    // firstBlog.contents = contents;
    // firstBlog.description = description;
    // firstBlog.updatedAt = date;
    // console.log(firstBlog.updatedAt, date, Date.now());
    const updateblog = this.BlogEntityRepository.update(id, {
      title,
      contents,
      description,
      updatedAt: date,
    });
    return updateblog;
  }
  async deleteBlog(id: string) {
    const deleteBlog = await this.BlogEntityRepository.delete(id);
    return deleteBlog;
  }
}
